/**
 * Everything the homepage indexes, in one place.
 *
 * Two different shapes, because they answer two different questions:
 *
 *   PROJECTS   — things that exist and can be opened. Carded, with an artifact
 *                link (a live site, a repo) and a page of their own.
 *   EXPERIENCE — roles and programmes. A compact timeline row each; some link
 *                to a fuller page, some are just a line.
 */

export type Group = "work" | "experience";
export type Kind = "product" | "research";

export type Project = {
  slug: string;
  /** the thing itself — this is the <h1> */
  name: string;
  /** plain description, no rhetorical question */
  descriptor: string;
  group: Group;
  /** what sort of thing it is — shown as a tag on the card */
  kind?: Kind;
  org: string;
  role: string;
  period: string;
  /** the number or state worth leading with, if there is one */
  headline?: string;
  status?: string;
  stack: string[];
  /** the artifact — shown on the card so people can go straight to it */
  artifact?: { label: string; href: string };
  /** the lab or group this belongs to */
  lab?: { label: string; href: string };
};

export const PROJECTS: Project[] = [
  {
    slug: "/work/todi",
    name: "Todi",
    descriptor: "AI learning platform for children with dyslexia and attention differences",
    group: "work",
    kind: "product",
    org: "education technology company",
    role: "developer",
    period: "2023 —",
    headline: "2,000+ students",
    status: "live",
    stack: ["react", "node", "express", "rest api", "accessibility"],
    artifact: { label: "todi.com.tr", href: "https://todi.com.tr/" },
  },
  {
    slug: "/projects/pattern-realism",
    name: "Pattern realism",
    descriptor:
      "A rubric and benchmark for why AI-generated garment images look wrong — and what to build instead",
    group: "work",
    kind: "product",
    org: "savanah.ai",
    role: "study author",
    period: "2026",
    headline: "7 tools · 12 outputs",
    stack: ["python", "diffusion", "controlnet", "rubric design"],
    artifact: {
      label: "github",
      href: "https://github.com/selinkaracaa/pattern-benchmarking",
    },
  },
  {
    slug: "/research/cris-lab",
    name: "CRIS Lab",
    descriptor:
      "Locating the scale at which a language model's embeddings start encoding document identity",
    group: "work",
    kind: "research",
    org: "Complex Resilient Intelligent Systems Lab, Columbia",
    role: "researcher",
    period: "jan 2026 —",
    headline: "28× in one scale step",
    status: "manuscript in preparation",
    stack: ["pytorch", "bertopic", "embeddings", "hdbscan", "gpu cluster"],
    artifact: {
      label: "github",
      href: "https://github.com/selinkaracaa/Book_Database_Analysis",
    },
    lab: { label: "CRIS Lab", href: "https://cris.cheme.columbia.edu/" },
  },
  {
    slug: "/research/agent-olympiad",
    name: "Agent Olympiad",
    descriptor: "A rubric-calibrated benchmark for whether multi-agent systems actually reason",
    group: "work",
    kind: "research",
    org: "Data Analytics and Processing Lab, Columbia",
    role: "researcher",
    period: "jun 2026 —",
    status: "working toward ICLR",
    stack: ["python", "llm eval", "benchmarks", "rubrics", "data pipelines"],
    artifact: { label: "github", href: "https://github.com/selinkaracaa/agent-olympiad" },
    lab: { label: "DAPLab", href: "https://daplab.cs.columbia.edu/" },
  },
  {
    slug: "/research/praise-lab",
    name: "PRAISE Lab",
    descriptor: "Symbolic regression reframed as a vision problem — recognising an equation's shape",
    group: "work",
    kind: "research",
    org: "Practice and Research in AI for Science and Education, Columbia",
    role: "researcher",
    period: "may 2026 —",
    stack: ["pytorch", "computer vision", "super-resolution", "symbolic regression"],
    artifact: {
      label: "project page",
      href: "https://www.cs.columbia.edu/~ansaf/praise/project-law.html",
    },
  },
];

/* ------------------------------------------------------------- experience */

export type Experience = {
  /** empty string renders no date — for things without a meaningful year */
  period: string;
  org: string;
  role: string;
  /** one line — this is a timeline, not a page */
  note: string;
  /** where a fuller writeup exists */
  slug?: string;
  href?: string;
};

/**
 * Reverse-chronological. To add a programme or fellowship (startup school and
 * so on) just add a row — `slug` and `href` are both optional, so an entry with
 * no page of its own is a perfectly valid line.
 */
