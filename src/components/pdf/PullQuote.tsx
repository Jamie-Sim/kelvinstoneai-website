import type { ReactNode } from "react";

export function PullQuote({
  children,
  attr,
}: {
  children: ReactNode;
  attr?: string;
}) {
  return (
    <blockquote className="lm-pullquote">
      {children}
      {attr && <span className="lm-pullquote-attr">{attr}</span>}
    </blockquote>
  );
}
