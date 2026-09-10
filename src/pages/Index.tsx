import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, ArrowRight, Mail, Check, Copy } from "lucide-react";
import Photo from "@/components/Photo";
import {
  byGroup,
  COMMUNITIES,
  EXPERIENCE,
  DANCE,
  PODCASTS,
  type Project,
} from "@/data/projects";

/* ------------------------------------------------------------------ motion */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const Reveal = ({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) => (
  <motion.section
    id={id}
    variants={fadeUp}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: "-70px" }}
    className={className}
  >
    {children}
  </motion.section>
);

/* -------------------------------------------------------------- primitives */

const ExtLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer noopener"
    className="link-underline inline-flex items-baseline gap-0.5"
  >
    {children}
    <ArrowUpRight className="h-3 w-3 translate-y-[1px] opacity-60" aria-hidden />
  </a>
);

/** big centred heading in the brand colour — the spine of the page */
const Heading = ({ children, sub }: { children: string; sub?: string }) => (
  <div className="mb-10 text-center">
    <h2 className="font-serif-display text-[clamp(1.9rem,4.6vw,3.1rem)] leading-[1] tracking-[-0.03em] text-ink">
      {children}
    </h2>
    {sub && (
      <p className="mx-auto mt-4 max-w-[52ch] text-[16px] leading-[1.6] text-foreground/70">
        {sub}
      </p>
    )}
  </div>
);

const KindTag = ({ kind }: { kind?: string }) =>
  kind ? (
    <span
      className={`font-mono-label rounded-full border px-2 py-[2px] ${
        kind === "research" ? "border-ink/40 text-ink" : "border-border text-muted-foreground"
      }`}
    >
      {kind}
    </span>
  ) : null;

const Card = ({ p }: { p: Project }) => (
  <Link to={p.slug} className="surface surface-link group flex flex-col rounded-2xl p-6">
    <div className="flex items-start justify-between gap-3">
      <h3 className="font-ui text-[1.15rem] font-semibold leading-tight">{p.name}</h3>
      <KindTag kind={p.kind} />
    </div>
    <p className="mt-3 flex-1 text-[15px] leading-[1.55] text-foreground/75">{p.descriptor}</p>
    {p.headline && <p className="stat-num mt-6 text-[1.45rem]">{p.headline}</p>}
    <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
      <span className="font-mono-label">{p.period}</span>
      <ArrowRight
        className="h-4 w-4 shrink-0 -translate-x-1 text-ink opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
        aria-hidden
      />
    </div>
  </Link>
);

const EMAIL = "sk5103@columbia.edu";

/**
 * mailto: silently does nothing on machines with no mail client configured,
 * so the address is always visible and always copyable as well as linked.
 */
const EmailButton = ({ dark = false }: { dark?: boolean }) => {
  const [copied, setCopied] = useState(false);

  const copy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      const el = document.createElement("textarea");
      el.value = EMAIL;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      el.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <span className="inline-flex items-center gap-1.5">
      <a href={`mailto:${EMAIL}`} className={`pill ${dark ? "!bg-white !text-[hsl(var(--ink))]" : ""}`}>
        <Mail className="h-4 w-4" aria-hidden />
        {EMAIL}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "email address copied" : "copy email address"}
        className={`pill !px-3 ${dark ? "!bg-white/15 !text-white" : "pill-quiet"}`}
      >
        {copied ? <Check className="h-4 w-4" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
        <span className="sr-only sm:not-sr-only">{copied ? "copied" : "copy"}</span>
      </button>
    </span>
  );
};

const ListPanel = ({
  title,
  items,
}: {
  title: string;
  items: { name: string; role: string; href?: string }[];
}) => (
  <div className="surface rounded-2xl p-7">
    <p className="font-ui text-[1.05rem] font-semibold">{title}</p>
    <ul className="mt-4 divide-y divide-border">
      {items.map((i) => (
        <li key={i.name} className="py-3">
          <span className="block text-[15px]">
            {i.href ? <ExtLink href={i.href}>{i.name}</ExtLink> : i.name}
          </span>
          <span className="font-mono-label mt-1 block">{i.role}</span>
        </li>
      ))}
    </ul>
  </div>
);

/** the filmstrips — real photographs, rolling continuously */
type PhotoName = React.ComponentProps<typeof Photo>["name"];
type Frame = { name: PhotoName; alt: string; w: string };

const PhotoStrip = ({
  frames,
  reverse = false,
  eager = false,
  speed = "32s",
}: {
  frames: Frame[];
  reverse?: boolean;
  eager?: boolean;
  speed?: string;
}) => (
  <div className="marquee overflow-hidden">
    <div
      className={`marquee-track gap-3 sm:gap-4 ${reverse ? "reverse" : ""}`}
      style={{ animationDuration: speed }}
    >
      {[0, 1].map((copy) =>
        frames.map((f) => (
          <div key={`${copy}-${f.name}`} className={`${f.w} shrink-0 overflow-hidden rounded-2xl`}>
            <Photo
              name={f.name}
              alt={copy === 0 ? f.alt : ""}
              sizes="(max-width: 640px) 60vw, 420px"
              className="h-[300px] w-full object-cover sm:h-[380px]"
              priority={eager && copy === 0}
            />
          </div>
        )),
      )}
    </div>
  </div>
);

