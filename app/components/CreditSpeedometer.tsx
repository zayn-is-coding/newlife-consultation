"use client";

import { useState, useEffect, useRef } from "react";

const ZONES = [
  { label: "Poor", start: 300, end: 579, color: "#dc2626" },
  { label: "Fair", start: 580, end: 669, color: "#d97706" },
  { label: "Good", start: 670, end: 739, color: "#0d9488" },
  { label: "Very good", start: 740, end: 799, color: "#059669" },
  { label: "Excellent", start: 800, end: 850, color: "#1e40af" },
];

const MIN = 300;
const MAX = 850;
const TICK_COUNT = 56;
const LABEL_STEPS = [300, 450, 580, 700, 850];

function getZone(s: number) {
  return ZONES.find((z) => s >= z.start && s <= z.end) ?? ZONES[0];
}

function tierColor(s: number) {
  return getZone(s).color;
}

function DigitReel({ digit, height = 72 }: { digit: number; height?: number }) {
  return (
    <div
      className="relative overflow-hidden font-display tabular-nums"
      style={{ height, width: height * 0.62 }}
    >
      <div
        className="absolute left-0 top-0 transition-transform duration-300 ease-out"
        style={{ transform: `translateY(-${digit * height}px)` }}
      >
        {Array.from({ length: 10 }).map((_, n) => (
          <div
            key={n}
            className="flex items-center justify-center text-foreground"
            style={{ height, fontSize: height * 0.78, lineHeight: 1 }}
          >
            {n}
          </div>
        ))}
      </div>
    </div>
  );
}

interface GaugeProps {
  score: number;
  previousScore: number;
}

