import { motion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import portrait from "@/assets/portrait.jpg";
import snapTreeLighting from "@/assets/snap-tree-lighting.jpg";
import snapButler from "@/assets/snap-butler.jpg";
import snapBeach from "@/assets/snap-beach.jpg";
import snapSnow from "@/assets/snap-snow.jpg";
import snapSkyline from "@/assets/snap-skyline.jpg";
import snapMet from "@/assets/snap-met.jpg";
import snapSunset from "@/assets/snap-sunset.jpg";
import snapDance from "@/assets/snap-dance.jpg";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

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
  label,
  children,
  id,
}: {
  label: string;
  id?: string;
  children: React.ReactNode;
}) => (
  <motion.section
    id={id}
    variants={fadeUp}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: "-80px" }}
    className="grid grid-cols-1 gap-6 border-t border-border/70 py-12 md:grid-cols-[10rem_1fr] md:gap-12 md:py-16"
  >
    <div className="font-serif-italic text-sm text-muted-foreground md:pt-2">
      {label}
    </div>
    <div className="max-w-2xl">{children}</div>
  </motion.section>
);

/** A small editorial photo with italic caption — sits inline in the prose. */
const Plate = ({
  src,
  caption,
  alt,
  className = "",
  rotate = "0deg",
}: {
  src: string;
  caption: string;
  alt?: string;
  className?: string;
  rotate?: string;
}) => (
  <motion.figure
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    style={{ transform: `rotate(${rotate})` }}
    className={`group ${className}`}
  >
    <div className="overflow-hidden rounded-sm bg-muted shadow-[0_20px_40px_-24px_hsl(var(--foreground)/0.25)]">
      <img
        src={src}
        alt={alt ?? caption}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
      />
    </div>
    <figcaption className="mt-2 font-serif-italic text-xs text-muted-foreground">
      {caption}
    </figcaption>
  </motion.figure>
);

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Top nav */}
      <header className="mx-auto flex max-w-3xl items-center justify-between px-6 pt-8 md:pt-12">
        <a href="#top" className="font-serif-italic text-base lowercase tracking-tight">
          selin karaca
        </a>
        <nav className="flex items-center gap-6 text-sm lowercase text-muted-foreground">
          <a href="#about" className="link-underline">about</a>
          <a href="#research" className="link-underline">research</a>
          <a href="#past" className="link-underline">past</a>
          <a href="#contact" className="link-underline">contact</a>
        </nav>
      </header>

      <div id="top" className="mx-auto max-w-3xl px-6 pb-24 pt-16 md:pt-24">
        {/* Hero — portrait + text + a tiny offset snap */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 items-end gap-10 md:grid-cols-[1fr_11rem]"
        >
          <div>
            <p className="font-serif-italic text-sm text-muted-foreground">
              hi, i'm —
            </p>
            <h1 className="mt-3 font-serif-display text-5xl leading-[0.95] text-foreground md:text-7xl">
              Selin <span className="font-serif-italic font-light">Karaca</span>
            </h1>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-muted-foreground">
              I'm a CS undergrad at <span className="text-foreground">Columbia</span>,
              trying to figure out what large language models actually
              <span className="font-serif-italic text-foreground"> understand</span>.
              Born by the Aegean in <span className="text-foreground">Izmir</span>,
              currently writing this from a fifth-floor walk-up in Morningside Heights.
            </p>
          </div>

          <div className="relative hidden md:block">
            <img
              src={portrait}
              alt="Portrait of Selin Karaca"
              width={176}
              height={224}
              className="h-[224px] w-[176px] rounded-sm object-cover shadow-[0_24px_50px_-28px_hsl(var(--foreground)/0.35)]"
            />
            <div className="absolute -bottom-10 -left-12 w-24 rotate-[-6deg]">
              <Plate
                src={snapBeach}
                caption="home"
                alt="The Aegean coast at sunset"
                className="w-24"
              />
            </div>
          </div>
        </motion.section>

        {/* Mobile portrait */}
        <div className="mt-10 flex items-end gap-4 md:hidden">
          <img
            src={portrait}
            alt="Portrait of Selin Karaca"
            className="h-40 w-32 rounded-sm object-cover shadow-[0_20px_40px_-24px_hsl(var(--foreground)/0.35)]"
          />
          <img
            src={snapBeach}
            alt="The Aegean coast"
            className="h-28 w-24 rotate-[-4deg] rounded-sm object-cover shadow-[0_16px_30px_-20px_hsl(var(--foreground)/0.3)]"
          />
        </div>

        {/* About — text wraps a floated snap */}
        <Section id="about" label="about">
          <div className="space-y-4 text-[16px] leading-relaxed text-foreground/90">
            <Plate
              src={snapSunset}
              caption="hudson, golden hour"
              className="float-right ml-6 mb-3 w-40 md:w-52"
              rotate="1.5deg"
            />
            <p>
              I grew up in <span className="font-serif-italic">Izmir</span> — a city
              that pretends to be casual about the sea but absolutely isn't. Long
              dinners, opinionated grandmothers, and the kind of summer light that
              ruins you for any other place. I think it's where I learned that the
              interesting question is usually <span className="font-serif-italic">why</span>,
              not <span className="font-serif-italic">what</span>.
            </p>
            <p>
              These days I study computer science at Columbia (with applied math and
              entrepreneurship on the side), and I spend a lot of time wondering
              whether the models we're building actually <em className="font-serif-italic">know</em> anything,
              or whether we've just gotten very good at pattern-matching dressed in
              a tuxedo. I find that question genuinely thrilling.
            </p>
            <p>
              Off the screen: I dance, I get attached to museums (the Met has my
              whole heart), I take far too many sunset photos, and I'm slowly
              learning that New York winters are not, in fact, a personal attack.
            </p>
          </div>

          {/* a small pair under the about prose */}
          <div className="mt-10 grid grid-cols-2 gap-4">
            <Plate src={snapDance} caption="on stage, in red" rotate="-1deg" />
            <Plate src={snapMet} caption="met, greek & roman wing" rotate="1deg" />
          </div>
        </Section>

        {/* Research */}
        <Section id="research" label="now / research">
          <div className="space-y-4 text-[16px] leading-relaxed text-foreground/90">
            <Plate
              src={snapButler}
              caption="butler, on fire"
              alt="Butler Library at sunset"
              className="float-left mr-6 mb-3 w-44 md:w-56"
              rotate="-1.5deg"
            />
            <p>
              I'm a research assistant at the{" "}
              <ExtLink href="https://cris.engineering.columbia.edu/">
                Complex Resilient Intelligent Systems (CRIS) Lab
              </ExtLink>{" "}
              at Columbia, working on a computational study of how large language
              models develop <span className="font-serif-italic">semantic
              understanding</span> as they scale.
            </p>
            <p>
              Concretely: I built a corpus of 500 books across genres and analyze
              the embedding representations produced by model families —{" "}
              <span className="font-serif-italic">Pythia, Cerebras-GPT, Qwen2.5,</span>{" "}
              and OpenAI — at varying parameter counts. The thing I'm hunting for is{" "}
              <span className="font-serif-italic">emergence</span>: the moment a
              model's internal representations get rich enough to actually tell one
              book apart from another.
            </p>
            <p>
              Using cosine similarity of chunk embeddings within and across books, I
              found a sharp capability threshold in the Pythia family between{" "}
              <span className="text-foreground">160M and 410M parameters</span>,
              where the model's ability to encode book identity jumps nearly{" "}
              <span className="text-foreground">28× in a single scale step</span>.
              I'm complementing this with topic-discovery experiments using
              BERTopic — tracing, for example, how the thematic structure of
              romance novels evolves as models grow.
            </p>
            <p className="text-muted-foreground">
              Also: CAIAC Technical AI Safety Fellow. TA for{" "}
              <span className="font-serif-italic">Fundamentals of Computer Systems</span>.
            </p>
          </div>
        </Section>

        {/* A wide editorial break — full-bleed-ish skyline */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="my-4 grid grid-cols-1 gap-3 md:grid-cols-[2fr_1fr]"
        >
          <figure className="overflow-hidden rounded-sm">
            <img
              src={snapSkyline}
              alt="Midtown Manhattan from above"
              loading="lazy"
              className="h-64 w-full object-cover md:h-80"
            />
          </figure>
          <figure className="overflow-hidden rounded-sm">
            <img
              src={snapTreeLighting}
              alt="Tree lighting on College Walk"
              loading="lazy"
              className="h-64 w-full object-cover md:h-80"
            />
          </figure>
          <figcaption className="font-serif-italic text-xs text-muted-foreground md:col-span-2">
            new york, on its better days.
          </figcaption>
        </motion.div>

        {/* Past lives */}
        <Section id="past" label="past lives">
          <div className="space-y-5 text-[16px] leading-relaxed text-foreground/90">
            <Plate
              src={snapSnow}
              caption="first real snow"
              className="float-right ml-6 mb-3 w-40 md:w-48"
              rotate="2deg"
            />
            <p>
              Before CRIS, I spent a few summers chasing the same question through
              different doors.
            </p>
            <ul className="space-y-4">
              <li>
                <span className="font-serif-display text-lg">Citadel Securities</span>{" "}
                <span className="font-serif-italic text-muted-foreground">
                  — Women's Ignite Trading Week, Jan 2026.
                </span>
                <span className="text-muted-foreground">
                  {" "}A week of simulated trading, real post-mortems, and learning to
                  size your conviction honestly.
                </span>
              </li>
              <li>
                <span className="font-serif-display text-lg">Koç University</span>{" "}
                <span className="font-serif-italic text-muted-foreground">
                  — Augmented Summer Research, 2023.
                </span>
                <span className="text-muted-foreground">
                  {" "}AR/VR, signal processing, object detection — the summer I fell
                  for Python and stopped sleeping.
                </span>
              </li>
              <li>
                <span className="font-serif-display text-lg">
                  Istanbul University Cerrahpaşa
                </span>{" "}
                <span className="font-serif-italic text-muted-foreground">
                  — DL for autism diagnosis, 2022–23.
                </span>
                <span className="text-muted-foreground">
                  {" "}R&amp;D on facial-imaging models for early autism detection in
                  Turkey, alongside ADOS clinicians. My first taste of research that
                  actually mattered to someone.
                </span>
              </li>
            </ul>
          </div>
        </Section>

        {/* Contact */}
        <Section id="contact" label="say hi">
          <div className="space-y-4 text-[16px] leading-relaxed text-foreground/90">
            <p>
              I love a good email. Tell me what you're working on, what you're
              reading, or where to get the best simit in New York —{" "}
              <ExtLink href="mailto:sk5103@columbia.edu">sk5103@columbia.edu</ExtLink>.
            </p>
            <ul className="space-y-2 text-[16px]">
              <li>
                <ExtLink href="https://www.linkedin.com/in/selinkaraca/">LinkedIn</ExtLink>
              </li>
              <li>
                <ExtLink href="https://cris.engineering.columbia.edu/">CRIS Lab</ExtLink>
              </li>
            </ul>
          </div>
        </Section>

        <footer className="mt-16 flex items-center justify-between border-t border-border/70 pt-6 text-xs lowercase tracking-wider text-muted-foreground">
          <span>© {new Date().getFullYear()} selin karaca</span>
          <span className="font-serif-italic">izmir · new york</span>
        </footer>
      </div>
    </main>
  );
};

export default Index;
