import type { ReactNode } from "react";

export function Page({
  variant,
  children,
}: {
  variant: "cover" | "toc" | "divider" | "content" | "plain";
  children: ReactNode;
}) {
  return <section className={`lm-page lm-${variant}`}>{children}</section>;
}
