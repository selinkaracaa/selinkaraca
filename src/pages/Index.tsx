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
    className="relative grid grid-cols-1 gap-6 border-t border-border/60 py-14 md:grid-cols-[10rem_1fr] md:gap-12 md:py-20"
  >
    <div className="font-serif-italic text-sm text-muted-foreground md:pt-2">
      {label}
    </div>
    <div className="max-w-2xl">{children}</div>
  </motion.section>
);

/** Soft-edged photo that melts into the paper */
const SoftImg = ({
  src,
  alt,
  className = "",
  rotate = "0deg",
  duotone = true,
}: {
  src: string;
  alt: string;
  className?: string;
  rotate?: string;
  duotone?: boolean;
}) => (
  <motion.img
    src={src}
    alt={alt}
    loading="lazy"
    initial={{ opacity: 0, y: 14, scale: 1.02 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
    style={{ transform: `rotate(${rotate})` }}
    className={`plate-soft object-cover ${duotone ? "duotone-warm" : ""} ${className}`}
  />
);

const Index = () => {
  return (
    <main className="paper-bg paper-grain relative min-h-screen text-foreground">
      {/* Floating atmospheric photos — behind everything, page-wide */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <img
          src={snapSunset}
          alt=""
          className="plate-soft duotone-warm absolute -right-32 top-[14%] hidden w-[36rem] rotate-[3deg] opacity-60 md:block"
        />
        <img
          src={snapSkyline}
          alt=""
          className="plate-soft duotone-warm absolute -left-40 top-[48%] hidden w-[34rem] -rotate-[4deg] opacity-50 md:block"
        />
        <img
          src={snapDance}
          alt=""
          className="plate-soft absolute -right-24 top-[78%] hidden w-[26rem] rotate-[2deg] opacity-45 mix-blend-multiply md:block"
        />
        <img
          src={snapMet}
          alt=""
          className="plate-soft duotone-warm absolute -left-24 top-[110%] hidden w-[28rem] -rotate-[2deg] opacity-50 md:block"
        />
        <img
          src={snapBeach}
          alt=""
          className="plate-soft duotone-warm absolute -right-28 top-[150%] hidden w-[30rem] rotate-[3deg] opacity-50 md:block"
        />
      </div>

      <div className="relative z-10">
        {/* Top nav */}
        <header className="mx-auto flex max-w-3xl items-center justify-between px-6 pt-8 md:pt-12">
          <a href="#top" className="font-serif-italic text-base lowercase tracking-tight">
            selin karaca
          </a>
          <nav className="flex items-center gap-6 text-sm lowercase text-muted-foreground">
            <a href="#about" className="link-underline">about</a>
            <a href="#research" className="link-underline">research</a>
            <a href="#experience" className="link-underline">experience</a>
            <a href="#contact" className="link-underline">contact</a>
          </nav>
        </header>

        <div id="top" className="mx-auto max-w-3xl px-6 pb-24 pt-16 md:pt-24">
          {/* Hero */}
          <motion.section
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 items-end gap-10 md:grid-cols-[1fr_12rem]"
          >
            <div>
              <p className="font-serif-italic text-sm text-muted-foreground">
                hi, i'm —
              </p>
              <h1 className="mt-3 font-serif-display text-5xl leading-[0.95] text-foreground md:text-7xl">
                Selin <span className="font-serif-italic font-light">Karaca</span>
              </h1>
              <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-foreground/80">
                nineteen, in new york. studying computer science at{" "}
                <span className="text-foreground">Columbia</span> and researching how
                large language models come to{" "}
                <span className="font-serif-italic text-foreground">understand</span>{" "}
                anything at all. originally from <span className="text-foreground">Izmir</span>.
              </p>
            </div>

            <div className="relative hidden md:block">
              <SoftImg
                src={portrait}
                alt="Portrait of Selin Karaca"
                className="h-[260px] w-[200px]"
                duotone={false}
              />
            </div>
          </motion.section>

          {/* Mobile portrait */}
          <div className="mt-10 md:hidden">
            <SoftImg
              src={portrait}
              alt="Portrait of Selin Karaca"
              className="h-48 w-36"
              duotone={false}
            />
          </div>

          {/* About — questions i've been asking */}
          <Section id="about" label="about">
            <div className="space-y-5 text-[16px] leading-relaxed text-foreground/85">
              <p>
                I grew up in <span className="font-serif-italic">Izmir</span>, on the
                edge of the Aegean. I think it's where I learned that the
                interesting question is usually{" "}
                <span className="font-serif-italic">why</span>, not{" "}
                <span className="font-serif-italic">what</span>.
              </p>
              <p>
                I'm pursuing a B.S. in Computer Science at Columbia, with minors in
                Applied Mathematics and Entrepreneurship. Most of my time goes into
                research at the intersection of machine learning, language, and
                interpretability.
              </p>
            </div>

            <div className="mt-10">
              <h2 className="font-serif-italic text-sm text-muted-foreground">
                questions i've been asking — why
              </h2>
              <ul className="mt-4 space-y-3 font-serif-display text-xl leading-snug text-foreground md:text-2xl">
                <li>do larger models suddenly <span className="font-serif-italic">understand</span>?</li>
                <li>can we read a model's mind through its embeddings?</li>
                <li>what makes a representation feel <span className="font-serif-italic">semantic</span>?</li>
                <li>where does pattern-matching end and meaning begin?</li>
              </ul>
            </div>
          </Section>

          {/* Research — kept general */}
          <Section id="research" label="now / research">
            <div className="space-y-4 text-[16px] leading-relaxed text-foreground/85">
              <p>
                I'm a research assistant at the{" "}
                <ExtLink href="https://cris.engineering.columbia.edu/">
                  Complex Resilient Intelligent Systems (CRIS) Lab
                </ExtLink>{" "}
                at Columbia, working on a computational study of how large language
                models develop{" "}
                <span className="font-serif-italic">semantic understanding</span> as
                they scale.
              </p>
              <p>
                Across model families — Pythia, Cerebras-GPT, Qwen2.5, OpenAI — I
                study how internal representations of long-form text evolve with
                parameter count, looking for the moments where capability changes
                <span className="font-serif-italic"> in kind</span>, not just in degree.
              </p>
              <p className="text-muted-foreground">
                Also: CAIAC Technical AI Safety Fellow. TA for{" "}
                <span className="font-serif-italic">Fundamentals of Computer Systems</span>.
              </p>
            </div>
          </Section>

          {/* Experience */}
          <Section id="experience" label="experience">
            <ul className="space-y-6 text-[16px] leading-relaxed text-foreground/85">
              <li>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <span className="font-serif-display text-xl">
                    Citadel Securities
                  </span>
                  <span className="font-sans text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    Jan 2026
                  </span>
                </div>
                <p className="mt-1 font-serif-italic text-muted-foreground">
                  Women's Ignite Trading Week — simulated trading and post-mortems
                  with quantitative trader mentors.
                </p>
              </li>
              <li>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <span className="font-serif-display text-xl">Koç University</span>
                  <span className="font-sans text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    2023
                  </span>
                </div>
                <p className="mt-1 font-serif-italic text-muted-foreground">
                  Augmented Summer Research — AR/VR, signal processing, and computer
                  vision in Python and Unity.
                </p>
              </li>
              <li>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <span className="font-serif-display text-xl">
                    Istanbul University Cerrahpaşa
                  </span>
                  <span className="font-sans text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    2022 — 2023
                  </span>
                </div>
                <p className="mt-1 font-serif-italic text-muted-foreground">
                  R&amp;D on facial-imaging deep learning models for early autism
                  detection, alongside ADOS clinicians.
                </p>
              </li>
            </ul>
          </Section>

          {/* Contact */}
          <Section id="contact" label="say hi">
            <div className="space-y-4 text-[16px] leading-relaxed text-foreground/85">
              <p>
                The best way to reach me is{" "}
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

          <footer className="mt-16 flex items-center justify-between border-t border-border/60 pt-6 text-xs lowercase tracking-wider text-muted-foreground">
            <span>© {new Date().getFullYear()} selin karaca</span>
            <span className="font-serif-italic">izmir · new york</span>
          </footer>
        </div>
      </div>

      {/* Hidden imports kept so unused images stay bundled when re-introduced */}
      <div className="hidden">
        <img src={snapTreeLighting} alt="" />
        <img src={snapButler} alt="" />
        <img src={snapSnow} alt="" />
        <img src={snapMet} alt="" />
        <img src={snapDance} alt="" />
      </div>
    </main>
  );
};

export default Index;
