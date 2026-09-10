import { useState } from "react";

/**
 * Pattern-realism scores, 1–5 per criterion, from the Savanah benchmarking study.
 * Source: github.com/selinkaracaa/pattern-benchmarking (summary table).
 */
const CRITERIA = [
  "fold interruption",
  "scale",
  "garment preservation",
  "shading",
  "artifacts",
] as const;

type Row = { n: number; tool: string; mode: string; scores: number[] };

const ROWS: Row[] = [
  { n: 1, tool: "Savanah pattern tool", mode: "flat-lay", scores: [1, 4, 5, 3, 5] },
  { n: 2, tool: "Savanah pattern tool", mode: "flat-lay · medium prompt", scores: [1, 4, 5, 3, 5] },
  { n: 3, tool: "Savanah pattern tool", mode: "flat-lay · long prompt", scores: [1, 4, 5, 3, 5] },
  { n: 4, tool: "Savanah main gen", mode: "flat-lay", scores: [1, 1, 5, 2, 3] },
  { n: 5, tool: "Gemini", mode: "flat-lay", scores: [2, 3, 2, 4, 2] },
  { n: 6, tool: "Gemini", mode: "flat-lay", scores: [4, 4, 1, 5, 3] },
  { n: 7, tool: "Gemini", mode: "flat-lay", scores: [2, 3, 4, 4, 4] },
  { n: 8, tool: "FashionDiffusion", mode: "model photo", scores: [1, 2, 5, 3, 4] },
  { n: 9, tool: "OOTDiffusion", mode: "model photo", scores: [1, 1, 1, 3, 2] },
  { n: 10, tool: "Style3D.ai", mode: "flat-lay", scores: [1, 1, 5, 3, 4] },
  { n: 11, tool: "Yeri.ai ControlNet", mode: "flat-lay", scores: [1, 1, 4, 3, 4] },
  { n: 12, tool: "Yeri.ai ControlNet", mode: "Savanah as input", scores: [1, 4, 5, 3, 5] },
];

/* sequential ramp, one hue, light -> dark */
const RAMP = [
  "hsl(14 62% 95%)",
  "hsl(14 66% 86%)",
  "hsl(14 70% 74%)",
  "hsl(14 72% 59%)",
  "hsl(14 76% 43%)",
];
const ink = (s: number) => RAMP[s - 1];
const onDark = (s: number) => s >= 4;

const RubricHeatmap = () => {
  const [hover, setHover] = useState<{ row: Row; i: number } | null>(null);

  return (
    <div className="min-w-[620px]">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="w-[240px] pb-3 text-left align-bottom">
              <span className="font-mono-label">tool</span>
            </th>
            {CRITERIA.map((c) => (
              <th key={c} className="pb-3 pl-2 text-left align-bottom">
                <span className="font-mono-label block max-w-[86px] leading-[1.35]">{c}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((r) => (
            <tr key={r.n}>
              <td className="py-[3px] pr-3">
                <span className="font-serif-italic text-[15px] text-foreground">{r.tool}</span>{" "}
                <span className="font-mono-label">· {r.mode}</span>
              </td>
              {r.scores.map((s, i) => (
                <td key={i} className="py-[3px] pl-2">
                  <div
                    onMouseEnter={() => setHover({ row: r, i })}
                    onMouseLeave={() => setHover(null)}
                    className="flex h-8 w-full min-w-[64px] items-center justify-center transition-transform duration-200"
                    style={{
                      background: ink(s),
                      transform: hover?.row.n === r.n && hover.i === i ? "scale(1.06)" : "none",
                      outline: "2px solid hsl(0 0% 100%)",
                    }}
                  >
                    <span
                      className="font-mono-label !text-[12px]"
                      style={{ color: onDark(s) ? "hsl(0 0% 100%)" : "hsl(0 0% 22%)" }}
                    >
                      {s}
                    </span>
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border pt-4">
        <span className="flex items-center gap-2">
          <span className="font-mono-label">1 worst</span>
          {RAMP.map((c) => (
            <span key={c} aria-hidden className="inline-block h-3 w-6" style={{ background: c }} />
          ))}
          <span className="font-mono-label">5 best</span>
        </span>
        <span className="font-mono-label">
          {hover
            ? `#${hover.row.n} ${hover.row.tool} — ${CRITERIA[hover.i]}: ${hover.row.scores[hover.i]}/5`
            : "hover a cell"}
        </span>
      </div>
    </div>
  );
};

export default RubricHeatmap;
