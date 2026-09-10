import { useMemo, useState } from "react";
import { FAMILIES, REFERENCE, sep, type Point } from "@/data/scale";

/* geometry */
const W = 920;
const H = 460;
const M = { top: 26, right: 104, bottom: 52, left: 60 };
const PW = W - M.left - M.right;
const PH = H - M.top - M.bottom;

const X_MIN = 6e7;
const X_MAX = 1.7e10;
const Y_MAX = 0.145;

const lx = (v: number) => Math.log10(v);
const x = (params: number) =>
  M.left + ((lx(params) - lx(X_MIN)) / (lx(X_MAX) - lx(X_MIN))) * PW;
const y = (v: number) => M.top + PH - (v / Y_MAX) * PH;

const X_TICKS = [1e8, 1e9, 1e10];
const X_LABEL = (v: number) => (v >= 1e9 ? `${v / 1e9}B` : `${v / 1e6}M`);
const Y_TICKS = [0, 0.03, 0.06, 0.09, 0.12];

type Hover = { fam: string; color: string; p: Point } | null;

const ScaleChart = () => {
  const [hover, setHover] = useState<Hover>(null);

  const paths = useMemo(
    () =>
      FAMILIES.map((f) => ({
        ...f,
        d: f.points
          .map((p, i) => `${i === 0 ? "M" : "L"}${x(p.params).toFixed(1)},${y(sep(p)).toFixed(1)}`)
          .join(" "),
        last: f.points[f.points.length - 1],
      })),
    [],
  );

  return (
    <figure className="m-0">
      <div className="w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-auto w-full min-w-[640px]"
          role="img"
          aria-label="Within-book versus across-book embedding separation plotted against model parameter count, for Pythia, Cerebras-GPT and Qwen2.5, with OpenAI text-embedding-3 shown as a reference band."
        >
          {/* reference band — purpose-trained embedding models */}
          <rect
            x={M.left}
            y={y(REFERENCE.high)}
            width={PW}
            height={Math.max(2, y(REFERENCE.low) - y(REFERENCE.high))}
            fill="hsl(0 0% 10% / 0.05)"
          />
          <line
            x1={M.left}
            x2={M.left + PW}
            y1={y(REFERENCE.high)}
            y2={y(REFERENCE.high)}
            stroke="hsl(0 0% 10% / 0.35)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <text
            x={M.left + 10}
            y={y(REFERENCE.high) - 9}
            className="chart-note"
            fill="hsl(0 0% 32%)"
          >
            OpenAI text-embedding-3 — trained to do exactly this
          </text>

          {/* horizontal grid */}
          {Y_TICKS.map((t) => (
            <g key={t}>
              <line
                x1={M.left}
                x2={M.left + PW}
                y1={y(t)}
                y2={y(t)}
                stroke="hsl(0 0% 88%)"
                strokeWidth="1"
              />
              <text x={M.left - 12} y={y(t) + 4} textAnchor="end" className="chart-tick">
                {t.toFixed(2)}
              </text>
            </g>
          ))}

          {/* x axis */}
          <line
            x1={M.left}
            x2={M.left + PW}
            y1={M.top + PH}
            y2={M.top + PH}
            stroke="hsl(0 0% 78%)"
            strokeWidth="1"
          />
          {X_TICKS.map((t) => (
            <text key={t} x={x(t)} y={M.top + PH + 22} textAnchor="middle" className="chart-tick">
              {X_LABEL(t)}
            </text>
          ))}
          <text x={M.left + PW / 2} y={H - 8} textAnchor="middle" className="chart-axis">
            parameters (log scale)
          </text>
          <text
            transform={`rotate(-90) translate(${-(M.top + PH / 2)} 16)`}
            textAnchor="middle"
            className="chart-axis"
          >
            within − across similarity
          </text>

          {/* series */}
          {paths.map((f) => (
            <g key={f.name}>
              <path d={f.d} fill="none" stroke={f.color} strokeWidth="2" strokeLinejoin="round" />
              {f.points.map((p) => {
                const on = hover?.fam === f.name && hover.p.size === p.size;
                return (
                  <circle
                    key={p.size}
                    cx={x(p.params)}
                    cy={y(sep(p))}
                    r={on ? 6.5 : 4.5}
                    fill={f.color}
                    stroke="hsl(0 0% 100%)"
                    strokeWidth="2"
                  />
                );
              })}
              {/* direct label at the line end */}
              <text
                x={x(f.last.params) + 12}
                y={y(sep(f.last)) + 4}
                fill={f.color}
                className="chart-series-label"
              >
                {f.name}
              </text>
            </g>
          ))}

          {/* hit targets */}
          {FAMILIES.map((f) =>
            f.points.map((p) => (
              <circle
                key={f.name + p.size}
                cx={x(p.params)}
                cy={y(sep(p))}
                r={16}
                fill="transparent"
                onMouseEnter={() => setHover({ fam: f.name, color: f.color, p })}
                onMouseLeave={() => setHover(null)}
              />
            )),
          )}

          {/* crosshair */}
          {hover && (
            <line
              x1={x(hover.p.params)}
              x2={x(hover.p.params)}
              y1={M.top}
              y2={M.top + PH}
              stroke="hsl(0 0% 10% / 0.25)"
              strokeWidth="1"
            />
          )}
        </svg>
      </div>

      {/* tooltip / readout — kept out of the SVG so it can use real type */}
      <div className="mt-4 min-h-[62px] border-t border-border pt-4">
        {hover ? (
          <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1">
            <span className="flex items-center gap-2">
              <span
                aria-hidden
                className="inline-block h-[10px] w-[10px] rounded-full"
                style={{ background: hover.color }}
              />
              <span className="font-serif-italic text-[17px]">
                {hover.fam} {hover.p.size}
              </span>
            </span>
            <span className="font-mono-label">
              within {hover.p.within.toFixed(4)} · across {hover.p.across.toFixed(4)}
            </span>
            <span className="font-mono-label !text-[12px] text-ink">
              separation {sep(hover.p).toFixed(4)}
            </span>
          </div>
        ) : (
          <p className="font-mono-label">
            hover a point — 500 books, ~46,800 chunks, 19 base models
          </p>
        )}
      </div>

      {/* legend */}
      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
        {FAMILIES.map((f) => (
          <span key={f.name} className="flex items-center gap-2 font-mono-label">
            <span
              aria-hidden
              className="inline-block h-[3px] w-[16px]"
              style={{ background: f.color }}
            />
            {f.name}
          </span>
        ))}
        <span className="flex items-center gap-2 font-mono-label">
          <span aria-hidden className="inline-block h-[3px] w-[16px] bg-foreground/25" />
          OpenAI embeddings (reference)
        </span>
      </div>
    </figure>
  );
};

export default ScaleChart;
