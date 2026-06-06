import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

function cx(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cx(
        "bg-cream border border-ink/10 rounded-none p-6 md:p-8 shadow-[0_1px_4px_rgba(0,0,0,0.08)] transition-colors duration-[250ms] motion-reduce:transition-none hover:bg-ink hover:text-paper",
        className,
      )}
    >
      {children}
    </div>
  );
}
