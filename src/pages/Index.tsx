import { Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
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
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
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

const Section = ({
  id,
  n,
  title,
  kicker,
  children,
  className,
}: {
  id?: string;
  n: string;
  title: string;
  kicker?: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <Reveal id={id} className={`mx-auto max-w-[1140px] px-6 ${className ?? "pb-20 md:pb-28"}`}>
    <div className="mb-9 flex items-end justify-between gap-6 border-b-2 border-foreground/85 pb-3">
      <div className="flex items-baseline gap-4">
        <span className="stat-num text-[1.35rem] opacity-40">{n}</span>
        <h2 className="font-serif-display text-[clamp(1.7rem,3.6vw,2.5rem)] leading-none tracking-[-0.025em]">
          {title}
        </h2>
      </div>
      {kicker && <span className="font-mono-label shrink-0 pb-1">{kicker}</span>}
    </div>
    {children}
  </Reveal>
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
  <Link to={p.slug} className="surface surface-link group flex flex-col rounded-[3px] p-6">
    <div className="flex items-start justify-between gap-3">
      <h3 className="font-serif-display text-[1.4rem] leading-none tracking-[-0.02em]">{p.name}</h3>
      <KindTag kind={p.kind} />
    </div>
    <p className="mt-4 flex-1 text-[15px] leading-[1.55] text-foreground/80">{p.descriptor}</p>
    {p.headline && <p className="stat-num mt-6 text-[1.5rem]">{p.headline}</p>}
    <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
      <span className="font-mono-label">{p.period}</span>
      <ArrowRight
        className="h-4 w-4 shrink-0 -translate-x-1 text-ink opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
        aria-hidden
      />
    </div>
  </Link>
);

/** the things that should hit the eye first */
const CREDENTIALS = [
  { big: "3", small: "research labs", note: "CRIS · PRAISE · DAPLab, Columbia" },
  { big: "Citadel", small: "Securities", note: "Women's Ignite — live trading simulations" },
  { big: "Microsoft", small: "Girls in AI", note: "sustainability on Azure vision" },
  { big: "2,000+", small: "students on Todi", note: "product i built, live today" },
];

/* ================================================================== page */

const Index = () => {
  const work = byGroup("work");
  const research = work.filter((p) => p.kind === "research");
  const products = work.filter((p) => p.kind === "product");
  const todi = products.find((p) => p.slug === "/work/todi");
  const otherProducts = products.filter((p) => p.slug !== "/work/todi");

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* ============================================================ nav */}
      <header className="fixed inset-x-0 top-0 z-40 bg-gradient-to-b from-black/55 via-black/25 to-transparent pb-6">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5">
          <a
            href="#top"
            className="font-serif-italic text-[15px] text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]"
          >
            Selin Karaca
          </a>
          <nav className="flex gap-5 font-mono-label text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]">
            {["research", "building", "experience", "beyond"].map((l) => (
              <a key={l} href={`#${l}`} className="link-underline-light hidden sm:inline">
                {l}
              </a>
            ))}
            <a href="#contact" className="link-underline-light">
              contact
            </a>
          </nav>
        </div>
      </header>

      {/* ========================================================== mosaic */}
      <section id="top" className="relative h-[92vh] min-h-[560px] w-full md:h-screen">
        <div className="grid h-full w-full grid-cols-2 grid-rows-2">
          <Photo
            name="mosaic-portrait"
            alt="Selin Karaca"
            sizes="50vw"
            className="h-full w-full object-cover"
            priority
          />
          <Photo
            name="mosaic-campus"
            alt="Columbia at sunset"
            sizes="50vw"
            className="h-full w-full object-cover"
            priority
          />
          <Photo
            name="mosaic-dance"
            alt="Columbia Orchesis on stage"
            sizes="50vw"
            className="h-full w-full object-cover"
          />
          <Photo
            name="mosaic-library"
            alt="In the library"
            sizes="50vw"
            className="h-full w-full object-cover"
          />
        </div>

        {/* name plate */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/25"
        />
        <div className="absolute inset-x-0 bottom-0 px-6 pb-10 md:pb-14">
          <div className="mx-auto max-w-[1140px]">
            <h1 className="font-serif-display text-[clamp(3rem,12vw,8.5rem)] leading-[0.85] tracking-[-0.04em] text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.45)]">
              Selin
              <br />
              Karaca
            </h1>
            <p className="mt-5 font-mono-label !text-[12px] !text-white/85">
              cs @ columbia · interpretability research · new york
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================== intro */}
      <section className="mx-auto max-w-[1140px] px-6 pb-16 pt-16 md:pb-24 md:pt-20">
        <p className="max-w-[24ch] font-serif-display text-[clamp(1.6rem,3.4vw,2.6rem)] leading-[1.08] tracking-[-0.025em]">
          hi, i'm Selin!
        </p>
        <div className="mt-6 grid gap-8 md:grid-cols-[1.15fr_1fr] md:gap-16">
          <p className="text-[17px] leading-[1.6] text-foreground/85">
            I live in New York and study computer science at Columbia Engineering, with minors in{" "}
            <span className="font-serif-italic">applied math</span> and{" "}
            <span className="font-serif-italic">entrepreneurship &amp; innovation</span>. I'm
            excited to meet people who love building things — products, tech, communities, art — so
            don't hesitate to reach out!!
          </p>
          <div className="flex flex-col gap-3 self-start md:pt-1">
            <div className="flex flex-wrap gap-x-7 gap-y-2 text-[16px] text-foreground/85">
              <ExtLink href="mailto:sk5103@columbia.edu">sk5103@columbia.edu</ExtLink>
              <ExtLink href="https://www.linkedin.com/in/selinkaraca/">linkedin</ExtLink>
              <ExtLink href="https://github.com/selinkaracaa">github</ExtLink>
              <ExtLink href="/selin-karaca-resume.pdf">resume</ExtLink>
            </div>
          </div>
        </div>

        {/* credentials, at eye level rather than buried in a list */}
        <div className="mt-14 grid gap-px overflow-hidden rounded-[3px] border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {CREDENTIALS.map((c) => (
            <div key={c.big} className="bg-[hsl(var(--surface))] px-6 py-7">
              <p className="stat-num text-[2.1rem] leading-none">{c.big}</p>
              <p className="mt-2 font-serif-italic text-[1.05rem] leading-tight">{c.small}</p>
              <p className="font-mono-label mt-3 !leading-[1.5]">{c.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== research */}
      <Section id="research" n="01" title="Research" kicker="three labs at columbia">
        <div className="grid gap-4 md:grid-cols-3">
          {research.map((p) => (
            <Card key={p.slug} p={p} />
          ))}
        </div>
      </Section>

      {/* ======================================================== building */}
      <Section id="building" n="02" title="Building" kicker="products and studies">
        {todi && (
          <Link
            to={todi.slug}
            className="surface surface-link group mb-4 block overflow-hidden rounded-[3px]"
          >
            <div className="grid md:grid-cols-2">
              <div className="order-2 flex flex-col justify-center p-7 md:order-1 md:p-10">
                <div className="flex items-center gap-3">
                  <KindTag kind={todi.kind} />
                  <span className="font-mono-label">{todi.period}</span>
                </div>
                <h3 className="mt-4 font-serif-display text-[clamp(1.9rem,3.6vw,2.6rem)] leading-[1] tracking-[-0.025em]">
                  {todi.name}
                </h3>
                <p className="mt-4 max-w-[42ch] text-[16px] leading-[1.55] text-foreground/80">
                  {todi.descriptor}
                </p>
                <div className="mt-7 flex items-baseline gap-3">
                  <span className="stat-num text-[2.2rem]">{todi.headline}</span>
                  <span className="font-mono-label">{todi.status}</span>
                </div>
                <div className="mt-6 flex flex-wrap gap-[5px]">
                  {todi.stack.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
                <span className="mt-7 inline-flex items-center gap-1.5 font-mono-label text-ink">
                  see the work
                  <ArrowRight
                    className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden
                  />
                </span>
              </div>
              <div className="order-1 grid grid-rows-2 gap-px bg-border md:order-2">
                <Photo
                  name="todi-hero"
                  alt="The Todi home screen"
                  sizes="(max-width: 768px) 100vw, 560px"
                  className="h-full w-full object-cover object-left-top"
                />
                <Photo
                  name="todi-modules"
                  alt="Todi's eight cognitive modules"
                  sizes="(max-width: 768px) 100vw, 560px"
                  className="h-full w-full object-cover object-left-top"
                />
              </div>
            </div>
          </Link>
        )}
        <div className={`grid gap-4 ${otherProducts.length > 1 ? "md:grid-cols-2" : ""}`}>
          {otherProducts.map((p) => (
            <Card key={p.slug} p={p} />
          ))}
        </div>
      </Section>

      {/* ====================================================== experience */}
      <Section id="experience" n="03" title="Experience" kicker="roles, programmes, fellowships">
        <ul className="border-t border-border">
          {EXPERIENCE.map((e) => {
            const body = (
              <>
                <span className="font-mono-label shrink-0 md:w-[112px] md:pt-[5px]">
                  {e.period}
                </span>
                <span className="flex-1">
                  <span className="flex flex-wrap items-baseline gap-x-3">
                    <span className="font-serif-display text-[1.3rem] tracking-[-0.02em]">
                      {e.org}
                    </span>
                    <span className="font-mono-label">{e.role}</span>
                  </span>
                  <span className="mt-1.5 block max-w-[64ch] text-[15px] leading-[1.55] text-foreground/75">
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
              "group flex flex-col gap-1.5 py-5 transition-colors duration-300 hover:bg-foreground/[0.03] md:flex-row md:gap-6";
            return (
              <li key={e.org} className="border-b border-border">
                {e.slug ? (
                  <Link to={e.slug} className={row}>
                    {body}
                  </Link>
                ) : e.href ? (
                  <a href={e.href} target="_blank" rel="noreferrer noopener" className={row}>
                    {body}
                  </a>
                ) : (
                  <div className="flex flex-col gap-1.5 py-5 md:flex-row md:gap-6">{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      </Section>

      {/* ========================================================== beyond */}
      <Section id="beyond" n="04" title="Beyond the labs" kicker="communities, dance, podcasts">
        <div className="grid gap-8 md:grid-cols-[1fr_320px] md:gap-12">
          <div>
            <p className="font-mono-label">communities i help run</p>
            <ul className="mt-3 divide-y divide-border border-y border-border">
              {COMMUNITIES.map((c) => (
                <li
                  key={c.name}
                  className="flex flex-col gap-0.5 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                >
                  <span className="text-[15.5px]">{c.name}</span>
                  <span className="font-mono-label sm:text-right">{c.role}</span>
                </li>
              ))}
            </ul>

            <p className="font-mono-label mt-9">dance and podcasts</p>
            <ul className="mt-3 divide-y divide-border border-y border-border">
              {INVOLVEMENTS.map((i) => (
                <li
                  key={i.name}
                  className="flex flex-col gap-0.5 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                >
                  <span className="text-[15.5px]">
                    {i.href ? <ExtLink href={i.href}>{i.name}</ExtLink> : i.name}
                  </span>
                  <span className="font-mono-label sm:text-right">{i.role}</span>
                </li>
              ))}
            </ul>

            <p className="mt-9 max-w-[58ch] text-[16px] leading-[1.6] text-foreground/80">
              I want to make a real dent in this world through mission-driven research, startups
              and investment — and most of what i learn about that comes from the rooms in New York
              where people are building strange, ambitious things on a weeknight.
            </p>

            <div className="mt-8">
              <p className="font-mono-label">toolkit</p>
              <div className="mt-3 flex flex-wrap gap-[5px]">
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
          </div>

          <div className="surface w-full self-start rounded-[3px] p-2">
            <Photo
              name="side-dance-solo"
              alt="Dancing with Columbia Orchesis"
              sizes="(max-width: 768px) 90vw, 320px"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
        </div>
      </Section>

      {/* ========================================================= contact */}
      <Reveal id="contact" className="mx-auto max-w-[1140px] px-6 pb-20">
        <div className="surface rounded-[3px] px-7 py-11 md:px-12 md:py-16">
          <h2 className="max-w-[16ch] font-serif-display text-[clamp(1.9rem,4.4vw,3rem)] leading-[1] tracking-[-0.03em]">
            let's build something
          </h2>
          <p className="mt-5 max-w-[52ch] text-[16.5px] leading-[1.6] text-foreground/80">
            I'm always happy to talk about research, products, or whatever you're making. Don't
            hesitate to reach out!!
          </p>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-[16.5px] text-foreground/85">
            <ExtLink href="mailto:sk5103@columbia.edu">sk5103@columbia.edu</ExtLink>
            <ExtLink href="https://www.linkedin.com/in/selinkaraca/">linkedin</ExtLink>
            <ExtLink href="https://github.com/selinkaracaa">github</ExtLink>
            <ExtLink href="/selin-karaca-resume.pdf">resume</ExtLink>
          </div>
        </div>
      </Reveal>

      <footer className="mx-auto flex max-w-[1140px] items-center justify-between border-t border-border px-6 py-6 text-xs lowercase tracking-wider text-muted-foreground">
        <span>© {new Date().getFullYear()} Selin Karaca</span>
        <span className="font-serif-italic">new york</span>
      </footer>
    </main>
  );
};

export default Index;
