"use client";

interface CharGaugeProps {
  count: number;
  max: number;
  min: number;
}

const TICK_COUNT = 40;

function getColor(pct: number, minPct: number): string {
  if (pct > 1) return "#dc2626";
  if (pct === 1) return "#d97706";
  if (pct > 0.9) return "#d97706";
  if (pct >= minPct) return "#059669";
  return "#3b82f6";
}

function getStatus(pct: number, minPct: number, atLimit: boolean): { label: string; color: string } {
  if (pct > 1) return { label: "Over limit", color: "#dc2626" };
  if (atLimit) return { label: "At capacity", color: "#d97706" };
  if (pct > 0.9) return { label: "Almost there", color: "#d97706" };
  if (pct >= minPct) return { label: "Looking good", color: "#059669" };
  return { label: "Keep going", color: "#3b82f6" };
}

export default function CharGauge({ count, max, min }: CharGaugeProps) {
  const pct = Math.min(count / max, 1.2);
  const clampedPct = Math.min(pct, 1);
  const minPct = min / max;
  const atLimit = count === max;
  const color = getColor(pct, minPct);
  const status = getStatus(pct, minPct, atLimit);

  const cx = 120;
  const cy = 90;
  const rInner = 68;
  const rOuterMinor = 78;
  const rOuterMajor = 82;
  const startAngle = 180;
  const endAngle = 0;

  const angleFor = (p: number) => startAngle - p * (startAngle - endAngle);

  const polar = (angleDeg: number, radius: number) => {
    const rad = (angleDeg * Math.PI) / 180;
    return { x: cx + radius * Math.cos(rad), y: cy - radius * Math.sin(rad) };
  };

  const liveAngle = angleFor(clampedPct);

  const ticks = Array.from({ length: TICK_COUNT + 1 }, (_, i) => {
    const t = i / TICK_COUNT;
    const angle = startAngle - t * (startAngle - endAngle);
    const isMajor = i % 10 === 0;
    const lit = t <= clampedPct;
    const r1 = rInner;
    const r2 = isMajor ? rOuterMajor : rOuterMinor;
    const p1 = polar(angle, r1);
    const p2 = polar(angle, r2);
    return { key: i, p1, p2, isMajor, lit, color: lit ? color : "#e2e8f0" };
  });

  const countStr = String(count).padStart(String(max).length, "0");

  return (
    <div className="mt-2">
      <svg
        viewBox="0 0 240 140"
        className="w-full max-w-[220px]"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label={`${count} of ${max} characters`}
      >
        {ticks.map((t) => (
          <line
            key={t.key}
            x1={t.p1.x} y1={t.p1.y}
            x2={t.p2.x} y2={t.p2.y}
            stroke={t.color}
            strokeWidth={t.isMajor ? 2 : 1.2}
            strokeLinecap="round"
            opacity={t.lit ? 1 : 0.4}
          />
        ))}

        {/* Min marker */}
        {(() => {
          const minPct = min / max;
          const a = angleFor(minPct);
          const p = polar(a, rOuterMajor + 10);
          return (
            <text x={p.x} y={p.y} textAnchor="middle" dominantBaseline="central" fontSize="9" fontWeight="600" fill="#94a3b8" className="font-body">
              {min}
            </text>
          );
        })()}

        {/* Max marker */}
        {(() => {
          const a = angleFor(1);
          const p = polar(a, rOuterMajor + 10);
          return (
            <text x={p.x} y={p.y} textAnchor="middle" dominantBaseline="central" fontSize="9" fontWeight="600" fill="#94a3b8" className="font-body">
              {max}
            </text>
          );
        })()}

        {/* Needle */}
        <line
          x1={cx} y1={cy}
          x2={polar(liveAngle, rInner - 8).x}
          y2={polar(liveAngle, rInner - 8).y}
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx={cx} cy={cy} r="5" fill="white" stroke={color} strokeWidth="2" />
        <circle
          cx={polar(liveAngle, rInner - 8).x}
          cy={polar(liveAngle, rInner - 8).y}
          r="2.5" fill={color}
        />

        {/* Count inside arc */}
        <text
          x={cx} y={cy + 18}
          textAnchor="middle"
          dominantBaseline="central"
          className="font-display tabular-nums"
          fill={color}
          fontSize="22"
          fontWeight="700"
        >
          {countStr}
        </text>
        {/* Status label below count */}
        <text
          x={cx} y={cy + 36}
          textAnchor="middle"
          dominantBaseline="central"
          className="font-body"
          fill={status.color}
          fontSize="8"
          fontWeight="600"
          letterSpacing="0.1em"
        >
          {status.label.toUpperCase()}
        </text>
      </svg>
    </div>
  );
}
