import type { ReactNode } from "react";

export function Callout({
  label,
  variant = "blue",
  children,
}: {
  label?: string;
  variant?: "blue" | "terra" | "mid";
  children: ReactNode;
}) {
  return (
    <aside className={`lm-callout lm-callout-${variant}`}>
      {label && <span className="lm-callout-label">{label}</span>}
      {children}
    </aside>
  );
}
