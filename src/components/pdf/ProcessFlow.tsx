export type FlowNode = { label: string; sub?: string };

export function ProcessFlow({
  nodes,
  palette = "blue",
}: {
  nodes: FlowNode[];
  palette?: "blue" | "terra";
}) {
  const node = palette === "terra" ? "#b84c38" : "#3232AE";
  const nodeFill = palette === "terra" ? "#fbe7df" : "#e4e5fb";
  const width = 640;
  const height = 150;
  const cellW = width / nodes.length;

  return (
    <div className="lm-flow">
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" role="img">
        {/* connector line */}
        <line
          x1={cellW / 2}
          y1={height / 2}
          x2={width - cellW / 2}
          y2={height / 2}
          stroke="#c9c3b3"
          strokeWidth="1.5"
        />
        {nodes.map((n, i) => {
          const cx = cellW / 2 + i * cellW;
          const cy = height / 2;
          return (
            <g key={i}>
              <circle cx={cx} cy={cy} r="22" fill={nodeFill} stroke={node} strokeWidth="1.4" />
              <text
                x={cx}
                y={cy + 5}
                textAnchor="middle"
                fontFamily="DM Serif Display, serif"
                fontSize="16"
                fill={node}
              >
                {i + 1}
              </text>
              <text
                x={cx}
                y={cy - 34}
                textAnchor="middle"
                fontFamily="Manrope, sans-serif"
                fontSize="11"
                fontWeight="700"
                fill="#181422"
                style={{ letterSpacing: "0.06em", textTransform: "uppercase" }}
              >
                {n.label}
              </text>
              {n.sub && (
                <text
                  x={cx}
                  y={cy + 48}
                  textAnchor="middle"
                  fontFamily="Manrope, sans-serif"
                  fontSize="10"
                  fill="rgba(24,20,34,0.6)"
                >
                  {n.sub}
                </text>
              )}
              {/* arrowhead */}
              {i < nodes.length - 1 && (
                <polygon
                  points={`${cx + 28},${cy - 3} ${cx + 36},${cy} ${cx + 28},${cy + 3}`}
                  fill="#c9c3b3"
                />
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
