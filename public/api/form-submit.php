<?php
declare(strict_types=1);

// One same-origin endpoint for every Xing form. The SMTP password is kept outside public_html in a file created
// by the deployment workflow; it is never committed, shipped to a browser or exposed by this endpoint.
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

function respond(int $status, array $body): never {
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') respond(405, ['ok' => false, 'code' => 'method_not_allowed']);

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && !in_array($origin, ['https://xingsalons.com', 'https://www.xingsalons.com'], true)) respond(403, ['ok' => false, 'code' => 'invalid_origin']);

$raw = file_get_contents('php://input');
if ($raw === false || strlen($raw) > 32_000) respond(413, ['ok' => false, 'code' => 'payload_too_large']);
$lead = json_decode($raw, true);
if (!is_array($lead)) respond(400, ['ok' => false, 'code' => 'invalid_json']);
if (!empty($lead['company_website'])) respond(200, ['ok' => true, 'leadId' => 'XG-' . date('ymd') . '-OK']); // Honeypot.

$config = dirname(__DIR__, 2) . '/.xing-private/mail.php';
if (!is_file($config)) respond(503, ['ok' => false, 'code' => 'mail_not_configured']);
$mail = require $config;
if (!is_array($mail) || empty($mail['smtp_password_b64'])) respond(503, ['ok' => false, 'code' => 'mail_not_configured']);

function clean(mixed $value, int $limit = 500): string {
    return substr(trim(preg_replace('/[\x00-\x1F\x7F]+/u', ' ', (string) $value) ?? ''), 0, $limit);
}
function valueAt(array $source, string $path): string {
    foreach (explode('.', $path) as $key) {
        if (!is_array($source) || !array_key_exists($key, $source)) return '';
        $source = $source[$key];
    }
    return is_array($source) ? implode(', ', array_map(fn ($item) => clean($item), $source)) : clean($source);
}
function smtpRead($socket): string {
    $message = '';
    while (($line = fgets($socket, 515)) !== false) {
        $message .= $line;
        if (preg_match('/^\d{3} /', $line)) break;
    }
    return $message;
}
function smtpCommand($socket, string $command, array $expected): void {
    fwrite($socket, $command . "\r\n");
    $reply = smtpRead($socket);
    if ($reply === '' || !in_array((int) substr($reply, 0, 3), $expected, true)) throw new RuntimeException('SMTP rejected a command.');
}
function sendMail(array $mail, array $to, string $subject, string $html, string $replyTo = ''): void {
    $socket = stream_socket_client('tls://' . $mail['smtp_host'] . ':' . $mail['smtp_port'], $errno, $error, 20, STREAM_CLIENT_CONNECT);
    if (!$socket) throw new RuntimeException('Could not connect to the mail server.');
    stream_set_timeout($socket, 20);
    try {
        $welcome = smtpRead($socket);
        if ((int) substr($welcome, 0, 3) !== 220) throw new RuntimeException('Mail server unavailable.');
        smtpCommand($socket, 'EHLO xingsalons.com', [250]);
        smtpCommand($socket, 'AUTH LOGIN', [334]);
        smtpCommand($socket, base64_encode($mail['smtp_user']), [334]);
        smtpCommand($socket, base64_decode($mail['smtp_password_b64'], true) ?: '', [235]);
        smtpCommand($socket, 'MAIL FROM:<' . $mail['smtp_user'] . '>', [250]);
        foreach ($to as $recipient) smtpCommand($socket, 'RCPT TO:<' . $recipient . '>', [250, 251]);
        smtpCommand($socket, 'DATA', [354]);
        $headers = [
            'From: Xing Salon Appointments <' . $mail['smtp_user'] . '>',
            'To: ' . implode(', ', $to),
            'Subject: =?UTF-8?B?' . base64_encode($subject) . '?=',
            'MIME-Version: 1.0',
            'Content-Type: text/html; charset=UTF-8',
        ];
        if ($replyTo !== '' && filter_var($replyTo, FILTER_VALIDATE_EMAIL)) $headers[] = 'Reply-To: ' . $replyTo;
        fwrite($socket, implode("\r\n", $headers) . "\r\n\r\n" . str_replace("\n.", "\n..", $html) . "\r\n.\r\n");
        $accepted = smtpRead($socket);
        if ((int) substr($accepted, 0, 3) !== 250) throw new RuntimeException('Mail server did not accept the message.');
        smtpCommand($socket, 'QUIT', [221]);
    } finally {
        fclose($socket);
    }
}