export const EXPERIENCE: Experience[] = [
  {
    period: "jun 2026 —",
    org: "Savanah.ai",
    role: "AI Product Intern",
    note: "Pattern-realism benchmarking, and the company's first personalization framework.",
    slug: "/work/savanah",
    href: "https://savanah.ai/",
  },
  {
    period: "2026",
    org: "Y Combinator",
    role: "Startup School",
    note: "",
  },
  {
    period: "2026 —",
    org: "Columbia Engineering",
    role: "Teaching Assistant",
    note: "Fundamentals of Computer Systems and Discrete Mathematics — 300+ students a term.",
  },
  {
    period: "2026",
    org: "CAIAC",
    role: "Technical AI Safety Fellow",
    note: "Columbia AI Alignment Club's technical fellowship.",
  },
  {
    period: "2025",
    org: "Citadel Securities",
    role: "Ignite Women's Trading Program",
    note: "A week of live trading simulations, each decision pulled apart afterwards with quant traders.",
  },
  {
    period: "2025",
    org: "Cool Digital",
    role: "Software & Product Management Intern",
    note: "Consent-banner interfaces in JavaScript, Vue and React, shipped to live client sites.",
    href: "https://efilli.com/",
  },
  {
    period: "",
    org: "Microsoft",
    role: "Girls in AI Program",
    note: "Sustainability solutions built on Azure image recognition.",
  },
];

/**
 * The role pages. These aren't cards on the homepage — the timeline above links
 * to them — but they use the same page template, so they carry the same facts.
 */
export const ROLE_PAGES: Project[] = [
  {
    slug: "/work/savanah",
    name: "Savanah.ai",
    descriptor: "AI product work at an early-stage commerce company",
    group: "experience",
    org: "savanah.ai",
    role: "AI Product Intern",
    period: "jun 2026 —",
    stack: ["python", "diffusion", "controlnet", "umap", "hdbscan", "a/b testing"],
  },
];

/* ------------------------------------------------------------- selectors */

const ALL = [...PROJECTS, ...ROLE_PAGES];

export const byGroup = (g: Group) => PROJECTS.filter((p) => p.group === g);

export const bySlug = (slug: string) => ALL.find((p) => p.slug === slug);

/** ordering for prev/next, including the experience pages */
const NAV_ORDER = [
  "/work/todi",
  "/projects/pattern-realism",
  "/research/cris-lab",
  "/research/agent-olympiad",
  "/research/praise-lab",
  "/work/savanah",
];

export const NAV_TITLES: Record<string, string> = {
  "/work/todi": "Todi",
  "/projects/pattern-realism": "Pattern realism",
  "/research/cris-lab": "CRIS Lab",
  "/research/agent-olympiad": "Agent Olympiad",
  "/research/praise-lab": "PRAISE Lab",
  "/work/savanah": "Savanah.ai",
};

export const neighbours = (slug: string) => {
  const i = NAV_ORDER.indexOf(slug);
  if (i === -1) return { prev: undefined, next: undefined };
  const at = (n: number) => {
    const s = NAV_ORDER[(n + NAV_ORDER.length) % NAV_ORDER.length];
    return { slug: s, name: NAV_TITLES[s] };
  };
  return { prev: at(i - 1), next: at(i + 1) };
};

/** Student communities i help run. */
export const COMMUNITIES: { name: string; role: string; href?: string }[] = [
  { name: "ADI", role: "community pillar" },
  { name: "Women in Computer Science", role: "event coordinator, podcast team" },
  { name: "Girls Who Code", role: "engagement committee" },
  { name: "Columbia Turkish Students Association", role: "vice president of policy" },
  {
    name: "Turkish Students Association Global",
    role: "head of corporate relations",
    href: "https://tsaglobal.org/",
  },
];

/** Things outside the labs. Stated plainly — no adjectives, no pitch. */
export const DANCE: { name: string; role: string; href?: string }[] = [
  {
    name: "Columbia Orchesis",
    role: "Columbia's largest performance club",
    href: "https://www.youtube.com/watch?v=ZvNva2_8x-I",
  },
  {
    name: "Latin & ballroom",
    role: "Turkish national athlete",
    href: "https://www.youtube.com/@selinkaracaaa",
  },
];

export const PODCASTS: { name: string; role: string; href?: string }[] = [
  {
    name: "Reign of Chains",
    role: "on women in tech",
    href: "https://open.spotify.com/show/0Z2mQG5grq8SU8f4G2u8fe?si=d43780fcdb734602",
  },
  {
    name: "the WiCS Network",
    role: "on women in tech",
    href: "https://open.spotify.com/show/5tZbbhiqsr3acOScglDnfq?si=bc1ec5ecf8764d02",
  },
];
