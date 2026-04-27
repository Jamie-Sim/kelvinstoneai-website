import { Page } from "./Page";

export function StatHero({
  stat,
  label,
  sub,
  source,
  variant = "blue",
  eyebrow,
}: {
  stat: string;
  label: string;
  sub?: string;
  source?: string;
  variant?: "blue" | "terra";
  eyebrow?: string;
}) {
  return (
    <Page variant="plain">
      <div className={`lm-stathero lm-stathero-${variant}`}>
        <div className="lm-stathero-top">
          <span>{eyebrow ?? "Section 02 · The Shift That's Happening"}</span>
          <span>Guide 01</span>
        </div>
        <div className="lm-stathero-center">
          <div className="lm-stathero-value">{stat}</div>
          <p className="lm-stathero-label">{label}</p>
          {sub && <p className="lm-stathero-sub">{sub}</p>}
        </div>
        <div className="lm-stathero-foot">
          {source && <span>{source}</span>}
          <span className="lm-stathero-mark">Kelvinstone AI</span>
        </div>
      </div>
    </Page>
  );
}
