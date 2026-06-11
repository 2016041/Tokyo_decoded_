"use client";

import { useState, type FormEvent } from "react";
import { formsContent } from "@/content/forms";
import { homeContent } from "@/content/home";
import type { Locale } from "@/content/types";
import { Button } from "@/components/ui/Button";

type EditorsToolsFormProps = {
  locale?: Locale;
};

type SubmitState = "idle" | "submitting" | "success" | "error";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function EditorsToolsForm({ locale = "ja" }: EditorsToolsFormProps) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const toolsContent = homeContent.tools;
  const formContent = formsContent.subscribe;
  const isSubmitting = submitState === "submitting";
  const [heading, headingNote] = toolsContent.heading[locale].split(" — ");
  const toolNames =
    locale === "ja"
      ? ["Research Brief", "Digital Kakeibo", "Trend Worksheet"]
      : ["Research Brief", "Digital Kakeibo", "Trend Worksheet"];

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setEmailError(formContent.validation.required[locale]);
      setSubmitState("idle");
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      setEmailError(formContent.validation.invalid[locale]);
      setSubmitState("idle");
      return;
    }

    setEmailError("");
    setSubmitState("submitting");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail }),
      });

      if (!response.ok) {
        setSubmitState("error");
        return;
      }

      setSubmitState("success");
      setEmail("");
    } catch {
      setSubmitState("error");
    }
  }

  return (
    <section aria-labelledby="tools-form-heading" className="bg-cream">
      <div className="mx-auto max-w-[1200px] px-[5vw] py-[clamp(88px,12vw,136px)] lg:px-10">
        <div>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.55fr)] lg:items-start">
            <div>
              <h2
                id="tools-form-heading"
                className="max-w-4xl font-display text-[clamp(2.6rem,5.4vw,5.4rem)] font-bold leading-none tracking-normal text-ink"
              >
                {heading}
              </h2>
              {headingNote ? (
                <p className="mt-4 font-jp text-2xl font-black leading-tight text-ink md:text-3xl">
                  {headingNote}
                </p>
              ) : null}
              <p
                id="tools-form-description"
                className="mt-6 max-w-2xl font-jp text-base leading-relaxed text-ink md:text-lg"
              >
                {toolsContent.lede[locale]}
              </p>

              <dl className="mt-12 border-y border-ink">
                {toolsContent.pillars[locale].map((pillar, index) => (
                  <div
                    key={pillar.label}
                    className="group grid gap-5 border-b border-ink bg-cream py-6 transition-colors duration-[250ms] last:border-b-0 hover:bg-ink hover:text-paper motion-reduce:transition-none md:grid-cols-[72px_minmax(0,1fr)]"
                  >
                    <span
                      aria-hidden="true"
                      className="font-display text-3xl font-bold leading-none text-accent group-hover:text-paper"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <dt>
                        <span className="font-sans text-xs font-medium uppercase tracking-widest text-ink group-hover:text-paper">
                          {toolNames[index]}
                        </span>
                        <span className="mt-3 block font-jp text-xl font-black leading-tight">
                          {pillar.label}
                        </span>
                      </dt>
                      <dd className="mt-3 max-w-2xl text-sm leading-relaxed text-ink group-hover:text-muted-light md:text-base">
                        {pillar.body}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>

            <div className="border border-ink bg-paper p-6 md:p-8 lg:sticky lg:top-28 lg:self-start">
              <p className="font-jp text-xl font-black leading-tight text-ink">
                {toolsContent.formCta[locale]}
              </p>
              <form
                id="tools-form"
                noValidate
                aria-describedby="tools-form-description tools-form-consent"
                onSubmit={handleSubmit}
                className="mt-8 text-ink"
              >
                <div
                  aria-live="assertive"
                  aria-atomic="true"
                  id="tools-form-error"
                  role="alert"
                  className="sr-only"
                >
                  {emailError || submitState === "error"
                    ? emailError || formContent.error.body[locale]
                    : ""}
                </div>
                <div
                  aria-live="polite"
                  aria-atomic="true"
                  id="tools-form-success"
                  className="sr-only"
                >
                  {submitState === "success" ? formContent.success.body[locale] : ""}
                </div>

                <label
                  htmlFor="tools-email"
                  className="block font-jp font-medium text-ink"
                >
                  {formContent.inputLabel[locale]}{" "}
                  <span aria-hidden="true">*</span>
                  <span className="sr-only">（必須）</span>
                </label>
                <input
                  type="email"
                  id="tools-email"
                  name="email"
                  required
                  autoComplete="email"
                  aria-describedby="tools-email-hint tools-email-error"
                  aria-invalid={Boolean(emailError)}
                  aria-required="true"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder={formContent.placeholder[locale]}
                  className="mt-3 w-full rounded-none border border-ink bg-paper px-4 py-3 font-sans text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-0"
                />
                <p id="tools-email-hint" className="mt-2 text-sm text-muted">
                  {formContent.consent[locale]}
                </p>
                <p id="tools-email-error" role="alert" aria-live="assertive" className={emailError ? "mt-2 text-sm font-medium text-ink" : "hidden"}>
                  {emailError}
                </p>
                <p id="tools-form-consent" className="mt-4 text-sm text-muted">
                  {toolsContent.formLabel[locale]}
                </p>
                {submitState === "error" ? (
                  <p className="mt-4 text-sm font-medium text-ink">{formContent.error.body[locale]}</p>
                ) : null}
                {submitState === "success" ? (
                  <p className="mt-4 text-sm font-medium text-ink">{formContent.success.body[locale]}</p>
                ) : null}
                <Button
                  type="submit"
                  aria-busy={isSubmitting}
                  disabled={isSubmitting}
                  className="mt-6 w-full motion-reduce:transition-none"
                >
                  {isSubmitting
                    ? formContent.submitting[locale]
                    : formContent.submitButton[locale]}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
