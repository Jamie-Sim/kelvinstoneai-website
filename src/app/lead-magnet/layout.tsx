import type { Metadata } from "next";
import "./print.css";

export const metadata: Metadata = {
  title: "Kelvinstone AI — The Business Owner's Introduction to AI",
  description:
    "A plain-English guide to what AI is, how it works, and what it means for your business.",
  robots: { index: false, follow: false },
};

export default function LeadMagnetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="lm-root">{children}</div>;
}
