import { Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import Photo from "@/components/Photo";
import { byGroup, EXPERIENCE, INVOLVEMENTS, type Project } from "@/data/projects";

/* ------------------------------------------------------------------ motion */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
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

const SectionHead = ({ label, title }: { label: string; title: string }) => (
  <div className="mb-8 flex items-baseline justify-between gap-6 border-b border-border pb-4">
    <h2 className="font-serif-display text-[clamp(1.5rem,3vw,2.1rem)] tracking-[-0.02em]">
      {title}
    </h2>
    <span className="font-mono-label shrink-0">{label}</span>
  </div>
);

/** product / research — the one distinction worth making visible */
const KindTag = ({ kind }: { kind?: string }) =>
  kind ? (
    <span
      className={`font-mono-label rounded-full border px-2 py-[2px] ${
        kind === "research"
          ? "border-ink/35 text-ink"
          : "border-border text-muted-foreground"
      }`}
    >
      {kind}
    </span>
  ) : null;

/* ------------------------------------------------------------------- cards */

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

/* ================================================================== page */

const Index = () => {
  const work = byGroup("work");
  const todi = work.find((p) => p.slug === "/work/todi");
  const rest = work.filter((p) => p.slug !== "/work/todi");

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* ============================================================ nav */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1080px] items-center justify-between px-6 py-4">
          <a href="#top" className="font-serif-italic text-[15px]">
            Selin Karaca
          </a>
          <nav className="flex gap-5 font-mono-label">
            <a href="#work" className="link-underline">
              work
            </a>
            <a href="#elsewhere" className="link-underline hidden sm:inline">
              elsewhere
            </a>
            <a href="#about" className="link-underline">
              about
            </a>
          </nav>
        </div>
      </header>

      {/* ========================================================== intro */}
      <section id="top" className="mx-auto max-w-[1080px] px-6 pb-14 pt-14 md:pb-20 md:pt-20">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr] md:items-center md:gap-14">
          <div>
            <p className="font-mono-label">computer science · columbia · new york</p>
            <h1 className="mt-5 max-w-[25ch] font-serif-display text-[clamp(1.95rem,4.3vw,3.05rem)] leading-[1.05] tracking-[-0.026em]">
              i build software, i run experiments, and i'm happiest around people who love building
              things.
            </h1>
            <p className="mt-7 max-w-[56ch] text-[16.5px] leading-[1.65] text-foreground/80">
              I study computer science at Columbia Engineering, with minors in applied math and
              entrepreneurship &amp; innovation. Most weeks that means machine-learning research in
              three labs, shipping product, and being somewhere in New York where people are making
              things — a demo night, a hackathon, a studio, a stage.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-7 gap-y-2 text-[16px] text-foreground/85">
              <ExtLink href="mailto:sk5103@columbia.edu">email</ExtLink>
              <ExtLink href="https://github.com/selinkaracaa">github</ExtLink>
              <ExtLink href="https://www.linkedin.com/in/selinkaraca/">linkedin</ExtLink>
              <ExtLink href="/selin-karaca-resume.pdf">resume</ExtLink>
            </div>
          </div>

          <div className="surface rounded-[3px] p-2">
            <Photo
              name="hero-portrait"
              alt="Selin Karaca"
              sizes="(max-width: 768px) 92vw, 400px"
              className="aspect-[4/3] w-full object-cover object-[38%_center]"
              priority
            />
          </div>
        </div>
      </section>

      {/* =========================================================== work */}
      <Reveal id="work" className="mx-auto max-w-[1080px] px-6 pb-16 md:pb-24">
        <SectionHead label="products and research" title="Work" />

        {/* the flagship, with the product in the frame */}
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
                  sizes="(max-width: 768px) 100vw, 520px"
                  className="h-full w-full object-cover object-left-top"
                />
                <Photo
                  name="todi-modules"
                  alt="Todi's eight cognitive modules"
                  sizes="(max-width: 768px) 100vw, 520px"
                  className="h-full w-full object-cover object-left-top"
                />
              </div>
            </div>
          </Link>
        )}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {rest.map((p) => (
            <Card key={p.slug} p={p} />
          ))}
        </div>
      </Reveal>

      {/* ====================================================== elsewhere */}
      <Reveal id="elsewhere" className="mx-auto max-w-[1080px] px-6 pb-16 md:pb-24">
        <SectionHead label="roles and programmes" title="Elsewhere" />

        <ul className="border-t border-border">
          {EXPERIENCE.map((e) => {
            const body = (
              <>
                <span className="font-mono-label shrink-0 md:w-[110px] md:pt-1">{e.period}</span>
                <span className="flex-1">
                  <span className="flex flex-wrap items-baseline gap-x-3">
                    <span className="font-serif-display text-[1.2rem] tracking-[-0.015em]">
                      {e.org}
                    </span>
                    <span className="font-mono-label">{e.role}</span>
                  </span>
                  <span className="mt-1.5 block max-w-[62ch] text-[15px] leading-[1.55] text-foreground/75">
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

            const rowClass =
              "group flex flex-col gap-1.5 py-5 transition-colors duration-300 hover:bg-foreground/[0.025] md:flex-row md:gap-6";

            return (
              <li key={e.org} className="border-b border-border">
                {e.slug ? (
                  <Link to={e.slug} className={rowClass}>
                    {body}
                  </Link>
                ) : e.href ? (
                  <a href={e.href} target="_blank" rel="noreferrer noopener" className={rowClass}>
                    {body}
                  </a>
                ) : (
                  <div className="flex flex-col gap-1.5 py-5 md:flex-row md:gap-6">{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      </Reveal>

      {/* ========================================================== about */}
      <Reveal id="about" className="mx-auto max-w-[1080px] px-6 pb-16 md:pb-24">
        <SectionHead label="the rest of it" title="About" />

        <div className="grid gap-10 md:grid-cols-[280px_1fr] md:gap-14">
          <div className="surface w-full max-w-[280px] self-start rounded-[3px] p-2">
            <Photo
              name="portrait"
              alt="Portrait of Selin Karaca"
              sizes="(max-width: 768px) 60vw, 280px"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>

          <div>
            <p className="max-w-[60ch] text-[16.5px] leading-[1.65] text-foreground/85">
              I'm from Izmir and i live in New York, which is most of why i ended up doing three
              things at once. The city is full of people building strange and ambitious things on
              weeknights, and i've found that showing up to those rooms teaches me as much as the
              lab does.
            </p>
            <p className="mt-5 max-w-[60ch] text-[16.5px] leading-[1.65] text-foreground/85">
              Outside the labs i dance latin and ballroom, i help make two podcasts about women in
              tech, and i spend a lot of time bringing people together — across companies, campuses
              and a fairly large Turkish diaspora. If you're building something, i'd like to hear
              about it.
            </p>

            <div className="mt-9">
              <p className="font-mono-label">involvements</p>
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
            </div>

            <div className="mt-9">
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
        </div>
      </Reveal>

      {/* ======================================================== contact */}
      <Reveal className="mx-auto max-w-[1080px] px-6 pb-20">
        <div className="surface rounded-[3px] px-7 py-10 md:px-12 md:py-14">
          <h2 className="max-w-[14ch] font-serif-display text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.02] tracking-[-0.025em]">
            let's build something
          </h2>
          <div className="mt-7 flex flex-wrap gap-x-8 gap-y-3 text-[16.5px] text-foreground/85">
            <ExtLink href="mailto:sk5103@columbia.edu">sk5103@columbia.edu</ExtLink>
            <ExtLink href="https://www.linkedin.com/in/selinkaraca/">linkedin</ExtLink>
            <ExtLink href="https://github.com/selinkaracaa">github</ExtLink>
            <ExtLink href="/selin-karaca-resume.pdf">resume</ExtLink>
          </div>
        </div>
      </Reveal>

      <footer className="mx-auto flex max-w-[1080px] items-center justify-between border-t border-border px-6 py-6 text-xs lowercase tracking-wider text-muted-foreground">
        <span>© {new Date().getFullYear()} Selin Karaca</span>
        <span className="font-serif-italic">new york</span>
      </footer>
    </main>
  );
};

export default Index;