const STRIP: Frame[] = [
  { name: "mosaic-portrait", alt: "Selin Karaca", w: "w-[230px] sm:w-[270px]" },
  {
    name: "side-citadel",
    alt: "Citadel Securities Ignite Women's Trading Program",
    w: "w-[330px] sm:w-[420px]",
  },
  {
    name: "strip-ycombinator",
    alt: "Y Combinator Startup School 2026",
    w: "w-[330px] sm:w-[420px]",
  },
  { name: "mosaic-campus", alt: "Columbia at sunset", w: "w-[290px] sm:w-[370px]" },
  { name: "side-dance-solo", alt: "Dancing with Columbia Orchesis", w: "w-[210px] sm:w-[250px]" },
  { name: "strip-tsa", alt: "Turkish Student Association Global", w: "w-[330px] sm:w-[420px]" },
  { name: "mosaic-library", alt: "In the library", w: "w-[290px] sm:w-[370px]" },
];

/** the second strip — the making, the stage and the city */
const STRIP_TWO: Frame[] = [
  { name: "side-dance-group", alt: "Orchesis on stage", w: "w-[300px] sm:w-[380px]" },
  { name: "side-dance-white", alt: "Solo choreography", w: "w-[230px] sm:w-[270px]" },
  { name: "snap-dance", alt: "Performance night", w: "w-[330px] sm:w-[420px]" },
  { name: "snap-tree-lighting", alt: "Tree lighting in New York", w: "w-[300px] sm:w-[380px]" },
  { name: "side-met", alt: "At the Met", w: "w-[230px] sm:w-[270px]" },
  { name: "snap-sunset", alt: "New York at sunset", w: "w-[330px] sm:w-[420px]" },
  { name: "side-fountain", alt: "A fountain in the city", w: "w-[230px] sm:w-[270px]" },
];

/* ================================================================== page */

