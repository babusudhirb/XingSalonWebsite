import { FormEvent, type ReactNode, useState } from 'react';
import { CheckCircle2, Gift, HeartHandshake, Send, UserPlus } from 'lucide-react';

type FormState = {
  name: string;
  phone: string;
  visitedSalon: string;
  referredName: string;
  referredPhone: string;
  referredSalon: string;
  consent: boolean;
  companyWebsite: string;
};

const initialForm: FormState = {
  name: '',
  phone: '',
  visitedSalon: '',
  referredName: '',
  referredPhone: '',
  referredSalon: '',
  consent: false,
  companyWebsite: '',
};

const salons = [
  'Sarjapur Road',
  'HSR Layout',
  'Brookfield',
];

const phoneIsValid = (value: string) => /^(?:91)?[6-9]\d{9}$/.test(value.replace(/\D/g, ''));

/** A concise refer-a-friend form. The server deliberately copies every completed referral to all three outlets. */
export default function ReferralPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const update = <Key extends keyof FormState>(key: Key, value: FormState[Key]) => {
    setForm((current) => ({ ...current, [key]: value }));
    if (status !== 'idle') setStatus('idle');
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (form.name.trim().length < 2 || form.referredName.trim().length < 2 || !phoneIsValid(form.phone) || !phoneIsValid(form.referredPhone)) {
      setError('Please enter both names and valid 10-digit Indian phone numbers.');
      setStatus('error');
      return;
    }
    if (!form.visitedSalon || !form.referredSalon) {
      setError('Please choose both salons so our teams can follow up accurately.');
      setStatus('error');
      return;
    }
    if (!form.consent) {
      setError('Please confirm that you have permission to share your friend’s contact details.');
      setStatus('error');
      return;
    }

    setStatus('sending');
    setError('');
    try {
      const response = await fetch('/api/form-submit.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'referral',
          name: form.name,
          phone: form.phone,
          salon: form.visitedSalon,
          referredName: form.referredName,
          referredPhone: form.referredPhone,
          referredSalon: form.referredSalon,
          company_website: form.companyWebsite,
        }),
      });
      if (!response.ok || !(await response.json()).ok) throw new Error('submission_failed');
      setStatus('success');
      setForm(initialForm);
    } catch {
      setError('We could not send your referral just now. Please try again, or call your nearest Xing salon.');
      setStatus('error');
    }
  };

  return (
    <div className="bg-cream pt-8 sm:pt-12">
      <section className="container-site grid gap-10 pb-14 lg:grid-cols-[minmax(0,0.92fr)_minmax(27rem,0.8fr)] lg:items-start lg:pb-20">
        <div className="max-w-2xl pt-4 lg:pt-10">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-berry">Xing referral rewards</p>
          <h1 className="mt-4 font-display text-4xl leading-[1.06] text-ink sm:text-5xl">Refer a friend. Both of you get 10% off.</h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted sm:text-lg">
            Share your Xing experience with someone new. Once the referral is confirmed, you and your friend each receive 10% off at the selected salon.
          </p>
          <div className="mt-9 grid gap-4 sm:grid-cols-3">
            {[
              { icon: HeartHandshake, title: 'Share', text: 'Tell us who you are referring.' },
              { icon: UserPlus, title: 'Choose salons', text: 'We route the details to the right teams.' },
              { icon: Gift, title: 'Enjoy 10% off', text: 'Both guests receive the referral benefit.' },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-berry/10 bg-white/70 p-5 shadow-soft">
                <Icon aria-hidden className="size-5 text-berry" />
                <h2 className="mt-4 text-base font-semibold text-ink">{title}</h2>
                <p className="mt-1 text-sm leading-5 text-muted">{text}</p>
              </div>
            ))}
          </div>
          <p className="mt-7 text-sm leading-6 text-muted">The referral offer is subject to confirmation by the salon team and cannot be combined with another offer unless the team confirms otherwise.</p>
        </div>

        <div className="rounded-3xl border border-berry/15 bg-white p-5 shadow-soft sm:p-7">
          {status === 'success' ? (
            <div className="py-8 text-center" aria-live="polite">
              <CheckCircle2 aria-hidden className="mx-auto size-12 text-emerald-600" />
              <h2 className="mt-5 font-display text-3xl text-ink">Referral sent</h2>
              <p className="mx-auto mt-3 max-w-sm leading-6 text-muted">Thank you. Your referral has been emailed to the Sarjapur Road, HSR Layout and Brookfield teams. They will confirm the 10% referral offer with you.</p>
              <button type="button" onClick={() => setStatus('idle')} className="mt-6 min-h-11 rounded-full border border-berry px-5 text-sm font-semibold text-berry transition hover:bg-blush">Refer another friend</button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-berry">Referral form</p>
              <h2 className="mt-2 font-display text-3xl text-ink">Share the details</h2>
              <p className="mt-2 text-sm leading-6 text-muted">All fields below are required. We will email the completed referral to all three outlets.</p>

              <fieldset className="mt-6 grid gap-4">
                <legend className="text-sm font-semibold text-ink">Your details</legend>
                <Field label="Your name"><input value={form.name} onChange={(event) => update('name', event.target.value)} autoComplete="name" required className={inputClass} /></Field>
                <Field label="Your phone number"><input value={form.phone} onChange={(event) => update('phone', event.target.value)} inputMode="tel" autoComplete="tel" placeholder="98765 43210" required className={inputClass} /></Field>
                <Field label="Which Xing salon did you visit?"><select value={form.visitedSalon} onChange={(event) => update('visitedSalon', event.target.value)} required className={inputClass}><option value="">Choose a salon</option>{salons.map((salon) => <option key={salon} value={salon}>{salon}</option>)}</select></Field>
              </fieldset>

              <fieldset className="mt-6 grid gap-4 border-t border-ink/10 pt-6">
                <legend className="text-sm font-semibold text-ink">Your friend’s details</legend>
                <Field label="Friend’s name"><input value={form.referredName} onChange={(event) => update('referredName', event.target.value)} autoComplete="off" required className={inputClass} /></Field>
                <Field label="Friend’s phone number"><input value={form.referredPhone} onChange={(event) => update('referredPhone', event.target.value)} inputMode="tel" autoComplete="off" placeholder="98765 43210" required className={inputClass} /></Field>
                <Field label="Which salon are you referring them to?"><select value={form.referredSalon} onChange={(event) => update('referredSalon', event.target.value)} required className={inputClass}><option value="">Choose a salon</option>{salons.map((salon) => <option key={salon} value={salon}>{salon}</option>)}</select></Field>
              </fieldset>

              <div className="sr-only" aria-hidden="true"><label>Company website<input value={form.companyWebsite} onChange={(event) => update('companyWebsite', event.target.value)} tabIndex={-1} autoComplete="off" /></label></div>
              <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm leading-5 text-muted"><input type="checkbox" checked={form.consent} onChange={(event) => update('consent', event.target.checked)} className="mt-0.5 size-4 accent-berry" /><span>I have permission to share my friend’s contact details for this referral.</span></label>
              {status === 'error' && <p role="alert" className="mt-4 text-sm font-medium text-red-700">{error}</p>}
              <button type="submit" disabled={status === 'sending'} className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-berry px-5 text-sm font-semibold text-white transition hover:bg-berry/90 disabled:cursor-wait disabled:opacity-70"><Send aria-hidden className="size-4" />{status === 'sending' ? 'Sending referral…' : 'Send referral'}</button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

const inputClass = 'min-h-12 w-full rounded-xl border border-ink/15 bg-cream/40 px-3.5 text-sm text-ink outline-none transition placeholder:text-muted/70 focus:border-berry focus:ring-2 focus:ring-berry/15';

function Field({ label, children }: { label: string; children: ReactNode }) {
  return <label className="grid gap-1.5 text-sm font-medium text-ink"><span>{label}</span>{children}</label>;
}
