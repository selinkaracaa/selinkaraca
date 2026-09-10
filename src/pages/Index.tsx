import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import ScaleChart from "@/components/ScaleChart";
import Photo from "@/components/Photo";

/* ------------------------------------------------------------------ motion */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
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
    viewport={{ once: true, margin: "-80px" }}
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

const Tag = ({ children }: { children: React.ReactNode }) => <span className="tag">{children}</span>;

/* an openable entry — the whole row is the control */
const Disclosure = ({
  index,
  title,
  meta,
  open,
  onToggle,
  children,
}: {
  index: string;
  title: React.ReactNode;
  meta: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) => (
  <div className="border-t border-border">
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      className="group flex w-full items-start gap-4 py-6 text-left md:gap-6"
    >
      <span className="marker w-6 shrink-0 pt-[10px]">{index}</span>
      <span className="flex-1">
        <span
          className={`block font-serif-italic text-[clamp(1.2rem,2.3vw,1.75rem)] leading-[1.2] transition-colors duration-300 ${
            open ? "text-ink" : "text-foreground group-hover:text-ink"
          }`}
        >
          {title}
        </span>
        <span className="mt-2 block font-mono-label">{meta}</span>
      </span>
      <span
        aria-hidden
        className="shrink-0 pt-2 text-ink transition-transform duration-300"
        style={{ transform: open ? "rotate(45deg)" : "none" }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 0v14M0 7h14" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </span>
    </button>

    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          <div className="pb-9 md:pl-[2.75rem]">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const Body = ({ children }: { children: React.ReactNode }) => (
  <p className="max-w-[62ch] text-[16.5px] leading-relaxed text-foreground/85">{children}</p>
);

const Tools = ({ items }: { items: string[] }) => (
  <div className="mt-5 flex flex-wrap gap-[5px]">
    {items.map((t) => (
      <Tag key={t}>{t}</Tag>
    ))}
  </div>
);

const Links = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[15px] text-foreground/85">{children}</div>
);


/* research entry — a link to its own page, not an accordion */
const ResearchCard = ({
  index,
  to,
  question,
  meta,
  summary,
  tools,
}: {
  index: string;
  to: string;
  question: React.ReactNode;
  meta: string;
  summary: string;
  tools: string[];
}) => (
  <Link
    to={to}
    className="group block border-t border-border py-7 transition-colors duration-300"
  >
    <div className="flex items-start gap-4 md:gap-6">
      <span className="marker w-6 shrink-0 pt-[10px]">{index}</span>
      <div className="flex-1">
        <h3 className="font-serif-italic text-[clamp(1.2rem,2.3vw,1.75rem)] leading-[1.2] text-foreground transition-colors duration-300 group-hover:text-ink">
          {question}
        </h3>
        <p className="mt-2 font-mono-label">{meta}</p>
        <p className="mt-4 max-w-[60ch] text-[16px] leading-relaxed text-foreground/75">
          {summary}
        </p>
        <div className="mt-4 flex flex-wrap gap-[5px]">
          {tools.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
        <p className="mt-5 font-mono-label text-ink">
          read the full study →
        </p>
      </div>
    </div>
  </Link>
);

/* section shell */
const Section = ({
  id,
  index,
  label,
  title,
  lede,
  children,
}: {
  id: string;
  index: string;
  label: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <Reveal
    id={id}
    className="mx-auto grid max-w-[1150px] scroll-mt-24 grid-cols-1 gap-8 px-6 py-20 md:grid-cols-[minmax(180px,230px)_1fr] md:gap-14 md:py-28"
  >
    <div className="md:sticky md:top-24 md:self-start">
      <p className="marker">
        {index} — {label}
      </p>
      <h2 className="mt-3 font-serif-italic text-2xl leading-tight text-foreground md:text-[1.85rem]">
        {title}
      </h2>
    </div>
    <div>
      {lede && (
        <p className="mb-10 max-w-[38ch] font-serif-display text-[clamp(1.3rem,2.5vw,1.9rem)] leading-[1.14] text-foreground/90">
          {lede}
        </p>
      )}
      {children}
    </div>
  </Reveal>
);

const Breather = ({ name }: { name: "side-skyline" | "side-dance-group" }) => (
  <div className="h-[36vh] w-full overflow-hidden md:h-[48vh]">
    <Photo name={name} alt="" sizes="100vw" className="h-full w-full object-cover" />
  </div>
);

/* ------------------------------------------------------------------- page */

const Index = () => {

  const toggle =
    (current: number | null, set: (v: number | null) => void) => (i: number) => () =>
      set(current === i ? null : i);


  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="fixed left-0 right-0 top-0 z-50 flex items-start justify-between px-6 pt-6 mix-blend-difference">
        <a href="#top" className="font-serif-italic text-base text-white">
          Selin Karaca
        </a>
        <nav className="flex flex-col items-end gap-1 text-sm lowercase text-white/90 md:flex-row md:items-center md:gap-6">
          <a href="#research" className="link-underline-light">research</a>
          <a href="#work" className="link-underline-light">work</a>
          <a href="#about" className="link-underline-light">about</a>
        </nav>
      </header>

      {/* ============================================================== COVER */}
      <section id="top" className="relative w-full">
        <div className="grid h-[90vh] w-full grid-cols-1 grid-rows-[1.45fr_1fr] md:h-screen md:grid-cols-[1.6fr_1fr] md:grid-rows-1">
          <div className="relative overflow-hidden">
            <Photo
              name="hero-tl"
              alt="Selin Karaca"
              sizes="(max-width: 768px) 100vw, 62vw"
              className="h-full w-full object-cover"
              priority
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-black/85 via-black/45 to-transparent"
            />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
              <h1 className="max-w-[19ch] font-serif-display text-[clamp(1.85rem,4vw,3.5rem)] leading-[1] text-white">
                i build things that help people learn — and study whether{" "}
                <span className="font-serif-italic font-light">machines do</span>
              </h1>
            </div>
          </div>
          <div className="grid grid-cols-2 grid-rows-1 md:grid-cols-1 md:grid-rows-2">
            <div className="overflow-hidden">
              <Photo
                name="hero-tr"
                alt="Columbia at sunset"
                sizes="(max-width: 768px) 50vw, 38vw"
                className="h-full w-full object-cover"
                priority
              />
            </div>
            <div className="overflow-hidden">
              <Photo
                name="hero-bl"
                alt="Orchesis on stage"
                sizes="(max-width: 768px) 50vw, 38vw"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================== STANDFIRST */}
      <Reveal className="mx-auto max-w-[1150px] px-6 py-20 md:py-28">
        <div className="md:grid md:grid-cols-[minmax(180px,230px)_1fr] md:gap-14">
          <p className="marker">new york</p>
          <div>
            <p className="max-w-[44ch] font-serif-display text-[clamp(1.5rem,3vw,2.35rem)] leading-[1.12]">
              Most of what i do circles one idea: how{" "}
              <span className="font-serif-italic">understanding</span> gets built.
            </p>
            <p className="mt-8 max-w-[60ch] text-[17px] leading-relaxed text-foreground/85">
              In a child working through a reading exercise, and in a language model somewhere
              between memorising and meaning. I study the second across three labs at Columbia
              Engineering, where i'm a computer science student with minors in applied math and
              entrepreneurship &amp; innovation. I've spent the last two years building software
              for the first.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-7 gap-y-2 text-[16px] text-foreground/85">
              <ExtLink href="mailto:sk5103@columbia.edu">email</ExtLink>
              <ExtLink href="https://github.com/selinkaracaa">github</ExtLink>
              <ExtLink href="https://www.linkedin.com/in/selinkaraca/">linkedin</ExtLink>
              <ExtLink href="/selin-karaca-resume.pdf">resume</ExtLink>
            </div>
          </div>
        </div>
      </Reveal>

      {/* =========================================================== THE FINDING */}
      <Reveal className="mx-auto max-w-[1150px] px-6 pb-8 pt-4 md:pb-14">
        <p className="marker">a result, from the CRIS work</p>
        <h2 className="mt-4 max-w-[24ch] font-serif-display text-[clamp(1.6rem,3.4vw,2.7rem)] leading-[1.08]">
          Bigger models don't get better at{" "}
          <span className="font-serif-italic">everything</span> — they get better at
          knowing a book is one thing.
        </h2>
        <p className="mt-6 max-w-[64ch] text-[16.5px] leading-relaxed text-foreground/85">
          I took 500 public-domain books, cut them into ~46,800 chunks, and embedded every chunk
          with 19 base language models. For each chunk i asked a simple question: is its nearest
          neighbour more likely to come from its own book, or from someone else's? The gap between
          those two similarities is the whole chart. Pythia climbs a full order of magnitude across
          its range. Qwen barely moves. And every base model sits far below the models that were
          trained to do this on purpose.
        </p>
        <div className="mt-10">
          <ScaleChart />
        </div>
        <p className="mt-6 max-w-[64ch] text-[15px] leading-relaxed text-foreground/70">
          Which is the more interesting question, and the one i'm still working on: the capability
          is clearly emerging with scale, but it emerges at different rates in different families —
          so it isn't scale alone doing the work.
        </p>
      </Reveal>

      <Breather name="side-skyline" />

      {/* ============================================================ RESEARCH */}
      <Section
        id="research"
        index="01"
        label="research"
        title="questions i'm sitting with"
        lede={<>Three labs, one recurring problem: telling real understanding from a convincing
          imitation of it.</>}
      >
        <ResearchCard
          index="01"
          to="/research/cris-lab"
          question={<>When does a model stop mimicking meaning and start representing it?</>}
          meta="CRIS Lab · columbia · manuscript in preparation"
          summary="500 books, ~46,800 chunks, 19 base models. For every chunk: is its nearest neighbour more likely to come from its own book, or someone else's? Pythia goes from blind to that distinction at 70M to sharply aware of it at 6.9B — and Qwen barely moves at all."
          tools={["pytorch", "bertopic", "embeddings", "gpu cluster"]}
        />

        <ResearchCard
          index="02"
          to="/research/agent-olympiad"
          question={<>Can a group of models actually reason together, or only sound like it?</>}
          meta="DAPLab · columbia · working toward ICLR"
          summary="Olympiad problems come with official solutions and real grading rubrics, so partial credit can be assigned the way a human judge would rather than by string match. I build the pipelines that turn those materials into structured, machine-gradable data."
          tools={["python", "llm eval", "benchmarks", "data pipelines"]}
        />

        <ResearchCard
          index="03"
          to="/research/praise-lab"
          question={<>Can a machine see an equation before it can write one down?</>}
          meta="PRAISE Lab · columbia · symbolic law discovery"
          summary="Encode experimental data as an image, push it through a deep network, and predict which mathematical operators matter from the picture alone — treating an equation as a shape to recognise rather than a string to search for."
          tools={["pytorch", "computer vision", "super-resolution"]}
        />
      </Section>

      {/* ================================================================ WORK */}
      <Section
        id="work"
        index="02"
        label="work"
        title="things i've built"
        lede={<>Software that had to work for someone who wasn't me.</>}
      >
        <ResearchCard
          index="01"
          to="/work/todi"
          question={<>A learning platform that reshapes itself around each child</>}
          meta="todi · developer · family education company · live, 2,000+ students"
          summary="Eight cognitive modules and 10,000+ exercises for children aged 5–15 with dyslexia and attention differences. It's my family's company and i built most of the software — React, Express, and the accessibility work that decides whether the interface is usable at all."
          tools={["react", "node", "express", "accessibility"]}
        />

        <ResearchCard
          index="02"
          to="/work/savanah"
          question={<>The model already knows how fabric folds — the workflow suppresses it</>}
          meta="savanah.ai · ai personalization intern · jun 2026 —"
          summary="I scored 12 outputs across 7 AI tools on whether printed patterns interrupt at folds the way real textile does. Every tool failed the same way, and prompt engineering changed nothing — which turned out to point at a workflow problem, not a model one."
          tools={["diffusion", "controlnet", "embeddings", "umap", "hdbscan"]}
        />

        <ResearchCard
          index="03"
          to="/work/teaching"
          question={<>Teaching 300 students how memory and architecture actually work</>}
          meta="columbia engineering · teaching assistant · jan 2026 —"
          summary="C programming, memory, and computer architecture, plus proof techniques and induction. Almost nobody arrives at office hours with the question they actually need answered."
          tools={["c", "systems", "architecture", "discrete math"]}
        />

        <ResearchCard
          index="04"
          to="/work/efilli"
          question={<>My first code that strangers had to use</>}
          meta="cool digital · efilli · swe & product intern · 2025"
          summary="Cookie-consent interfaces in JavaScript, Vue and React, shipped to production on live client sites — and a lot of hours tracing auth tokens and routing to find the failures before release."
          tools={["javascript", "vue", "react", "figma"]}
        />

        <p className="mt-14 max-w-[62ch] text-[16px] leading-relaxed text-foreground/70">
          I've also spent short, intense stretches inside{" "}
          <span className="font-serif-italic">Citadel Securities'</span> Women's Ignite trading
          week, running live simulations and defending every decision afterward to quant traders;{" "}
          <span className="font-serif-italic">Microsoft's</span> Girls in AI program, building a
          sustainability tool on Azure image recognition; and Columbia's Global Career Accelerator,
          analysing Intel sustainability data in SQL.
        </p>
      </Section>

      <Breather name="side-dance-group" />

      {/* =============================================================== ABOUT */}
      <Section id="about" index="03" label="about" title="off the clock">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[190px_1fr] md:gap-12">
          <Photo
            name="portrait"
            alt="Portrait of Selin Karaca"
            sizes="190px"
            className="aspect-[4/5] w-full max-w-[190px] object-cover"
          />

          <div className="space-y-6">
            <Body>
              I grew up in Istanbul and live in New York now. Outside the labs i dance latin and
              ballroom, and choreograph for{" "}
              <ExtLink href="https://www.youtube.com/watch?v=ZvNva2_8x-I">
                Columbia Orchesis
              </ExtLink>{" "}
              — which has more in common with debugging than it sounds, since both are mostly
              iteration in front of people who can see every mistake.
            </Body>
            <Body>
              I make podcasts about women in tech with{" "}
              <ExtLink href="https://open.spotify.com/show/0Z2mQG5grq8SU8f4G2u8fe?si=d43780fcdb734602">
                Reign of Chains
              </ExtLink>{" "}
              and{" "}
              <ExtLink href="https://open.spotify.com/show/5tZbbhiqsr3acOScglDnfq?si=bc1ec5ecf8764d02">
                the WiCS Network
              </ExtLink>
              , and i'm head of corporate relations for the Turkish Students Association Global,
              which mostly means convincing companies that a room full of Turkish students is worth
              their afternoon. I'm happiest around people who love building things, so don't
              hesitate to reach out.
            </Body>

            <div className="pt-2">
              <p className="marker">toolkit</p>
              <div className="mt-3 flex flex-wrap gap-[5px]">
                {[
                  "python", "c", "c++", "typescript", "java", "sql",
                  "pytorch", "numpy", "react", "node", "git", "linux",
                ].map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ============================================================= CONTACT */}
      <Reveal className="mx-auto max-w-[1150px] px-6 pb-24">
        <div className="border-t border-border pt-14">
          <p className="marker">04 — contact</p>
          <h2 className="mt-4 max-w-[16ch] font-serif-display text-[clamp(1.9rem,4.4vw,3.1rem)] leading-[1]">
            let's build something
          </h2>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-[17px] text-foreground/85">
            <ExtLink href="mailto:sk5103@columbia.edu">sk5103@columbia.edu</ExtLink>
            <ExtLink href="https://www.linkedin.com/in/selinkaraca/">linkedin</ExtLink>
            <ExtLink href="https://github.com/selinkaracaa">github</ExtLink>
            <ExtLink href="/selin-karaca-resume.pdf">resume</ExtLink>
          </div>
        </div>
      </Reveal>

      <footer className="mx-auto flex max-w-[1150px] items-center justify-between border-t border-border px-6 py-6 text-xs lowercase tracking-wider text-muted-foreground">
        <span>© {new Date().getFullYear()} Selin Karaca</span>
        <span className="font-serif-italic">istanbul → new york</span>
      </footer>
    </main>
  );
};

export default Index;
