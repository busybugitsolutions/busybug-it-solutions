import { useEffect, useRef, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, CheckCircle2, Copy, Mail, Send, X } from 'lucide-react';
import {
  createInquiry,
  INQUIRY_CONSTRAINTS,
  type InquirySource,
} from '../services/inquiryService';
import { CircuitBackdrop } from './CircuitBackdrop';

interface ContactSectionProps {
  prefilledMessage?: string;
  inquirySource?: InquirySource;
  prefillKey?: number;
}

interface FormValues {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

interface SubmittedReceipt {
  referenceId: string;
  submittedAt: string;
  values: FormValues;
}

export function ContactSection({
  prefilledMessage = '',
  inquirySource = 'contact-form',
  prefillKey = 0,
}: ContactSectionProps) {
  const [values, setValues] = useState<FormValues>({
    name: '',
    email: '',
    phone: '',
    message: prefilledMessage,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [receipt, setReceipt] = useState<SubmittedReceipt | null>(null);
  const [toast, setToast] = useState<{ referenceId: string; name: string } | null>(null);
  const [emailCopied, setEmailCopied] = useState(false);
  const toastTimerRef = useRef<number | null>(null);
  const copyTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current !== null) {
        window.clearTimeout(toastTimerRef.current);
      }
      if (copyTimerRef.current !== null) {
        window.clearTimeout(copyTimerRef.current);
      }
    };
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('busybugitsolutions@gmail.com');
      setEmailCopied(true);
      if (copyTimerRef.current !== null) {
        window.clearTimeout(copyTimerRef.current);
      }
      copyTimerRef.current = window.setTimeout(() => setEmailCopied(false), 2500);
    } catch {
      // Clipboard API unavailable in restricted contexts; mailto link remains directly clickable.
    }
  };

  useEffect(() => {
    if (prefilledMessage) {
      setReceipt(null);
      setSubmitError(null);
      setValues((prev) => ({
        ...prev,
        message: prefilledMessage,
      }));
    }
  }, [prefilledMessage, prefillKey]);

  const validate = (form: FormValues): FormErrors => {
    const nextErrors: FormErrors = {};
    const trimmedName = form.name.trim();
    const trimmedEmail = form.email.trim();
    const trimmedPhone = form.phone.trim();
    const trimmedMessage = form.message.trim();

    if (
      trimmedName.length < INQUIRY_CONSTRAINTS.NAME_MIN ||
      trimmedName.length > INQUIRY_CONSTRAINTS.NAME_MAX
    ) {
      nextErrors.name = `Please enter your full name (${INQUIRY_CONSTRAINTS.NAME_MIN}–${INQUIRY_CONSTRAINTS.NAME_MAX} characters).`;
    }

    if (!trimmedEmail) {
      nextErrors.email = 'Please enter your work or personal email address.';
    } else if (
      trimmedEmail.length < INQUIRY_CONSTRAINTS.EMAIL_MIN ||
      trimmedEmail.length > INQUIRY_CONSTRAINTS.EMAIL_MAX ||
      !INQUIRY_CONSTRAINTS.EMAIL_PATTERN.test(trimmedEmail)
    ) {
      nextErrors.email = 'Please enter a valid email address (e.g. name@company.com).';
    }

    const cleanedPhone = trimmedPhone.replace(/[\s\-().+]/g, '');
    if (!trimmedPhone) {
      nextErrors.phone = 'Please enter a phone number so our team can reach you.';
    } else if (
      trimmedPhone.length < INQUIRY_CONSTRAINTS.PHONE_MIN ||
      trimmedPhone.length > INQUIRY_CONSTRAINTS.PHONE_MAX ||
      !INQUIRY_CONSTRAINTS.PHONE_PATTERN.test(trimmedPhone) ||
      !/^\d{7,15}$/.test(cleanedPhone)
    ) {
      nextErrors.phone = 'Please enter a valid phone number (7 to 15 digits).';
    }

    if (
      trimmedMessage.length < INQUIRY_CONSTRAINTS.MESSAGE_MIN ||
      trimmedMessage.length > INQUIRY_CONSTRAINTS.MESSAGE_MAX
    ) {
      nextErrors.message = `Please share a brief summary of your IT needs (${INQUIRY_CONSTRAINTS.MESSAGE_MIN}–${INQUIRY_CONSTRAINTS.MESSAGE_MAX} characters).`;
    }

    return nextErrors;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);
    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const trimmedName = values.name.trim();
      const trimmedEmail = values.email.trim();
      const trimmedPhone = values.phone.trim();
      const trimmedMessage = values.message.trim();

      const { referenceId } = await createInquiry({
        name: trimmedName,
        email: trimmedEmail,
        phone: trimmedPhone,
        message: trimmedMessage,
        source: inquirySource,
      });

      setReceipt({
        referenceId,
        submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        values: {
          name: trimmedName,
          email: trimmedEmail,
          phone: trimmedPhone,
          message: trimmedMessage,
        },
      });

      setToast({ referenceId, name: trimmedName });
      if (toastTimerRef.current !== null) {
        window.clearTimeout(toastTimerRef.current);
      }
      toastTimerRef.current = window.setTimeout(() => {
        setToast(null);
      }, 6000);
    } catch (error) {
      console.error('Failed to persist contact inquiry:', error);
      setSubmitError(
        'We could not save your inquiry right now. Please try again or email busybugitsolutions@gmail.com directly.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setReceipt(null);
    setValues({
      name: '',
      email: '',
      phone: '',
      message: '',
    });
    setErrors({});
  };

  const mailtoHref = receipt
    ? `mailto:busybugitsolutions@gmail.com?subject=${encodeURIComponent(
        `[${receipt.referenceId}] Inquiry from ${receipt.values.name}`
      )}&body=${encodeURIComponent(
        `Name: ${receipt.values.name}\nEmail: ${receipt.values.email}\nPhone: ${receipt.values.phone}\n\nMessage:\n${receipt.values.message}`
      )}`
    : 'mailto:busybugitsolutions@gmail.com';

  return (
    <section id="contact" className="relative overflow-hidden bg-[#E8EDF4] py-20 lg:py-24">
      <CircuitBackdrop variant="subtle" />
      <div className="relative z-10 mx-auto max-w-[1240px] px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Direct Engineering Contact Info */}
          <div className="lg:col-span-5">
            <p className="text-xs font-medium tracking-wide text-[#9A4206]">
              04 · Contact Us
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[#111317] sm:text-4xl text-balance">
              Speak directly with a systems engineer.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#525866]">
              Share your current infrastructure challenges, security goals, or consulting timeline.
              Every inquiry is reviewed by a principal engineer—never a scripted call center.
            </p>

            <div className="mt-8 space-y-6 border-t border-[#E2E5E9] pt-8">
              <div>
                <p className="text-xs font-semibold tracking-wide text-[#525866]">Direct Email</p>
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <a
                    href="mailto:busybugitsolutions@gmail.com"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#111317] hover:text-[#B45309] transition-colors"
                  >
                    <Mail className="h-4 w-4 text-[#525866]" aria-hidden="true" />
                    <span>busybugitsolutions@gmail.com</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex min-h-[34px] items-center gap-1.5 rounded-md border border-[#E2E5E9] bg-white px-2.5 py-1 text-xs font-medium text-[#525866] transition-colors hover:border-[#C9CED6] hover:text-[#111317] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D97706]"
                  >
                    {emailCopied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-[#15803D]" aria-hidden="true" />
                        <span className="text-[#15803D]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="border-t border-[#E2E5E9] pt-5">
                <p className="text-xs font-semibold tracking-wide text-[#525866]">
                  Response Commitment
                </p>
                <p className="mt-1.5 text-sm text-[#374151]">
                  Initial engineering response within <span className="font-mono tabular-nums">1 business day</span>; urgent production outages prioritized immediately.
                </p>
              </div>

              <div className="border-t border-[#E2E5E9] pt-5">
                <p className="text-xs font-semibold tracking-wide text-[#525866]">
                  Typical First Call Agenda
                </p>
                <p className="mt-1.5 text-sm text-[#374151]">
                  25-minute technical discovery covering current stack, pain points, compliance targets, and fixed-scope next steps.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Validated Contact Us Form */}
          <div className="rounded-xl border border-[#C8D2E0] bg-white p-6 sm:p-8 shadow-xs lg:col-span-7">
            {receipt ? (
              <div role="status" aria-live="polite" className="space-y-6">
                <div className="flex items-start gap-3 border-b border-[#E2E5E9] pb-6">
                  <CheckCircle2
                    className="mt-0.5 h-6 w-6 shrink-0 text-[#15803D]"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-mono text-xs text-[#525866] tabular-nums">
                      Reference {receipt.referenceId} · Logged at {receipt.submittedAt}
                    </p>
                    <h3 className="mt-1 font-display text-2xl font-semibold tracking-tight text-[#111317]">
                      Message received by BusyBug IT Solutions.
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#525866]">
                      Thank you, {receipt.values.name}. Our engineering desk will review your
                      inquiry and follow up at{' '}
                      <span className="font-medium text-[#111317]">{receipt.values.email}</span> or{' '}
                      <span className="font-mono text-[#111317] tabular-nums">
                        {receipt.values.phone}
                      </span>
                      .
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border border-[#E2E5E9] bg-[#FAFAFA] p-4 text-sm text-[#374151]">
                  <p className="text-xs font-semibold text-[#525866]">Submitted Summary</p>
                  <p className="mt-2 whitespace-pre-line leading-relaxed">
                    {receipt.values.message}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href={mailtoHref}
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#111317] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#262A33] whitespace-nowrap"
                  >
                    <Mail className="h-4 w-4 text-[#F59E0B]" aria-hidden="true" />
                    <span>Open Copy in Email Client</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex min-h-[44px] items-center rounded-lg border border-[#D4D8DF] bg-white px-5 py-2.5 text-sm font-semibold text-[#111317] transition-colors hover:border-[#111317] whitespace-nowrap cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {submitError && (
                  <div
                    role="alert"
                    className="rounded-lg border border-[#FCA5A5] bg-[#FEF2F2] p-3.5 text-xs font-medium text-[#B91C1C]"
                  >
                    {submitError}
                  </div>
                )}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-semibold text-[#111317]"
                    >
                      Name <span className="text-[#B45309]">*</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      maxLength={INQUIRY_CONSTRAINTS.NAME_MAX}
                      placeholder="Jordan Taylor"
                      value={values.name}
                      onChange={(e) => {
                        setValues((prev) => ({ ...prev, name: e.target.value }));
                        if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                      }}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'contact-name-error' : undefined}
                      className={`mt-1.5 block w-full min-h-[44px] rounded-lg border px-3.5 py-2.5 text-sm text-[#111317] placeholder:text-[#8A92A1] bg-[#FAFAFA] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D97706]/30 ${
                        errors.name
                          ? 'border-[#DC2626] focus:border-[#DC2626]'
                          : 'border-[#D4D8DF] focus:border-[#111317]'
                      }`}
                    />
                    {errors.name && (
                      <p id="contact-name-error" className="mt-1.5 text-xs font-medium text-[#DC2626]">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-semibold text-[#111317]"
                    >
                      Email <span className="text-[#B45309]">*</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      maxLength={INQUIRY_CONSTRAINTS.EMAIL_MAX}
                      placeholder="jordan@company.com"
                      value={values.email}
                      onChange={(e) => {
                        setValues((prev) => ({ ...prev, email: e.target.value }));
                        if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                      }}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'contact-email-error' : undefined}
                      className={`mt-1.5 block w-full min-h-[44px] rounded-lg border px-3.5 py-2.5 text-sm text-[#111317] placeholder:text-[#8A92A1] bg-[#FAFAFA] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D97706]/30 ${
                        errors.email
                          ? 'border-[#DC2626] focus:border-[#DC2626]'
                          : 'border-[#D4D8DF] focus:border-[#111317]'
                      }`}
                    />
                    {errors.email && (
                      <p id="contact-email-error" className="mt-1.5 text-xs font-medium text-[#DC2626]">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-phone"
                    className="block text-xs font-semibold text-[#111317]"
                  >
                    Phone Number <span className="text-[#B45309]">*</span>
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    maxLength={INQUIRY_CONSTRAINTS.PHONE_MAX}
                    placeholder="+1 (555) 234-5678"
                    value={values.phone}
                    onChange={(e) => {
                      setValues((prev) => ({ ...prev, phone: e.target.value }));
                      if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                    }}
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
                    className={`mt-1.5 block w-full min-h-[44px] rounded-lg border px-3.5 py-2.5 font-mono text-sm text-[#111317] placeholder:font-sans placeholder:text-[#8A92A1] bg-[#FAFAFA] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D97706]/30 tabular-nums ${
                      errors.phone
                        ? 'border-[#DC2626] focus:border-[#DC2626]'
                        : 'border-[#D4D8DF] focus:border-[#111317]'
                    }`}
                  />
                  {errors.phone && (
                    <p id="contact-phone-error" className="mt-1.5 text-xs font-medium text-[#DC2626]">
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold text-[#111317]"
                  >
                    Message <span className="text-[#B45309]">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    maxLength={INQUIRY_CONSTRAINTS.MESSAGE_MAX}
                    placeholder="Describe your infrastructure environment, security requirements, or software goals..."
                    value={values.message}
                    onChange={(e) => {
                      setValues((prev) => ({ ...prev, message: e.target.value }));
                      if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                    }}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'contact-message-error' : undefined}
                    className={`mt-1.5 block w-full rounded-lg border px-3.5 py-2.5 text-sm leading-relaxed text-[#111317] placeholder:text-[#8A92A1] bg-[#FAFAFA] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D97706]/30 ${
                      errors.message
                        ? 'border-[#DC2626] focus:border-[#DC2626]'
                        : 'border-[#D4D8DF] focus:border-[#111317]'
                    }`}
                  />
                  {errors.message && (
                    <p
                      id="contact-message-error"
                      className="mt-1.5 text-xs font-medium text-[#DC2626]"
                    >
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <p className="text-xs text-[#525866]">
                    Protected by strict confidentiality. Direct to engineering.
                  </p>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-[#111317] px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#262A33] disabled:opacity-60 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D97706]"
                  >
                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                    <Send className="h-4 w-4 text-[#F59E0B]" aria-hidden="true" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Dismissible Toast Notification on Submission */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.referenceId}
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-4 bottom-4 z-50 flex max-w-sm items-start gap-3 rounded-lg border border-[#E2E5E9] bg-[#111317] p-4 text-white shadow-lg sm:right-6 sm:bottom-6"
          >
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#F59E0B]" aria-hidden="true" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">Message sent successfully</p>
              <p className="mt-0.5 text-xs text-[#D4D8DF]">
                Thanks, {toast.name}. Ticket{' '}
                <span className="font-mono text-[#F59E0B] tabular-nums">{toast.referenceId}</span>{' '}
                has been logged with BusyBug Engineering.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setToast(null)}
              aria-label="Dismiss notification"
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-[#9CA3AF] hover:bg-white/10 hover:text-white transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F59E0B]"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
