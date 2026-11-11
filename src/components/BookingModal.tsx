import { useEffect, useRef, useState, type FormEvent } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { ArrowLeft, BadgePercent, Check, ChevronDown, CircleCheckBig, Tag, X } from 'lucide-react';
import { useBooking } from '../context/booking';
import { booking, locations, primaryLocation, site } from '../data/content';
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
const bookingMenus: Array<{ id: Exclude<BookingTab, 'offers'>; label: string; sections: Array<{ title: string; items: string[] }> }> = [
  {
    id: 'hair-care', label: 'Hair Care', sections: [
      { title: 'Haircuts & Styling', items: ['Women’s Haircut & Styling', 'Men’s Haircut & Beard', 'Kids Haircut', 'Blow Dry & Styling'] },
      { title: 'Hair Colour', items: ['Balayage', 'Highlights', 'Global Hair Colour', 'Fashion Colour'] },
      { title: 'Hair Treatments', items: ['Keratin', 'Straightening & Smoothening', 'Nanoplastia', 'Olaplex Bond Repair'] },
      { title: 'Hair Spa', items: ['Moroccan Hair Spa', 'Tri Bond Hair Spa', 'Anti-Dandruff Hair Spa', 'Anti-Hair Fall Hair Spa'] },
    ],
  },
  {
    id: 'skin-care', label: 'Skin Care', sections: [
      { title: 'Facials', items: ['Hydra Facial', 'Anti-Aging Facial', 'Skin Brightening / Vit E Facial'] },
      { title: 'Body Polish', items: ['Full Body', 'Full Legs', 'Full Arms'] },
      { title: 'Waxing', items: ['Full Body', 'Full Legs', 'Full Arms', 'Upper Lip', 'Lower Lip', 'Bikini'] },
      { title: 'Threading', items: ['Eyebrows', 'Upper Lip'] },
      { title: 'Manicure & Pedicure', items: ['Alga', 'Heel Peel', 'Crystal', 'Deluxe'] },
    ],
  },
  {
    id: 'nail-care', label: 'Nail Care', sections: [
      { title: 'File & Polish', items: ['File & Polish'] },
      { title: 'Extensions', items: ['Acrylic', 'Temporary', 'Poly Gel', 'Removal'] },
      { title: 'Overlays', items: ['Overlay'] },
      { title: 'Nail Art', items: ['Nail Art'] },
    ],
  },
];
const bookingOffers = [
  { id: 'offer-hair-colour', title: 'Hair Colour Offers', items: [
    ['Balayage Offer', 'Soft, blended brightness'], ['Highlights Offer', 'Brighter, dimensional strands'], ['Global Hair Colour Offer', 'An all-over shade refresh'], ['Crazy Fashion Colour Offer', 'Bold, creative colour'],
  ] },
  { id: 'offer-hair-treatments', title: 'Hair Treatment Offers', items: [
    ['Keratin Treatment Offer', 'Smoother, more manageable hair'], ['Straightening & Smoothening Offer', 'A sleek, controlled finish'], ['Nanoplastia Offer', 'A natural-looking smoother result'], ['Olaplex Bond Repair Offer', 'Care for stressed or coloured hair'],
  ] },
  { id: 'offer-skin-care', title: 'Skin Care Offers', items: [
    ['Hydra Facial Offer', 'Deep cleansing and hydration'], ['Body Polish Offer', 'A full-body refresh'], ['Hair Spa 2 + 1 Offer', 'Nourishing regular hair care'], ['Anti-Aging Facial Offer', 'Targeted, refreshing skin care'],
  ] },
  { id: 'offer-celebrations', title: 'Celebrations & Value', items: [
    ['Birthday Offer', 'A salon treat for your birthday week'], ['Anniversary Offer', 'Plan a shared celebration'], ['Xing Membership', 'More value for regular care'], ['Xing Gift Card', 'A thoughtful salon gift'],
  ] },
];
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
  onOfferChange: (offer: string | null) => void;
  error?: string;
}) {
  const [tab, setTab] = useState<BookingTab>('offers');
  const [openSection, setOpenSection] = useState('offer-hair-colour');
  const isSelected = (item: string) => selectedServices.includes(item);
  const chooseTab = (next: BookingTab) => {
    setTab(next);
    if (next === 'offers') setOpenSection('offer-hair-colour');
    else setOpenSection(`${next}-${bookingMenus.find((menu) => menu.id === next)?.sections[0]?.title ?? ''}`);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
      <div>
        <div>
          <p className="text-sm font-semibold text-ink">Build your appointment</p>
          <p className="mt-1 text-sm leading-relaxed text-muted">Start with an offer if it suits you, then choose one or more hair, skin or nail services.</p>
        </div>
        <div className="mt-5 flex gap-2 overflow-x-auto pb-1 no-scrollbar" role="tablist" aria-label="Booking choices">
          {bookingTabs.map((item) => (
            <button key={item.id} type="button" role="tab" aria-selected={tab === item.id} onClick={() => chooseTab(item.id)} className={cn('min-h-11 shrink-0 rounded-full border px-4 text-sm font-medium transition', tab === item.id ? 'border-berry bg-berry text-cream' : 'border-ink/15 bg-white text-ink hover:border-berry')}>
              {item.label}
            </button>
          ))}
        </div>
        <div className="mt-4 lg:hidden"><BookingSummary services={selectedServices} offer={selectedOffer} compact /></div>

        {tab === 'offers' ? (
          <div className="mt-5 space-y-2">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-medium text-ink">Choose an offer</p>
              {selectedOffer && <button type="button" onClick={() => onOfferChange(null)} className="min-h-11 shrink-0 text-xs font-medium text-berry underline underline-offset-4">Remove offer</button>}
            </div>
            {bookingOffers.map((group) => {
              const open = openSection === group.id;
              return <section key={group.id} className="overflow-hidden rounded-xl border border-ink/10 bg-white">
                <button type="button" onClick={() => setOpenSection(open ? '' : group.id)} aria-expanded={open} className="flex min-h-12 w-full items-center justify-between gap-3 px-4 text-left text-sm font-semibold text-ink">
                  {group.title}<ChevronDown aria-hidden className={cn('size-4 shrink-0 transition-transform', open && 'rotate-180')} />
                </button>
                {open && <div className="grid gap-2 border-t border-ink/10 p-3">
                  {group.items.map(([name, detail]) => <button key={name} type="button" onClick={() => onOfferChange(name)} aria-pressed={selectedOffer === name} className={cn('flex min-h-11 items-center justify-between gap-3 rounded-lg border px-3 py-2 text-left transition', selectedOffer === name ? 'border-berry bg-berry text-cream' : 'border-ink/10 bg-cream/40 text-ink hover:border-berry')}>
                    <span className="text-sm font-medium">{name}</span><span className={cn('text-xs text-right', selectedOffer === name ? 'text-cream/85' : 'text-muted')}>{detail}</span>
                  </button>)}
                </div>}
              </section>;
            })}
          </div>
        ) : (
          <div className="mt-5 space-y-2">
            {bookingMenus.find((menu) => menu.id === tab)?.sections.map((section) => {
              const id = `${tab}-${section.title}`;
              const open = openSection === id;
              return <section key={section.title} className="overflow-hidden rounded-xl border border-ink/10 bg-white">
                <button type="button" onClick={() => setOpenSection(open ? '' : id)} aria-expanded={open} className="flex min-h-12 w-full items-center justify-between gap-3 px-4 text-left text-sm font-semibold text-ink">
                  {section.title}<ChevronDown aria-hidden className={cn('size-4 shrink-0 transition-transform', open && 'rotate-180')} />
                </button>
                {open && <div className="flex flex-wrap gap-2 border-t border-ink/10 p-3">
                  {section.items.map((item) => {
                    const selection = `${section.title} — ${item}`;
                    return <button key={item} type="button" aria-pressed={isSelected(selection)} onClick={() => onToggleService(selection)} className={cn('inline-flex min-h-11 items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm transition', isSelected(selection) ? 'border-berry bg-berry text-cream' : 'border-ink/15 bg-white text-ink hover:border-berry')}>
                      {isSelected(selection) && <Check aria-hidden className="size-3.5 shrink-0" />}{item}
                    </button>
                  })}
                </div>}
              </section>;
            })}
          </div>
        )}
        <FieldError id="services-error" message={error} />
      </div>
      <div className="hidden lg:block"><BookingSummary services={selectedServices} offer={selectedOffer} /></div>
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
    setForm({ ...EMPTY, services: initialService ? [initialService] : [], location: location || (locations.find((loc) => loc.id === asked)?.name ?? '') });
    setSelectedOffer(offer);
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

  const changeOffer = (chosen: string | null) => setSelectedOffer(chosen ?? '');

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