function ScoreGauge({ score, previousScore, size = "lg" }: GaugeProps & { size?: "sm" | "lg" }) {
  const [anim, setAnim] = useState(MIN);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (reducedMotion.current) { setAnim(score); return; }
    setAnim(MIN);
    const dur = 1100;
    const steps = 50;
    const delta = score - MIN;
    let frame = 0;
    const t = setInterval(() => {
      frame += 1;
      if (frame >= steps) { setAnim(score); clearInterval(t); }
      else {
        const p = frame / steps;
        setAnim(Math.round(MIN + delta * (1 - Math.pow(1 - p, 3))));
      }
    }, dur / steps);
    return () => clearInterval(t);
  }, [score]);

  const cx = 150;
  const cy = 142;
  const rInner = 92;
  const rOuterMinor = 104;
  const rOuterMajor = 110;
  const startAngle = 200;
  const endAngle = -20;

  const clamp = (s: number) => Math.min(MAX, Math.max(MIN, s));
  const pct = (s: number) => (clamp(s) - MIN) / (MAX - MIN);
  const angleFor = (s: number) => startAngle - pct(s) * (startAngle - endAngle);

  const polar = (angleDeg: number, radius: number) => {
    const rad = (angleDeg * Math.PI) / 180;
    return { x: cx + radius * Math.cos(rad), y: cy - radius * Math.sin(rad) };
  };

  const liveAngle = angleFor(anim);
  const zone = getZone(score);
  const improvement = score - previousScore;
  const isUp = improvement > 0;
  const trendColor = improvement === 0 ? "text-gray-400" : isUp ? "text-success" : "text-danger";
  const trendArrow = improvement === 0 ? "→" : isUp ? "↑" : "↓";

  const ticks = Array.from({ length: TICK_COUNT + 1 }, (_, i) => {
    const t = i / TICK_COUNT;
    const tickScore = MIN + t * (MAX - MIN);
    const angle = startAngle - t * (startAngle - endAngle);
    const isMajor = i % 7 === 0;
    const lit = tickScore <= anim;
    const r1 = rInner;
    const r2 = isMajor ? rOuterMajor : rOuterMinor;
    const p1 = polar(angle, r1);
    const p2 = polar(angle, r2);
    return { key: i, p1, p2, isMajor, lit, color: lit ? tierColor(tickScore) : "#e2e8f0" };
  });

  const isSm = size === "sm";
  const digitHeight = isSm ? 48 : 72;

  return (
    <div className="flex flex-col items-center w-full">
      <svg
        viewBox="0 0 300 230"
        className={`w-full ${isSm ? "max-w-[300px]" : "max-w-[460px]"}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label={`Credit score ${score}, rated ${zone.label}`}
      >
        {ticks.map((t) => (
          <line
            key={t.key}
            x1={t.p1.x} y1={t.p1.y}
            x2={t.p2.x} y2={t.p2.y}
            stroke={t.color}
            strokeWidth={t.isMajor ? 2.5 : 1.5}
            strokeLinecap="round"
            opacity={t.lit ? 1 : 0.5}
          />
        ))}

        {LABEL_STEPS.map((s) => {
          const a = angleFor(s);
          const p = polar(a, rOuterMajor + 16);
          const lit = s <= anim;
          return (
            <text
              key={s}
              x={p.x} y={p.y}
              textAnchor="middle" dominantBaseline="central"
              className="font-body"
              fill={lit ? tierColor(s === MIN ? s : s - 1) : "#94a3b8"}
              fontSize="11"
              fontWeight={lit ? 700 : 500}
            >
              {s}
            </text>
          );
        })}

        {/* Needle */}
        <line
          x1={cx} y1={cy}
          x2={polar(liveAngle, rInner - 14).x}
          y2={polar(liveAngle, rInner - 14).y}
          stroke={zone.color}
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <line
          x1={cx} y1={cy}
          x2={polar(liveAngle + 180, 12).x}
          y2={polar(liveAngle + 180, 12).y}
          stroke={zone.color}
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <circle cx={cx} cy={cy} r="8" fill="white" stroke={zone.color} strokeWidth="2.5" />
        <circle
          cx={polar(liveAngle, rInner - 14).x}
          cy={polar(liveAngle, rInner - 14).y}
          r="3.5" fill={zone.color}
        />
      </svg>

      {/* Odometer score */}
      <div className={`flex items-end ${isSm ? "-mt-10 mb-0" : "-mt-16 mb-1"}`}>
        {String(Math.round(anim)).padStart(3, "0").split("").map((d, i) => (
          <DigitReel key={i} digit={Number(d)} height={digitHeight} />
        ))}
      </div>

      <p
        className={`font-body font-semibold tracking-[0.18em] uppercase ${isSm ? "text-[9px] mb-1" : "text-[11px] mb-3"}`}
        style={{ color: zone.color }}
      >
        {zone.label}
      </p>

      <p className={`font-body font-medium ${isSm ? "text-xs" : "text-sm"} ${trendColor}`}>
        {improvement === 0 ? "No change since last check" : `${trendArrow} ${Math.abs(improvement)} pts since last check`}
      </p>
    </div>
  );
}

export default function CreditSpeedometer({ size = "lg" }: { size?: "sm" | "lg" }) {
  const [activeBureau, setActiveBureau] = useState(0);

  const bureaus = [
    { name: "Equifax", score: 698, previous: 570 },
    { name: "Experian", score: 684, previous: 584 },
    { name: "TransUnion", score: 697, previous: 570 },
  ];

  return (
    <div className="flex flex-col items-center w-full rounded-[28px] px-6 py-8 sm:px-10 sm:py-10">
      {/* Bureau tabs */}
      {size !== "sm" && (
        <div role="tablist" aria-label="Credit bureau" className="flex gap-1.5 mb-6 p-1 rounded-full bg-gray-100">
          {bureaus.map((bureau, i) => (
            <button
              key={bureau.name}
              role="tab"
              aria-selected={activeBureau === i}
              tabIndex={activeBureau === i ? 0 : -1}
              onClick={() => setActiveBureau(i)}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") setActiveBureau((p) => (p + 1) % bureaus.length);
                if (e.key === "ArrowLeft") setActiveBureau((p) => (p - 1 + bureaus.length) % bureaus.length);
              }}
              className="px-4 py-2 rounded-full font-body text-xs font-semibold tracking-wide uppercase transition-all duration-200 cursor-pointer focus-visible:outline focus-visible:outline-offset-2"
              style={{
                backgroundColor: activeBureau === i ? "#1e40af" : "transparent",
                color: activeBureau === i ? "white" : "#64748b",
                outlineColor: "#1e40af",
              }}
            >
              {bureau.name}
            </button>
          ))}
        </div>
      )}

      <div className="relative w-full flex justify-center" aria-live="polite">
        <ScoreGauge key={activeBureau} score={bureaus[activeBureau].score} previousScore={bureaus[activeBureau].previous} size={size} />
      </div>

    </div>
  );
}