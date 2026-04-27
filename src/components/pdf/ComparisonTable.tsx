export type CompareRow = { label: string; left: string; right: string };

export function ComparisonTable({
  leftHeader,
  rightHeader,
  rows,
}: {
  leftHeader: string;
  rightHeader: string;
  rows: CompareRow[];
}) {
  return (
    <table className="lm-compare">
      <thead>
        <tr>
          <th style={{ width: "28%" }}></th>
          <th>{leftHeader}</th>
          <th>{rightHeader}</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            <td style={{ fontWeight: 600 }}>{r.label}</td>
            <td>{r.left}</td>
            <td>{r.right}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
