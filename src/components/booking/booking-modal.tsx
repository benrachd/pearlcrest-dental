"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useId, useRef, useState } from "react";
import { duration, easing } from "@/animations/transitions";
import { useBookingModal } from "@/components/booking/booking-modal-provider";
import { ArrowRightGlyph } from "@/components/sections/hero/hero-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getWhatsAppHrefWithText } from "@/constants/contact-config";
import { useLockBodyScroll } from "@/hooks/use-lock-body-scroll";
import { submitBookingInquiry, type BookingInquiryPayload } from "@/lib/submit-booking-inquiry";
import { cn } from "@/utils/cn";

const SERVICE_KEYS = ["smileAesthetics", "veneers", "implants", "whitening", "general"] as const;

type ServiceKey = (typeof SERVICE_KEYS)[number];

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  service: ServiceKey | "";
  message: string;
};

const emptyForm: FormState = {
  fullName: "",
  email: "",
  phone: "",
  service: "",
  message: "",
};

type ModalView = "form" | "success";

const fieldClassName =
  "border-gold-500/20 bg-neutral-950/50 text-neutral-50 placeholder:text-neutral-400 focus-visible:border-gold-500/50 focus-visible:ring-gold-500/20";

const labelClassName = "text-neutral-200 mb-2 font-medium tracking-[0.02em]";

function CloseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function buildWhatsAppPrefill(payload: BookingInquiryPayload, labels: Record<string, string>): string {
  return [
    labels.prefillIntro,
    `${labels.fullName}: ${payload.fullName}`,
    `${labels.email}: ${payload.email}`,
    `${labels.phone}: ${payload.phone}`,
    `${labels.service}: ${payload.service}`,
    payload.message ? `${labels.message}: ${payload.message}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export function BookingModal() {
  const { isOpen, closeBookingModal } = useBookingModal();
  const t = useTranslations("BookingModal");
  const titleId = useId();
  const descriptionId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<ModalView>("form");
  const [form, setForm] = useState<FormState>(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [submittedPayload, setSubmittedPayload] = useState<BookingInquiryPayload | null>(null);

  useLockBodyScroll(isOpen);

  useEffect(() => {
    if (!isOpen) return;

    const lenis = window.__lenis;
    lenis?.stop();

    return () => {
      lenis?.start();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeBookingModal();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, closeBookingModal]);

  useEffect(() => {
    if (isOpen) return;

    const timer = window.setTimeout(() => {
      setView("form");
      setForm(emptyForm);
      setIsSubmitting(false);
      setSubmitError(false);
      setSubmittedPayload(null);
    }, 450);

    return () => window.clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || view !== "form") return;
    const firstField = panelRef.current?.querySelector<HTMLElement>("input, select, textarea, button");
    firstField?.focus();
  }, [isOpen, view]);

  const whatsappHref =
    submittedPayload && view === "success"
      ? getWhatsAppHrefWithText(
          buildWhatsAppPrefill(submittedPayload, {
            prefillIntro: t("whatsappPrefillIntro"),
            fullName: t("fullNameLabel"),
            email: t("emailLabel"),
            phone: t("phoneLabel"),
            service: t("serviceLabel"),
            message: t("messageLabel"),
          }),
        )
      : null;

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.service) return;

    setIsSubmitting(true);
    setSubmitError(false);

    const payload: BookingInquiryPayload = {
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      service: t(`services.${form.service}`),
      message: form.message.trim(),
    };

    const success = await submitBookingInquiry(payload);
    setIsSubmitting(false);

    if (!success) {
      setSubmitError(true);
      return;
    }

    setSubmittedPayload(payload);
    setView("success");
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          role="presentation"
          className="fixed inset-0 z-[100] flex items-end justify-center overflow-hidden sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: duration.base, ease: easing.luxury }}
        >
          <motion.button
            type="button"
            aria-label={t("closeAria")}
            className="absolute inset-0 bg-neutral-950/78 backdrop-blur-[6px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeBookingModal}
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            className={cn(
              "relative z-10 flex max-h-[94dvh] w-full max-w-full flex-col overflow-hidden",
              "border-gold-500/20 rounded-t-card border bg-[#1a1612] shadow-[0_24px_80px_rgba(0,0,0,0.55)]",
              "sm:max-h-[min(90dvh,820px)] sm:max-w-xl sm:rounded-card",
            )}
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 32 }}
            transition={{ duration: duration.slow, ease: easing.luxury }}
          >
            <div
              aria-hidden="true"
              className="from-gold-500/10 pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b to-transparent"
            />

            <div className="border-gold-500/15 relative flex items-start justify-between gap-4 border-b px-5 pb-5 pt-5 sm:px-8 sm:pt-8">
              <div className="min-w-0 flex-1 pe-2">
                <p className="text-caption text-gold-400 mb-3 uppercase tracking-[0.22em]">{t("eyebrow")}</p>
                <h2 id={titleId} className="font-heading text-display-sm text-neutral-50 font-medium tracking-[-0.02em]">
                  {view === "form" ? t("title") : t("successTitle")}
                </h2>
                <p id={descriptionId} className="text-body-md text-neutral-300 mt-3 leading-[1.75] tracking-[0.01em]">
                  {view === "form" ? t("subtitle") : t("successSubtitle")}
                </p>
              </div>

              <button
                type="button"
                onClick={closeBookingModal}
                aria-label={t("closeAria")}
                data-cursor="interactive"
                className="border-gold-500/20 text-neutral-300 hover:border-gold-500/40 hover:text-gold-200 ease-luxury flex size-10 shrink-0 items-center justify-center rounded-full border bg-neutral-950/40 transition-[color,border-color,background-color] duration-700"
              >
                <CloseIcon className="size-4" />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-6 sm:px-8 sm:py-8">
              {view === "form" ? (
                <form className="flex flex-col gap-6" onSubmit={handleSubmit} noValidate={false}>
                  <div>
                    <Label htmlFor="booking-full-name" required className={labelClassName}>
                      {t("fullNameLabel")}
                    </Label>
                    <Input
                      id="booking-full-name"
                      name="fullName"
                      autoComplete="name"
                      required
                      value={form.fullName}
                      onChange={(event) => updateField("fullName", event.target.value)}
                      className={fieldClassName}
                    />
                  </div>

                  <div>
                    <Label htmlFor="booking-email" required className={labelClassName}>
                      {t("emailLabel")}
                    </Label>
                    <Input
                      id="booking-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      required
                      value={form.email}
                      onChange={(event) => updateField("email", event.target.value)}
                      className={fieldClassName}
                    />
                  </div>

                  <div>
                    <Label htmlFor="booking-phone" required className={labelClassName}>
                      {t("phoneLabel")}
                    </Label>
                    <Input
                      id="booking-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      required
                      value={form.phone}
                      onChange={(event) => updateField("phone", event.target.value)}
                      className={fieldClassName}
                    />
                  </div>

                  <div>
                    <Label htmlFor="booking-service" required className={labelClassName}>
                      {t("serviceLabel")}
                    </Label>
                    <select
                      id="booking-service"
                      name="service"
                      required
                      value={form.service}
                      onChange={(event) => updateField("service", event.target.value as ServiceKey | "")}
                      className={cn(
                        fieldClassName,
                        "text-body-md h-11 w-full appearance-none rounded-md border px-3.5",
                        "focus-visible:ring-2 focus-visible:outline-none",
                      )}
                    >
                      <option value="" disabled>
                        {t("servicePlaceholder")}
                      </option>
                      {SERVICE_KEYS.map((key) => (
                        <option key={key} value={key} className="bg-neutral-900 text-neutral-50">
                          {t(`services.${key}`)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="booking-message" className={labelClassName}>
                      {t("messageLabel")}
                    </Label>
                    <Textarea
                      id="booking-message"
                      name="message"
                      value={form.message}
                      onChange={(event) => updateField("message", event.target.value)}
                      className={cn(fieldClassName, "min-h-32")}
                    />
                  </div>

                  {submitError ? (
                    <p role="alert" className="text-body-sm text-error">
                      {t("submitError")}
                    </p>
                  ) : null}

                  <Button
                    type="submit"
                    variant="accent"
                    size="xl"
                    loading={isSubmitting}
                    endIcon={ArrowRightGlyph}
                    className="hover:shadow-gold mt-2 w-full rounded-full"
                  >
                    {t("submitCta")}
                  </Button>
                </form>
              ) : (
                <div className="flex flex-col gap-6 pt-2">
                  {whatsappHref ? (
                    <Button
                      asChild
                      variant="outline"
                      size="xl"
                      endIcon={ArrowRightGlyph}
                      className="w-full rounded-full border-gold-500/30 bg-transparent text-neutral-100 hover:bg-gold-500/10"
                    >
                      <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                        {t("whatsappCta")}
                      </a>
                    </Button>
                  ) : null}

                  <Button
                    type="button"
                    variant="ghost"
                    size="lg"
                    onClick={closeBookingModal}
                    className="text-neutral-300 hover:bg-neutral-900/60 hover:text-neutral-50"
                  >
                    {t("closeCta")}
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
