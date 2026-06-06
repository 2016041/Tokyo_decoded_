import Link from "next/link";
import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";

type ButtonVariant = "primary" | "outline";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: ButtonVariant;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  disabled?: boolean;
  "aria-busy"?: boolean;
  "aria-describedby"?: string;
  "data-tool-slug"?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
};

const baseClass =
  "inline-flex items-center justify-center font-[family-name:var(--font-sans)] text-sm md:text-base font-medium rounded-none px-8 py-3 md:px-10 md:py-4 transition-colors duration-[150ms] motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-accent text-paper hover:bg-ink active:scale-95",
  outline:
    "bg-transparent border border-ink text-ink hover:bg-ink hover:text-paper active:scale-95",
};

function cx(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export function Button({
  children,
  href,
  variant = "primary",
  type = "button",
  disabled = false,
  "aria-busy": ariaBusy,
  "aria-describedby": ariaDescribedby,
  "data-tool-slug": dataToolSlug,
  onClick,
  className,
}: ButtonProps) {
  const composedClassName = cx(
    baseClass,
    variantClasses[variant],
    disabled && "pointer-events-none border-ink/20 bg-muted text-paper",
    className,
  );

  if (href) {
    return (
      <Link
        href={href}
        className={composedClassName}
        aria-disabled={disabled || undefined}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      aria-busy={ariaBusy}
      aria-describedby={ariaDescribedby}
      data-tool-slug={dataToolSlug}
      onClick={onClick}
      className={composedClassName}
    >
      {children}
    </button>
  );
}