$type = clean($lead['type'] ?? '', 30);
if (!in_array($type, ['appointment', 'gift', 'membership', 'corporate'], true)) respond(422, ['ok' => false, 'code' => 'invalid_type']);
$name = clean($lead['name'] ?? '', 60);
$phone = preg_replace('/\D+/', '', clean($lead['phone'] ?? '', 20));
if (strlen($name) < 2 || !preg_match('/^(?:91)?[6-9]\d{9}$/', $phone)) respond(422, ['ok' => false, 'code' => 'invalid_contact']);

$salonInput = clean($lead['salon'] ?? ($lead['location'] ?? ''), 80);
$salonKey = str_contains(strtolower($salonInput), 'sarjapur') || $salonInput === 'sarjapur' ? 'sarjapur'
    : (str_contains(strtolower($salonInput), 'hsr') || $salonInput === 'hsr' ? 'hsr' : (str_contains(strtolower($salonInput), 'brookfield') || $salonInput === 'brookfield' ? 'brookfield' : ''));
if ($salonKey === '') respond(422, ['ok' => false, 'code' => 'invalid_salon']);

$recipients = [
    'sarjapur' => 'xing.sarjapura@gmail.com',
    'hsr' => 'hsrxing@gmail.com',
    'brookfield' => 'xing.aecs@gmail.com',
];
$typeLabel = ucfirst($type);
$leadId = 'XG-' . date('ymd') . '-' . strtoupper(substr(bin2hex(random_bytes(4)), 0, 6));
$fields = [
    'Reference' => $leadId,
    'Request type' => $typeLabel,
    'Name' => $name,
    'Phone' => $phone,
    'Email' => clean($lead['email'] ?? '', 120),
    'Salon' => $salonInput,
    'Service / product' => clean($lead['service'] ?? ($lead['product'] ?? ''), 120),
    'Preferred date' => clean($lead['date'] ?? '', 20),
    'Preferred time' => clean($lead['time'] ?? '', 30),
    'Offer' => clean($lead['offer'] ?? '', 160),
    'Gift recipient' => valueAt($lead, 'gift.recipientName'),
    'Gift message' => valueAt($lead, 'gift.message'),
    'Membership services' => valueAt($lead, 'membership.services'),
    'Company' => valueAt($lead, 'corporate.company'),
];
$rows = '';
foreach ($fields as $label => $value) if ($value !== '') $rows .= '<tr><th style="text-align:left;padding:8px;border-bottom:1px solid #eee">' . htmlspecialchars($label, ENT_QUOTES, 'UTF-8') . '</th><td style="padding:8px;border-bottom:1px solid #eee">' . nl2br(htmlspecialchars($value, ENT_QUOTES, 'UTF-8')) . '</td></tr>';
$html = '<!doctype html><html><body style="font-family:Arial,sans-serif;color:#27151C"><h2>New Xing ' . htmlspecialchars($typeLabel, ENT_QUOTES, 'UTF-8') . ' request</h2><table style="border-collapse:collapse;width:100%;max-width:680px">' . $rows . '</table></body></html>';

try {
    sendMail($mail, array_values(array_unique([$recipients[$salonKey], $mail['central_recipient'], $mail['copy_recipient']])), "New Xing {$typeLabel} request — {$salonInput}", $html, clean($lead['email'] ?? '', 120));
    respond(200, ['ok' => true, 'leadId' => $leadId]);
} catch (Throwable $error) {
    error_log('Xing form email failed: ' . $error->getMessage());
    respond(502, ['ok' => false, 'code' => 'mail_failed']);
}
