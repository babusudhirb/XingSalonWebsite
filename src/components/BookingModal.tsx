import { useEffect, useRef, useState, type FormEvent } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { ArrowLeft, BadgePercent, Check, CircleCheckBig, Tag, X } from 'lucide-react';
import { useBooking } from '../context/booking';
import { booking, locations, primaryLocation, serviceMenu, site } from '../data/content';
import { individualOffers, type IndividualOffer } from '../data/individualOffers';
import { services } from '../data/services';
import { getBranch } from '../lib/branch';
import { cn } from '../lib/cn';
import { whatsappLink } from '../lib/whatsapp';
import { Button } from './ui/Button';
import { WhatsAppIcon } from './ui/Decor';
import { Modal } from './ui/Modal';

const EMPTY = { services: [] as string[], location: '', date: '', time: '', name: '', phone: '' };
type Form = typeof EMPTY;
type Errors = Partial<Record<keyof Form, string>>;

const SUCCESS_STEP = booking.steps.length;
const PHONE_PATTERN = /^(\+?91)?[6-9]\d{9}$/;
const MIN_NAME_LENGTH = 2;
const today = () => new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD in local time

function validate(step: number, form: Form): Errors {
  const errors: Errors = {};
  if (step === 0 && form.services.length === 0) errors.services = 'Choose at least one service to continue.';
  if (step === 1) {
    if (!form.location) errors.location = 'Please choose a salon.';
    if (!form.date) errors.date = 'Please pick a date.';
    else if (form.date < today()) errors.date = 'Please pick today or a future date.';
    if (!form.time) errors.time = 'Please choose a time.';
  }
  if (step === 2) {
    if (form.name.trim().length < MIN_NAME_LENGTH) errors.name = 'Please enter your name.';
    if (!PHONE_PATTERN.test(form.phone.replace(/[\s-]/g, ''))) errors.phone = 'Enter a valid 10-digit mobile number.';
  }
  return errors;
}

interface ChoiceGroupProps {
  legend: string;
  name: string;
  options: readonly string[];
  value: string;
  error?: string;
  columns: string;
  onChange: (value: string) => void;
}

type BookingTab = 'offers' | 'hair-care' | 'skin-care' | 'nail-care';
const bookingMenus = serviceMenu.filter((menu) => menu.id === 'hair-care' || menu.id === 'skin-care' || menu.id === 'nail-care');
const bookingTabs: Array<{ id: BookingTab; label: string }> = [
  { id: 'offers', label: 'Offers' },
  ...bookingMenus.map((menu) => ({ id: menu.id as Exclude<BookingTab, 'offers'>, label: menu.label })),
];