const Index = () => {
  const work = byGroup("work");
  const research = work.filter((p) => p.kind === "research");
  const products = work.filter((p) => p.kind === "product");

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* ============================================================ nav */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-6 px-6 py-4">
          <a href="#top" className="logotype text-[1.35rem]">
            Selin Karaca
          </a>
          <nav className="font-ui hidden gap-7 text-[14px] font-medium text-foreground/70 sm:flex">
            {["research", "building", "experience", "beyond"].map((l) => (
              <a key={l} href={`#${l}`} className="transition-colors hover:text-ink">
                {l}
              </a>
            ))}
          </nav>
          <a href="#contact" className="pill pill-quiet !px-4 !py-2 !text-[13px]">
            contact
          </a>
        </div>
      </header>

      {/* ========================================================== strip */}
      <section id="top" className="pb-4 pt-6">
        <PhotoStrip frames={STRIP} eager />
      </section>

      {/* ========================================================== intro */}
      <section className="mx-auto max-w-[1180px] px-6 pb-20 pt-14 text-center md:pb-28 md:pt-20">
        <h1 className="font-serif-display text-[clamp(2.4rem,6vw,4.2rem)] leading-[0.98] tracking-[-0.035em] text-ink">
          hi, i'm Selin!
        </h1>
        <p className="mx-auto mt-7 max-w-[62ch] text-[17.5px] leading-[1.62] text-foreground/85">
          I'm a computer science student at Columbia Engineering, minoring in applied math and in
          entrepreneurship &amp; innovation. I spend my time on machine-learning research, on
          software that real people use, and in rooms full of people making things. If you're
          building something, i'd love to hear about it.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <EmailButton />
          <a
            href="/selin-karaca-resume.pdf"
            target="_blank"
            rel="noreferrer noopener"
            className="pill pill-quiet"
          >
            resume
          </a>
          <a
            href="https://github.com/selinkaracaa"
            target="_blank"
            rel="noreferrer noopener"
            className="pill pill-quiet"
          >
            github
          </a>
          <a
            href="https://www.linkedin.com/in/selinkaraca/"
            target="_blank"
            rel="noreferrer noopener"
            className="pill pill-quiet"
          >
            linkedin
          </a>
        </div>
      </section>

      {/* ======================================================== research */}
      <Reveal id="research" className="mx-auto max-w-[1180px] px-6 pb-20 md:pb-28">
        <Heading sub="Three labs at Columbia, all circling the same question: what has a model's representation actually captured, and can we see it from the outside?">
          Research
        </Heading>
        <div className="grid gap-4 md:grid-cols-3">
          {research.map((p) => (
            <Card key={p.slug} p={p} />
          ))}
        </div>
      </Reveal>

      {/* ======================================================== building */}
      <Reveal id="building" className="mx-auto max-w-[1180px] px-6 pb-20 md:pb-28">
        <Heading sub="Software that shipped, and the studies that came out of building it.">
          Building
        </Heading>
        <div className="grid gap-4 md:grid-cols-2">
          {products.map((p) => (
            <Card key={p.slug} p={p} />
          ))}
        </div>
      </Reveal>

      {/* ====================================================== experience */}
      <Reveal id="experience" className="mx-auto max-w-[1180px] px-6 pb-20 md:pb-28">
        <Heading sub="Internships, fellowships, research assistantships and the programmes that pulled me sideways into something new.">
          Experience
        </Heading>

        <ul className="mx-auto max-w-[900px] overflow-hidden rounded-2xl border border-border bg-[hsl(var(--surface))]">
          {EXPERIENCE.map((e, i) => {
            const body = (
              <>
                <span className="font-mono-label shrink-0 md:w-[112px] md:pt-[5px]">
                  {e.period}
                </span>
                <span className="flex-1">
                  <span className="flex flex-wrap items-baseline gap-x-3">
                    <span className="font-ui text-[1.05rem] font-semibold">{e.org}</span>
                    <span className="font-ui text-[0.95rem] font-semibold text-ink">{e.role}</span>
                  </span>
                  <span className="mt-1.5 block max-w-[64ch] text-[14.5px] leading-[1.55] text-foreground/70">
                    {e.note}
                  </span>
                </span>
                {e.slug ? (
                  <ArrowRight
                    className="mt-1 hidden h-4 w-4 shrink-0 -translate-x-1 text-ink opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 md:block"
                    aria-hidden
                  />
                ) : e.href ? (
                  <ArrowUpRight
                    className="mt-1 hidden h-4 w-4 shrink-0 text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:block"
                    aria-hidden
                  />
                ) : null}
              </>
            );
            const row =
              "group flex flex-col gap-1.5 px-6 py-5 transition-colors duration-300 hover:bg-ink/[0.04] md:flex-row md:gap-6";
            return (
              <li key={e.org} className={i ? "border-t border-border" : ""}>
                {e.slug ? (
                  <Link to={e.slug} className={row}>
                    {body}
                  </Link>
                ) : e.href ? (
                  <a href={e.href} target="_blank" rel="noreferrer noopener" className={row}>
                    {body}
                  </a>
                ) : (
                  <div className="flex flex-col gap-1.5 px-6 py-5 md:flex-row md:gap-6">{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      </Reveal>

      {/* the second strip, running the other way, leading into the personal half */}
      <Reveal className="pb-16 md:pb-24">
        <PhotoStrip frames={STRIP_TWO} reverse speed="46s" />
      </Reveal>

      {/* ========================================================== beyond */}
      <Reveal id="beyond" className="mx-auto max-w-[1180px] px-6 pb-20 md:pb-28">
        <Heading sub="Making things is only half of it. The other half is creative and collective — art and choreography, the student communities i help run, and the conversations i record with women in tech.">
          Beyond the work
        </Heading>

        <div className="grid gap-4 md:grid-cols-3">
          <ListPanel title="communities" items={COMMUNITIES} />
          <ListPanel title="dance" items={DANCE} />
          <ListPanel title="podcasts" items={PODCASTS} />
        </div>

        <div className="mt-4 surface rounded-2xl p-7">
          <p className="font-ui text-[1.05rem] font-semibold">toolkit</p>
          <div className="mt-4 flex flex-wrap gap-[6px]">
            {[
              "python",
              "c",
              "c++",
              "typescript",
              "java",
              "sql",
              "pytorch",
              "numpy",
              "react",
              "node",
              "git",
              "linux",
            ].map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ========================================================= contact */}
      <Reveal id="contact" className="mx-auto max-w-[1180px] px-6 pb-20">
        <div className="rounded-2xl bg-ink px-7 py-14 text-center text-white md:px-12 md:py-20">
          <h2 className="mx-auto max-w-[18ch] font-serif-display text-[clamp(1.9rem,4.6vw,3.1rem)] leading-[1] tracking-[-0.03em]">
            let's build something
          </h2>
          <p className="mx-auto mt-5 max-w-[50ch] text-[16.5px] leading-[1.6] text-white/85">
            Research, products, or whatever you're making — don't hesitate to reach out!!
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <EmailButton dark />
            <a
              href="https://www.linkedin.com/in/selinkaraca/"
              target="_blank"
              rel="noreferrer noopener"
              className="pill !bg-white/15 !text-white"
            >
              linkedin
            </a>
            <a
              href="https://github.com/selinkaracaa"
              target="_blank"
              rel="noreferrer noopener"
              className="pill !bg-white/15 !text-white"
            >
              github
            </a>
          </div>
        </div>
      </Reveal>

      <footer className="mx-auto flex max-w-[1180px] items-center justify-between border-t border-border px-6 py-6 font-mono-label">
        <span>© {new Date().getFullYear()} selin karaca</span>
        <span>new york</span>
      </footer>
    </main>
  );
};

export default Index;
