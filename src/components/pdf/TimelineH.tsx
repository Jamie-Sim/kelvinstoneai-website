export type TimelineNode = {
  date: string;
  title: string;
  detail?: string;
};

export function TimelineH({
  nodes,
  caption,
}: {
  nodes: TimelineNode[];
  caption?: string;
}) {
  const width = 640;
  const height = 220;
  const padX = 50;
  const step = (width - padX * 2) / (nodes.length - 1 || 1);
  const y = height / 2;

  return (
    <div className="lm-timeline">
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" role="img">
        <line
          x1={padX}
          y1={y}
          x2={width - padX}
          y2={y}
          stroke="#3232AE"
          strokeWidth="1.4"
        />
        {nodes.map((n, i) => {
          const cx = padX + step * i;
          return (
            <g key={i}>
              <text
                x={cx}
                y={y - 48}
                textAnchor="middle"
                fontFamily="Manrope, sans-serif"
                fontSize="10"
                fontWeight="700"
                letterSpacing="1.5"
                fill="#b84c38"
              >
                {n.date.toUpperCase()}
              </text>
              <circle cx={cx} cy={y} r="8" fill="#f0eade" stroke="#3232AE" strokeWidth="1.6" />
              <circle cx={cx} cy={y} r="3" fill="#3232AE" />
              <text
                x={cx}
                y={y + 28}
                textAnchor="middle"
                fontFamily="DM Serif Display, serif"
                fontSize="13"
                fill="#181422"
              >
                {n.title}
              </text>
              {n.detail && (
                <text
                  x={cx}
                  y={y + 48}
                  textAnchor="middle"
                  fontFamily="Manrope, sans-serif"
                  fontSize="9"
                  fill="rgba(24,20,34,0.6)"
                >
                  {n.detail}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      {caption && <p className="lm-timeline-caption">{caption}</p>}
    </div>
  );
}