function BookingSummary({ services: selectedServices, offer, compact = false }: { services: string[]; offer: string; compact?: boolean }) {
  return (
    <aside className={cn('rounded-card border border-ink/10 bg-blush/60 p-4', compact ? '' : 'lg:sticky lg:top-6')} aria-live="polite">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-berry">Your appointment</p>
      {offer && <p className="mt-3 flex gap-2 text-sm font-medium text-ink"><Tag aria-hidden className="mt-0.5 size-4 shrink-0 text-berry" />{offer}</p>}
      {selectedServices.length ? (
        <ul className="mt-3 flex flex-wrap gap-2">
          {selectedServices.map((item) => <li key={item} className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-ink shadow-sm">{item}</li>)}
        </ul>
      ) : (
        <p className="mt-3 text-sm leading-relaxed text-muted">Choose one or more services. We will confirm availability, timing and price with you.</p>
      )}
      {!compact && <p className="mt-4 border-t border-ink/10 pt-3 text-xs leading-relaxed text-muted">Your selections are a request, not a payment. Your Xing professional confirms the plan before the appointment.</p>}
    </aside>
  );
}

function ServiceBuilder({ selectedServices, selectedOffer, onToggleService, onOfferChange, error }: {
  selectedServices: string[];
  selectedOffer: string;
  onToggleService: (item: string) => void;
  onOfferChange: (offer: IndividualOffer | null) => void;
  error?: string;
}) {
  const [tab, setTab] = useState<BookingTab>('offers');
  const isSelected = (item: string) => selectedServices.includes(item);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
      <div>
        <div>
          <p className="text-sm font-semibold text-ink">Build your appointment</p>
          <p className="mt-1 text-sm leading-relaxed text-muted">Start with an offer if it suits you, then choose one or more hair, skin or nail services.</p>
        </div>
        <div className="mt-5 flex gap-2 overflow-x-auto pb-1 no-scrollbar" role="tablist" aria-label="Booking choices">
          {bookingTabs.map((item) => (
            <button key={item.id} type="button" role="tab" aria-selected={tab === item.id} onClick={() => setTab(item.id)} className={cn('min-h-11 shrink-0 rounded-full border px-4 text-sm font-medium transition', tab === item.id ? 'border-berry bg-berry text-cream' : 'border-ink/15 bg-white text-ink hover:border-berry')}>
              {item.label}
            </button>
          ))}
        </div>

        {tab === 'offers' ? (
          <div className="mt-5">
            <div className="flex items-start justify-between gap-4">
              <div><h4 className="font-medium text-ink">Add one offer, if applicable</h4><p className="mt-1 text-xs leading-relaxed text-muted">Select one offer for this request. Your salon confirms eligibility before the appointment.</p></div>
              {selectedOffer && <button type="button" onClick={() => onOfferChange(null)} className="min-h-11 shrink-0 text-xs font-medium text-berry underline underline-offset-4">Remove offer</button>}
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {individualOffers.map((offer) => {
                const active = selectedOffer === offer.title;
                return <button key={offer.id} type="button" onClick={() => onOfferChange(offer)} aria-pressed={active} className={cn('rounded-xl border p-4 text-left transition hover:border-berry focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-berry', active ? 'border-berry bg-white ring-1 ring-berry' : 'border-ink/10 bg-white')}>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-berry">{offer.category}</span>
                  <span className="mt-1 block font-medium text-ink">{offer.title}</span>
                  <span className="mt-1 block text-xs leading-relaxed text-muted">{offer.value}</span>
                </button>;
              })}
            </div>
          </div>
        ) : (
          <div className="mt-5 space-y-5">
            {bookingMenus.find((menu) => menu.id === tab)?.sections.map((section) => (
              <section key={section.title}>
                <h4 className="text-sm font-semibold text-ink">{section.title}</h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  {section.items.filter((item) => !/bridal|tattoo/i.test(item)).map((item) => (
                    <button key={item} type="button" aria-pressed={isSelected(item)} onClick={() => onToggleService(item)} className={cn('inline-flex min-h-11 items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm transition', isSelected(item) ? 'border-berry bg-berry text-cream' : 'border-ink/15 bg-white text-ink hover:border-berry')}>
                      {isSelected(item) && <Check aria-hidden className="size-3.5 shrink-0" />}{item}
                    </button>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
        <FieldError id="services-error" message={error} />
      </div>
      <BookingSummary services={selectedServices} offer={selectedOffer} />
    </div>
  );
}

/** Radio group rendered as selectable chips. */
function ChoiceGroup({ legend, name, options, value, error, columns, onChange }: ChoiceGroupProps) {
  return (
    <fieldset aria-describedby={error ? `${name}-error` : undefined}>
      <legend className="text-sm font-medium text-ink">{legend}</legend>
      <div className={cn('mt-3 grid gap-2', columns)}>
        {options.map((option) => (
          <label key={option} className="cursor-pointer">
            <input
 data-clarity-mask="true"
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
              className="peer sr-only"
            />
            <span className="flex h-full items-center justify-center rounded-lg border border-ink/15 bg-white px-3 py-2.5 text-center text-xs text-ink transition-colors hover:border-berry peer-checked:border-berry peer-checked:bg-berry peer-checked:text-cream peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-berry">
              {option}
            </span>
          </label>
        ))}
      </div>
      <FieldError id={`${name}-error`} message={error} />
    </fieldset>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-2 text-xs font-medium text-berry">
      {message}
    </p>
  );
}

interface BookingFlowProps {
  service?: string;
  location?: string;
  detail?: string;
  offer?: string;
  active?: boolean;
  onDone?: () => void;
}

/** The reusable multi-step form: it can sit on the dedicated page or inside the legacy modal wrapper. */
export function BookingFlow({ service = '', location = '', detail = '', offer = '', active = true, onDone }: BookingFlowProps) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Form>(EMPTY);
  const [selectedOffer, setSelectedOffer] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState('');
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Start fresh each time the modal opens, pre-filling whatever the CTA asked for. The salon comes from the CTA
  // (a salon page passes its own), else ?salon= in the address, else the visitor's last choice.
  useEffect(() => {
    if (!active) return;
    const asked = new URLSearchParams(window.location.search).get('salon') ?? getBranch() ?? '';
    const initialService = detail ? `${service}${service ? ' — ' : ''}${detail}` : service;
    const initialOffer = individualOffers.find((item) => item.id === offer || item.title === offer)?.title ?? offer;
    setForm({ ...EMPTY, services: initialService ? [initialService] : [], location: location || (locations.find((loc) => loc.id === asked)?.name ?? '') });
    setSelectedOffer(initialOffer);
    setErrors({});
    setNotice('');
    setStep(0);
  }, [active, service, location, detail, offer]);

  // Announce each step change to keyboard and screen-reader users.
  useEffect(() => {
    if (active && step > 0) headingRef.current?.focus();
  }, [active, step]);

  const update = (field: Exclude<keyof Form, 'services'>) => (value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const toggleService = (item: string) => {
    setForm((previous) => ({
      ...previous,
      services: previous.services.includes(item) ? previous.services.filter((selected) => selected !== item) : [...previous.services, item],
    }));
    setErrors((previous) => ({ ...previous, services: undefined }));
  };

  const changeOffer = (chosen: IndividualOffer | null) => {
    setSelectedOffer(chosen?.title ?? '');
    if (!chosen?.service) return;
    const linkedService = services[chosen.service]?.label;
    if (!linkedService) return;
    setForm((previous) => previous.services.includes(linkedService) ? previous : { ...previous, services: [...previous.services, linkedService] });
    setErrors((previous) => ({ ...previous, services: undefined }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const found = validate(step, form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    if (step < booking.steps.length - 1) {
      setStep(step + 1);
      return;
    }

    setSending(true);
    setNotice('');
    try {
      const response = await fetch('/api/form-submit.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'appointment', ...form, service: form.services.join(' · '), detail, offer: selectedOffer }),
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok || !body.ok) throw new Error(body.code ?? 'mail_failed');
      setStep(SUCCESS_STEP);
    } catch {
      setNotice('We could not send your booking request just now. Please try again shortly or contact your selected salon on WhatsApp.');
    } finally {
      setSending(false);
    }
  };

  const serviceLabel = form.services.join(' · ');
  const offerLine = selectedOffer ? ` Offer: ${selectedOffer}.` : '';
  const whatsappText = `Hi ${site.name}, I'd like to book ${serviceLabel || 'an appointment'} at ${form.location} on ${form.date} at ${form.time}.${offerLine} Name: ${form.name.trim()}, Phone: ${form.phone.trim()}`;
  // The confirmation message goes to the salon the client picked.
  const salon = locations.find((loc) => loc.name === form.location) ?? primaryLocation;
  const summary = [
    ...(selectedOffer ? [['Offer', selectedOffer]] : []),
    ['Service', serviceLabel],
    ['Salon', form.location],
    ['When', `${form.date} · ${form.time}`],
    ['Name', form.name.trim()],
  ];

  return (
    <>
      {/* Phones: the title and the Continue row stay in place while the fields scroll between them. */}
      <div className="flex min-h-full flex-col px-6 sm:p-8">
        <div className="sticky top-0 z-10 -mx-6 flex items-start justify-between gap-4 bg-cream px-6 pb-3 pt-[max(1.5rem,env(safe-area-inset-top))] sm:static sm:mx-0 sm:p-0">
          <h2 id="booking-title" className="font-display text-3xl font-medium text-ink">
            {booking.title}
          </h2>
          {onDone && (
            <button
              type="button"
              aria-label="Close booking"
              onClick={onDone}
              className="-mr-2 -mt-1 grid size-11 shrink-0 place-items-center rounded-full text-ink hover:bg-blush hover:text-berry"
            >
              <X aria-hidden className="size-5" />
            </button>
          )}
        </div>

        {selectedOffer && step < SUCCESS_STEP && (
          <p className="mt-4 flex items-center gap-2 rounded-card bg-blush px-4 py-3 text-sm text-ink">
            <BadgePercent aria-hidden className="size-4 shrink-0 text-berry" />
            <span>
              Offer: <strong className="font-semibold">{selectedOffer}</strong>
            </span>
          </p>
        )}

        {step < SUCCESS_STEP && (
          <ol className="mt-5 flex items-center gap-2" aria-label="Booking progress">
            {booking.steps.map((label, i) => (
              <li key={label} aria-current={i === step ? 'step' : undefined} className="flex flex-1 items-center gap-2">
                <span
                  className={cn(
                    'grid size-7 shrink-0 place-items-center rounded-full text-xs font-medium transition-colors',
                    i <= step ? 'bg-berry text-cream' : 'bg-blush text-muted',
                  )}
                >
                  {i < step ? <Check aria-hidden className="size-3.5" /> : i + 1}
                </span>
                <span className={cn('text-xs', i === step ? 'font-medium text-ink' : 'text-muted')}>{label}</span>
                {i < booking.steps.length - 1 && <span aria-hidden className="h-px flex-1 bg-ink/15" />}
              </li>
            ))}
          </ol>
        )}

        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.2 }}
            className="mt-6 flex flex-1 flex-col"
          >
            {step === SUCCESS_STEP ? (
              <div className="pb-6 text-center sm:pb-0">
                <CircleCheckBig aria-hidden className="mx-auto size-14 text-success" strokeWidth={1.5} />
                <h3 ref={headingRef} tabIndex={-1} className="mt-4 font-display text-2xl font-medium text-ink outline-none">
                  {booking.successTitle}
                </h3>
                <p className="mt-2 text-sm text-muted">{booking.successText}</p>
                <dl className="mt-5 space-y-2 rounded-card bg-blush p-4 text-left text-sm">
                  {summary.map(([term, detail]) => (
                    <div key={term} className="flex justify-between gap-4">
                      <dt className="text-muted">{term}</dt>
                      <dd className="text-right font-medium text-ink">{detail}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <a
                    href={whatsappLink(whatsappText, salon.whatsappHref)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-success px-6 py-3 text-sm font-medium text-cream transition active:scale-95"
                  >
                    <WhatsAppIcon className="size-4" />
                    Confirm on WhatsApp
                  </a>
                  {onDone && (
                    <Button variant="outline" arrow={false} onClick={onDone}>
                      Done
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <form noValidate onSubmit={onSubmit} className="flex flex-1 flex-col gap-6 sm:gap-0">
                <h3 ref={headingRef} tabIndex={-1} className="sr-only">
                  Step {step + 1} of {booking.steps.length}: {booking.steps[step]}
                </h3>

                {step === 0 && (
                  <ServiceBuilder selectedServices={form.services} selectedOffer={selectedOffer} onToggleService={toggleService} onOfferChange={changeOffer} error={errors.services} />
                )}

                {step === 1 && (
                  <div className="space-y-5">
                    <ChoiceGroup
                      legend="Choose your salon"
                      name="location"
                      options={locations.map((loc) => loc.name)}
                      value={form.location}
                      error={errors.location}
                      columns="sm:grid-cols-3"
                      onChange={(value: string) => {
                        update('location')(value);
                        // Hours differ by salon, so a chosen time may not exist at the new one.
                        if (!booking.slotsFor(locations.find((loc) => loc.name === value)).includes(form.time)) update('time')('');
                      }}
                    />
                    <div>
                      <label htmlFor="booking-date" className="text-sm font-medium text-ink">
                        Preferred date
                      </label>
                      <input
 data-clarity-mask="true"
                        id="booking-date"
                        type="date"
                        min={today()}
                        value={form.date}
                        onChange={(e) => update('date')(e.target.value)}
                        aria-invalid={Boolean(errors.date)}
                        aria-describedby={errors.date ? 'date-error' : undefined}
                        className="field mt-2"
                      />
                      <FieldError id="date-error" message={errors.date} />
                    </div>
                    <ChoiceGroup
                      legend="Preferred time"
                      name="time"
                      options={booking.slotsFor(locations.find((loc) => loc.name === form.location))}
                      value={form.time}
                      error={errors.time}
                      columns="grid-cols-3 sm:grid-cols-5"
                      onChange={update('time')}
                    />
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-5">
                    <div>
                      <label htmlFor="booking-name" className="text-sm font-medium text-ink">
                        Your name
                      </label>
                      <input
 data-clarity-mask="true"
                        id="booking-name"
                        type="text"
                        autoComplete="name"
                        placeholder="e.g. Riya Sharma"
                        value={form.name}
                        onChange={(e) => update('name')(e.target.value)}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        className="field mt-2"
                      />
                      <FieldError id="name-error" message={errors.name} />
                    </div>
                    <div>
                      <label htmlFor="booking-phone" className="text-sm font-medium text-ink">
                        Mobile number
                      </label>
                      <input
 data-clarity-mask="true"
                        id="booking-phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="98765 43210"
                        value={form.phone}
                        onChange={(e) => update('phone')(e.target.value)}
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={errors.phone ? 'phone-error' : undefined}
                        className="field mt-2"
                      />
                      <FieldError id="phone-error" message={errors.phone} />
                    </div>
                  </div>
                )}

                <div className="sticky bottom-0 -mx-6 mt-auto flex items-center justify-between gap-3 border-t border-ink/10 bg-cream px-6 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 sm:static sm:mx-0 sm:mt-8 sm:border-0 sm:p-0">
                  {step > 0 ? (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="inline-flex items-center gap-2 rounded-md px-2 py-3 text-sm font-medium text-ink hover:text-berry"
                    >
                      <ArrowLeft aria-hidden className="size-4" />
                      Back
                    </button>
                  ) : (
                    <span />
                  )}
                  <Button type="submit" className={sending ? 'pointer-events-none opacity-70' : undefined}>{step === booking.steps.length - 1 ? (sending ? 'Sending…' : 'Request Booking') : 'Continue'}</Button>
                </div>
                {notice && <p role="alert" className="mt-3 text-sm font-medium text-berry">{notice}</p>}
              </form>
            )}
          </m.div>
        </AnimatePresence>
      </div>
    </>
  );
}

/** Retained for the embedded legacy header; normal site CTAs use the dedicated booking page. */
export function BookingModal() {
  const { isOpen, service, location, detail, offer, close } = useBooking();
  return (
    <Modal open={isOpen} onClose={close} labelledBy="booking-title" layout="full">
      <BookingFlow service={service} location={location} detail={detail} offer={offer} active={isOpen} onDone={close} />
    </Modal>
  );
}
