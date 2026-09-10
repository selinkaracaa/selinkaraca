import { useState } from "react";

/**
 * Mean similarity between consecutive chunks, Pythia family.
 * Source: out/consistency_within_book/<model>/summary.json in
 * github.com/selinkaracaa/Book_Database_Analysis
 *
 * High values mean the embedding space is collapsed — everything looks like
 * everything else, so "similar" carries almost no information.
 */
const DATA = [
  { size: "70M", params: 7.0e7, sim: 0.9906 },
  { size: "160M", params: 1.6e8, sim: 0.9776 },
  { size: "410M", params: 4.1e8, sim: 0.6185 },
  { size: "1B", params: 1.0e9, sim: 0.5928 },
  { size: "1.4B", params: 1.4e9, sim: 0.5714 },
  { size: "2.8B", params: 2.8e9, sim: 0.4764 },
  { size: "6.9B", params: 6.9e9, sim: 0.4232 },
  { size: "12B", params: 1.2e10, sim: 0.4436 },
];

const W = 880, H = 360;
const M = { top: 26, right: 30, bottom: 50, left: 56 };
const PW = W - M.left - M.right;
const PH = H - M.top - M.bottom;

const lx = (v: number) => Math.log10(v);
const X0 = lx(6e7), X1 = lx(1.7e10);
const x = (p: number) => M.left + ((lx(p) - X0) / (X1 - X0)) * PW;
const y = (v: number) => M.top + PH - v * PH;

const AnisotropyChart = () => {
  const [hi, setHi] = useState<number | null>(null);

  const d = DATA.map((p, i) => `${i ? "L" : "M"}${x(p.params).toFixed(1)},${y(p.sim).toFixed(1)}`).join(" ");
  const area = `${d} L${x(DATA[DATA.length - 1].params).toFixed(1)},${M.top + PH} L${x(DATA[0].params).toFixed(1)},${M.top + PH} Z`;

  return (
    <div className="min-w-[600px]">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img"
        aria-label="Mean similarity between consecutive text chunks for Pythia models, falling from 0.99 at 70M parameters to 0.42 at 6.9B.">
        {[0, 0.25, 0.5, 0.75, 1].map((t) => (
          <g key={t}>
            <line x1={M.left} x2={M.left + PW} y1={y(t)} y2={y(t)} stroke="hsl(0 0% 88%)" strokeWidth="1" />
            <text x={M.left - 12} y={y(t) + 4} textAnchor="end" className="chart-tick">{t.toFixed(2)}</text>
          </g>
        ))}

        <path d={area} fill="hsl(14 74% 46% / 0.07)" />
        <path d={d} fill="none" stroke="hsl(14 74% 46%)" strokeWidth="2" strokeLinejoin="round" />

        {DATA.map((p, i) => (
          <g key={p.size}>
            <circle cx={x(p.params)} cy={y(p.sim)} r={hi === i ? 6.5 : 4.5}
              fill="hsl(14 74% 46%)" stroke="#fff" strokeWidth="2" />
            <circle cx={x(p.params)} cy={y(p.sim)} r={18} fill="transparent"
              onMouseEnter={() => setHi(i)} onMouseLeave={() => setHi(null)} />
            <text x={x(p.params)} y={M.top + PH + 22} textAnchor="middle" className="chart-tick">
              {p.size}
            </text>
          </g>
        ))}

        <text x={M.left + PW / 2} y={H - 8} textAnchor="middle" className="chart-axis">
          Pythia parameters (log scale)
        </text>
        <text transform={`rotate(-90) translate(${-(M.top + PH / 2)} 16)`} textAnchor="middle" className="chart-axis">
          mean consecutive similarity
        </text>
      </svg>

      <p className="mt-3 border-t border-border pt-3 font-mono-label">
        {hi !== null
          ? `Pythia ${DATA[hi].size} — consecutive chunks average ${DATA[hi].sim.toFixed(4)} similarity`
          : "hover a point"}
      </p>
    </div>
  );
};

export default AnisotropyChart;
