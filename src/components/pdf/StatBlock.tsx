import type { CSSProperties } from "react";

export type Stat = { value: string; label: string };

export function StatGrid({
  stats,
  cols = 3,
}: {
  stats: Stat[];
  cols?: 2 | 3 | 4;
}) {
  return (
    <div
      className="lm-stat-grid"
      style={{ "--cols": cols } as CSSProperties & Record<string, number>}
    >
      {stats.map((s, i) => (
        <div key={i} className="lm-stat">
          <span className="lm-stat-value">{s.value}</span>
          <span className="lm-stat-label">{s.label}</span>
        </div>
      ))}
    </div>
  );
}
