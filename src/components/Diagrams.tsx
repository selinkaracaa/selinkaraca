/**
 * Small typographic diagrams. Thin strokes, mono labels, one ink accent —
 * drawn to match the page rather than to look like a slide.
 */

const INK = "hsl(14 74% 46%)";
const RULE = "hsl(0 0% 78%)";
const FILL = "hsl(0 0% 98%)";

const Box = ({
  x, y, w, h, label, sub, accent = false,
}: {
  x: number; y: number; w: number; h: number;
  label: string; sub?: string; accent?: boolean;
}) => (
  <g>
    <rect x={x} y={y} width={w} height={h} fill={accent ? "hsl(14 74% 46% / 0.07)" : FILL}
      stroke={accent ? INK : RULE} strokeWidth="1" />
    <text x={x + w / 2} y={y + (sub ? h / 2 - 4 : h / 2 + 4)} textAnchor="middle"
      className="diagram-label" fill={accent ? INK : "hsl(0 0% 15%)"}>
      {label}
    </text>
    {sub && (
      <text x={x + w / 2} y={y + h / 2 + 14} textAnchor="middle" className="chart-tick">
        {sub}
      </text>
    )}
  </g>
);

const Arrow = ({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) => (
  <g stroke={RULE} strokeWidth="1" fill="none">
    <line x1={x1} y1={y1} x2={x2} y2={y2} />
    <path d={`M${x2 - 6},${y2 - 4} L${x2},${y2} L${x2 - 6},${y2 + 4}`} />
  </g>
);

/* ---------------------------------------------- Agent Olympiad: the pipeline */
export const OlympiadPipeline = () => (
  <svg viewBox="0 0 880 300" className="h-auto w-full min-w-[620px]" role="img"
    aria-label="Pipeline turning contest problems, official solutions and grading rubrics into structured machine-gradable records, which an LLM judge then scores against decomposed rubric criteria.">
    <text x="0" y="16" className="chart-axis">raw contest materials</text>
    <Box x={0} y={34} w={170} h={46} label="problem statements" sub="pdf, html, latex" />
    <Box x={0} y={94} w={170} h={46} label="official solutions" sub="prose proofs" />
    <Box x={0} y={154} w={170} h={46} label="grading rubrics" sub="human partial credit" />

    <Arrow x1={176} y1={57} x2={244} y2={110} />
    <Arrow x1={176} y1={117} x2={244} y2={117} />
    <Arrow x1={176} y1={177} x2={244} y2={124} />

    <Box x={250} y={94} w={180} h={46} label="my pipeline" sub="parse · align · normalise" accent />

    <Arrow x1={436} y1={117} x2={500} y2={117} />

    <rect x={506} y={70} width={180} height={94} fill={FILL} stroke={RULE} strokeWidth="1" />
    <text x={596} y={100} textAnchor="middle" className="diagram-label" fill="hsl(0 0% 15%)">
      structured records
    </text>
    <text x={596} y={126} textAnchor="middle" className="chart-tick">statement + solution</text>
    <text x={596} y={144} textAnchor="middle" className="chart-tick">+ scorable criteria</text>

    <Arrow x1={692} y1={117} x2={752} y2={117} />
    <Box x={758} y={94} w={122} h={46} label="LLM judge" sub="rubric-calibrated" />

    <text x="0" y="246" className="chart-axis">the point</text>
    <text x="0" y="272" className="diagram-note" fill="hsl(0 0% 30%)">
      partial credit assigned the way a human grader would — not by string match on a final answer
    </text>
  </svg>
);

/* ------------------------------------------- PRAISE: discovery as a picture */
export const PraiseApproach = () => (
  <svg viewBox="0 0 880 300" className="h-auto w-full min-w-[620px]" role="img"
    aria-label="Experimental data encoded as an image, refined with super-resolution, passed through a deep network, which predicts the importance of each mathematical operator.">
    <text x="0" y="16" className="chart-axis">the usual route</text>
    <Box x={0} y={32} w={210} h={44} label="search expression space" sub="grammar of operators" />
    <text x={226} y={60} className="diagram-note" fill="hsl(0 0% 45%)">
      combinatorial — grows faster than any search covers
    </text>

    <text x="0" y="124" className="chart-axis">this approach</text>
    <Box x={0} y={140} w={150} h={52} label="measurements" sub="x, y pairs" />
    <Arrow x1={156} y1={166} x2={212} y2={166} />
    <Box x={218} y={140} w={150} h={52} label="encode as image" sub="+ super-resolution" accent />
    <Arrow x1={374} y1={166} x2={430} y2={166} />
    <Box x={436} y={140} w={150} h={52} label="deep network" sub="vision model" />
    <Arrow x1={592} y1={166} x2={648} y2={166} />
    <Box x={654} y={140} w={200} h={52} label="operator importance" sub="which terms matter" accent />

    <text x="0" y="240" className="chart-axis">why it helps</text>
    <text x="0" y="266" className="diagram-note" fill="hsl(0 0% 30%)">
      a logarithm has a silhouette; so does a product of powers. recognise the shape first, and the
      symbolic search starts far smaller.
    </text>
  </svg>
);

/* ------------------------------------------------ Todi: the adaptive loop */
export const TodiLoop = () => {
  const cx = 250, cy = 132, r = 92;
  const nodes = [
    { a: -90, label: "assess", sub: "8 modules" },
    { a: -18, label: "profile", sub: "per-child" },
    { a: 54, label: "program", sub: "assembled" },
    { a: 126, label: "practice", sub: "10,000+ exercises" },
    { a: 198, label: "re-assess", sub: "continuous" },
  ];
  const pt = (a: number, rad = r) => [
    cx + rad * Math.cos((a * Math.PI) / 180),
    cy + rad * Math.sin((a * Math.PI) / 180),
  ];

  return (
    <svg viewBox="0 0 880 290" className="h-auto w-full min-w-[620px]" role="img"
      aria-label="A loop: assess, build a per-child profile, assemble a program, practise, re-assess.">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={RULE} strokeWidth="1" strokeDasharray="3 5" />
      {nodes.map((n) => {
        const [px, py] = pt(n.a);
        return (
          <g key={n.label}>
            <circle cx={px} cy={py} r="6" fill={INK} stroke="#fff" strokeWidth="2" />
            <text x={px} y={py - 14} textAnchor="middle" className="diagram-label" fill="hsl(0 0% 15%)">
              {n.label}
            </text>
            <text x={px} y={py + 22} textAnchor="middle" className="chart-tick">{n.sub}</text>
          </g>
        );
      })}

      <text x="470" y="60" className="chart-axis">what most software does instead</text>
      <text x="470" y="90" className="diagram-note" fill="hsl(0 0% 30%)">one sequence, one pace,</text>
      <text x="470" y="110" className="diagram-note" fill="hsl(0 0% 30%)">calibrated to a median child</text>
      <text x="470" y="152" className="chart-axis">why that fails here</text>
      <text x="470" y="182" className="diagram-note" fill="hsl(0 0% 30%)">a reading exercise can be too hard</text>
      <text x="470" y="202" className="diagram-note" fill="hsl(0 0% 30%)">in decoding and too easy in</text>
      <text x="470" y="222" className="diagram-note" fill="hsl(0 0% 30%)">comprehension at the same time</text>
    </svg>
  );
};
