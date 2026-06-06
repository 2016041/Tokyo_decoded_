"use client";

import { useRef, useState, type FormEvent } from "react";
import { formsContent } from "@/content/forms";
import type { Locale } from "@/content/types";
import { Button } from "@/components/ui/Button";

type ContactFormProps = {
  locale?: Locale;
};

type ContactFields = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type ContactErrors = Partial<Record<keyof ContactFields, string>>;

type SubmitState = "idle" | "submitting" | "success" | "error";

const initialFields: ContactFields = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validateFields(fields: ContactFields, locale: Locale): ContactErrors {
  const errors: ContactErrors = {};
  const validation = formsContent.contact.validation;

  if (!fields.name.trim()) {
    errors.name = validation.required[locale];
  }

  if (!fields.email.trim()) {
    errors.email = validation.required[locale];
  } else if (!isValidEmail(fields.email.trim())) {
    errors.email = validation.emailInvalid[locale];
  }

  if (!fields.subject.trim()) {
    errors.subject = validation.required[locale];
  }

  if (!fields.message.trim()) {
    errors.message = validation.required[locale];
  }

  return errors;
}

export function ContactForm({ locale = "ja" }: ContactFormProps) {
  const [fields, setFields] = useState<ContactFields>(initialFields);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const content = formsContent.contact;
  const isSubmitting = submitState === "submitting";
  const hasErrors = Object.keys(errors).length > 0;

  function updateField(name: keyof ContactFields, value: string) {
    setFields((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateFields(fields, locale);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmitState("idle");
      requestAnimationFrame(() => errorSummaryRef.current?.focus());
      return;
    }

    setSubmitState("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, recaptchaToken: "" }),
      });

      if (!response.ok) {
        setSubmitState("error");
        return;
      }

      setSubmitState("success");
      setFields(initialFields);
    } catch {
      setSubmitState("error");
    }
  }

  return (
    <section aria-labelledby="contact-form-heading" className="bg-paper">
      <div className="max-w-[1200px] mx-auto px-[5vw] lg:px-10 py-[clamp(64px,12vw,120px)]">
        <h1
          id="contact-form-heading"
          className="font-[family-name:var(--font-jp)] font-black text-ink text-4xl md:text-5xl"
        >
          {content.heading[locale]}
        </h1>

        <form
          id="contact-form"
          noValidate
          aria-describedby="contact-form-intro"
          onSubmit={handleSubmit}
          className="mt-10 max-w-3xl"
        >
          <p id="contact-form-intro" className="text-ink">
            {content.subheading[locale]}
          </p>

          <div
            ref={errorSummaryRef}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            id="contact-error-summary"
            tabIndex={-1}
            className={
              hasErrors || submitState === "error"
                ? "mt-8 border border-ink bg-cream p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
                : "hidden"
            }
          >
            <h2 className="font-[family-name:var(--font-jp)] font-medium text-xl text-ink">
              {submitState === "error"
                ? content.error.heading[locale]
                : content.validation.required[locale]}
            </h2>
            {submitState === "error" ? (
              <p className="mt-2 text-ink">{content.error.body[locale]}</p>
            ) : (
              <ul id="contact-error-list" role="list" className="mt-3 list-disc pl-5 text-ink">
                {Object.entries(errors).map(([field, message]) =>
                  message ? <li key={field}>{message}</li> : null,
                )}
              </ul>
            )}
          </div>

          <div
            aria-live="polite"
            aria-atomic="true"
            id="contact-success"
            className="sr-only"
          >
            {submitState === "success" ? content.success.body[locale] : ""}
          </div>

          {submitState === "success" ? (
            <div className="mt-8 border border-ink bg-cream p-6">
              <h2 className="font-[family-name:var(--font-jp)] font-medium text-2xl text-ink">
                {content.success.heading[locale]}
              </h2>
              <p className="mt-3 text-ink">{content.success.body[locale]}</p>
            </div>
          ) : null}

          <fieldset className="mt-10 border-0 p-0">
            <legend className="font-[family-name:var(--font-jp)] font-medium text-2xl text-ink">
              {locale === "ja" ? "お客様の情報" : "Your Information"}
            </legend>
            <div className="mt-6 grid gap-6">
              <div>
                <label htmlFor="contact-name" className="block font-medium text-ink">
                  {content.fields.name[`label_${locale}`]} <span aria-hidden="true">*</span>
                  <span className="sr-only">（必須）</span>
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  required
                  aria-required="true"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby="contact-name-error"
                  autoComplete="name"
                  value={fields.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  placeholder={content.fields.name[`placeholder_${locale}`]}
                  className="mt-2 w-full rounded-none border border-ink bg-paper px-4 py-3 text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-0"
                />
                <p
                  id="contact-name-error"
                  role="alert"
                  className={errors.name ? "mt-2 text-sm text-ink" : "hidden"}
                >
                  {errors.name}
                </p>
              </div>

              <div>
                <label htmlFor="contact-email" className="block font-medium text-ink">
                  {content.fields.email[`label_${locale}`]} <span aria-hidden="true">*</span>
                  <span className="sr-only">（必須）</span>
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  required
                  aria-required="true"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby="contact-email-error"
                  autoComplete="email"
                  value={fields.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  placeholder={content.fields.email[`placeholder_${locale}`]}
                  className="mt-2 w-full rounded-none border border-ink bg-paper px-4 py-3 text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-0"
                />
                <p
                  id="contact-email-error"
                  role="alert"
                  className={errors.email ? "mt-2 text-sm text-ink" : "hidden"}
                >
                  {errors.email}
                </p>
              </div>
            </div>
          </fieldset>

          <fieldset className="mt-10 border-0 p-0">
            <legend className="font-[family-name:var(--font-jp)] font-medium text-2xl text-ink">
              {locale === "ja" ? "お問い合わせ内容" : "Inquiry Details"}
            </legend>
            <div className="mt-6 grid gap-6">
              <div>
                <label htmlFor="contact-subject" className="block font-medium text-ink">
                  {content.fields.subject[`label_${locale}`]}{" "}
                  <span aria-hidden="true">*</span>
                  <span className="sr-only">（必須）</span>
                </label>
                <input
                  type="text"
                  id="contact-subject"
                  name="subject"
                  required
                  aria-required="true"
                  aria-invalid={Boolean(errors.subject)}
                  aria-describedby="contact-subject-error"
                  autoComplete="on"
                  value={fields.subject}
                  onChange={(event) => updateField("subject", event.target.value)}
                  placeholder={content.fields.subject[`placeholder_${locale}`]}
                  className="mt-2 w-full rounded-none border border-ink bg-paper px-4 py-3 text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-0"
                />
                <p
                  id="contact-subject-error"
                  role="alert"
                  className={errors.subject ? "mt-2 text-sm text-ink" : "hidden"}
                >
                  {errors.subject}
                </p>
              </div>

              <div>
                <label htmlFor="contact-message" className="block font-medium text-ink">
                  {content.fields.message[`label_${locale}`]}{" "}
                  <span aria-hidden="true">*</span>
                  <span className="sr-only">（必須）</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  aria-required="true"
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby="contact-message-error"
                  rows={6}
                  value={fields.message}
                  onChange={(event) => updateField("message", event.target.value)}
                  placeholder={content.fields.message[`placeholder_${locale}`]}
                  className="mt-2 w-full rounded-none border border-ink bg-paper px-4 py-3 text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-0"
                />
                <p
                  id="contact-message-error"
                  role="alert"
                  className={errors.message ? "mt-2 text-sm text-ink" : "hidden"}
                >
                  {errors.message}
                </p>
              </div>
            </div>
          </fieldset>

          <p className="mt-8 text-sm text-muted">
            {content.recaptcha.notice[locale]}{" "}
            <a
              href={content.recaptcha.privacyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
            >
              {content.recaptcha.privacyLabel[locale]}
            </a>
            {locale === "ja" ? "" : " "}
            {content.recaptcha.conjunction[locale]}
            {locale === "ja" ? "" : " "}
            <a
              href={content.recaptcha.termsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
            >
              {content.recaptcha.termsLabel[locale]}
            </a>
            {content.recaptcha.suffix[locale]}
          </p>

          <Button
            type="submit"
            aria-busy={isSubmitting}
            disabled={isSubmitting}
            className="mt-8 motion-reduce:transition-none"
          >
            {isSubmitting ? content.submitting[locale] : content.submitButton[locale]}
          </Button>
        </form>
      </div>
    </section>
  );
}
