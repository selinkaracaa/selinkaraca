import { Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, ArrowRight, Mail } from "lucide-react";
import Photo from "@/components/Photo";
import {
  byGroup,
  COMMUNITIES,
  EXPERIENCE,
  INVOLVEMENTS,
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

/** the hero filmstrip — real photographs, bleeding off both edges */
type PhotoName = React.ComponentProps<typeof Photo>["name"];
const STRIP: { name: PhotoName; alt: string; span: string }[] = [
  { name: "mosaic-portrait", alt: "Selin Karaca", span: "w-[240px] sm:w-[280px]" },
  {
    name: "side-citadel",
    alt: "Citadel Securities Ignite Women's Trading Program",
    span: "w-[340px] sm:w-[430px]",
  },
  { name: "mosaic-campus", alt: "Columbia at sunset", span: "w-[300px] sm:w-[380px]" },
  { name: "side-dance-solo", alt: "Dancing with Columbia Orchesis", span: "w-[220px] sm:w-[260px]" },
  { name: "mosaic-library", alt: "In the library", span: "w-[300px] sm:w-[380px]" },
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
      <section id="top" className="overflow-hidden pb-4 pt-6">
        <div className="flex gap-3 px-3 sm:gap-4">
          {STRIP.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`${s.span} shrink-0 overflow-hidden rounded-2xl`}
            >
              <Photo
                name={s.name}
                alt={s.alt}
                sizes="(max-width: 640px) 60vw, 430px"
                className="h-[300px] w-full object-cover sm:h-[380px]"
                priority={i < 3}
              />
            </motion.div>
          ))}
        </div>
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
          <a href="mailto:sk5103@columbia.edu" className="pill">
            <Mail className="h-4 w-4" aria-hidden />
            get in touch
          </a>
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
                    <span className="font-mono-label">{e.role}</span>
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

      {/* ========================================================== beyond */}
      <Reveal id="beyond" className="mx-auto max-w-[1180px] px-6 pb-20 md:pb-28">
        <Heading sub="I want to make a real dent in this world through mission-driven research, startups and investment — and a lot of what i learn about that comes from the people around me.">
          Beyond the labs
        </Heading>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="surface rounded-2xl p-7">
            <p className="font-ui text-[1.05rem] font-semibold">communities i help run</p>
            <ul className="mt-4 divide-y divide-border">
              {COMMUNITIES.map((c) => (
                <li
                  key={c.name}
                  className="flex flex-col gap-0.5 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                >
                  <span className="text-[15px]">{c.name}</span>
                  <span className="font-mono-label sm:text-right">{c.role}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="surface rounded-2xl p-7">
            <p className="font-ui text-[1.05rem] font-semibold">dance and podcasts</p>
            <ul className="mt-4 divide-y divide-border">
              {INVOLVEMENTS.map((i) => (
                <li
                  key={i.name}
                  className="flex flex-col gap-0.5 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                >
                  <span className="text-[15px]">
                    {i.href ? <ExtLink href={i.href}>{i.name}</ExtLink> : i.name}
                  </span>
                  <span className="font-mono-label sm:text-right">{i.role}</span>
                </li>
              ))}
            </ul>
          </div>
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
            <a
              href="mailto:sk5103@columbia.edu"
              className="pill !bg-white !text-[hsl(var(--ink))]"
            >
              <Mail className="h-4 w-4" aria-hidden />
              sk5103@columbia.edu
            </a>
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
