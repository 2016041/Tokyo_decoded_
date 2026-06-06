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
    <section aria-labelledby="tools-form-heading" className="bg-ink text-paper">
      <div className="max-w-[1200px] mx-auto px-[5vw] lg:px-10 py-[clamp(64px,12vw,120px)]">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          <div>
            <h2
              id="tools-form-heading"
              className="font-[family-name:var(--font-display)] font-bold text-3xl md:text-4xl"
            >
              {toolsContent.heading[locale]}
            </h2>
            <p
              id="tools-form-description"
              className="mt-6 max-w-2xl font-[family-name:var(--font-jp)] text-base md:text-lg text-muted-light"
            >
              {toolsContent.lede[locale]}
            </p>
            <dl className="mt-10 grid gap-6">
              {toolsContent.pillars[locale].map((pillar, i) => (
                <div key={pillar.label} className="flex gap-5 border-t border-paper/20 pt-5">
                  <span className="font-[family-name:var(--font-display)] text-accent font-bold text-lg shrink-0 w-7">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <dt className="font-[family-name:var(--font-jp)] font-medium text-paper">
                      {pillar.label}
                    </dt>
                    <dd className="mt-1 font-[family-name:var(--font-jp)] text-sm text-muted-light">
                      {pillar.body}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>

          <form
            id="tools-form"
            noValidate
            aria-describedby="tools-form-description tools-form-consent"
            onSubmit={handleSubmit}
            className="border border-paper/20 p-6 md:p-8"
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
              className="block font-[family-name:var(--font-jp)] font-medium text-paper"
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
              className="mt-3 w-full rounded-none border border-paper bg-paper px-4 py-3 font-[family-name:var(--font-sans)] text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-0"
            />
            <p id="tools-email-hint" className="mt-2 text-sm text-muted-light">
              {formContent.consent[locale]}
            </p>
            <p
              id="tools-email-error"
              role="alert"
              aria-live="assertive"
              className={emailError ? "mt-2 text-sm text-paper" : "hidden"}
            >
              {emailError}
            </p>
            <p id="tools-form-consent" className="mt-4 text-sm text-muted-light">
              {toolsContent.formLabel[locale]}
            </p>
            {submitState === "error" ? (
              <p className="mt-4 text-sm text-paper">{formContent.error.body[locale]}</p>
            ) : null}
            {submitState === "success" ? (
              <p className="mt-4 text-sm text-paper">{formContent.success.body[locale]}</p>
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
    </section>
  );
}
