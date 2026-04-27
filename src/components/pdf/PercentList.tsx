export type PercentRow = { label: string; value: string };

export function PercentList({
  rows,
  accent = "terra",
}: {
  rows: PercentRow[];
  accent?: "terra" | "blue";
}) {
  return (
    <ul className={`lm-percentlist lm-percentlist-${accent}`}>
      {rows.map((r, i) => (
        <li key={i}>
          <span className="lm-percentlist-label">{r.label}</span>
          <span className="lm-percentlist-dots" aria-hidden="true" />
          <span className="lm-percentlist-value">{r.value}</span>
        </li>
      ))}
    </ul>
  );
}
