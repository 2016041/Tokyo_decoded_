type BadgeProps = {
  label: string;
  className?: string;
  "aria-hidden"?: boolean;
};

function cx(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export function Badge({
  label,
  className,
  "aria-hidden": ariaHidden,
}: BadgeProps) {
  return (
    <span
      aria-hidden={ariaHidden}
      className={cx(
        "bg-accent text-paper text-xs font-sans font-medium px-2 py-0.5 rounded-sm inline-block",
        className,
      )}
    >
      {label}
    </span>
  );
}
