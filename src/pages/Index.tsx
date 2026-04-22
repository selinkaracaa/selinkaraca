import { motion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import portrait from "@/assets/portrait-placeholder.jpg";

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

const Work = ({
  title,
  org,
  when,
  children,
  href,
}: {
  title: string;
  org: string;
  when: string;
  href?: string;
  children?: React.ReactNode;
}) => (
  <div className="group py-5 first:pt-0">
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
      <h3 className="font-serif-display text-xl text-foreground md:text-2xl">
        {href ? (
          <a href={href} target="_blank" rel="noreferrer noopener" className="link-underline">
            {title}
          </a>
        ) : (
          title
        )}
        <span className="font-serif-italic text-muted-foreground"> — {org}</span>
      </h3>
      <span className="font-sans text-xs uppercase tracking-[0.18em] text-muted-foreground">
        {when}
      </span>
    </div>
    {children && (
      <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{children}</p>
    )}
  </div>
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
          <a href="#work" className="link-underline">work</a>
          <a href="#contact" className="link-underline">contact</a>
        </nav>
      </header>

      <div id="top" className="mx-auto max-w-3xl px-6 pb-24 pt-16 md:pt-24">
        {/* Hero */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 items-end gap-10 md:grid-cols-[1fr_10rem]"
        >
          <div>
            <p className="font-serif-italic text-sm text-muted-foreground">
              hi, i'm —
            </p>
            <h1 className="mt-3 font-serif-display text-5xl leading-[0.95] text-foreground md:text-7xl">
              Selin <span className="font-serif-italic font-light">Karaca</span>
            </h1>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-muted-foreground">
              CS undergrad at <span className="text-foreground">Columbia</span>, researching{" "}
              <span className="font-serif-italic text-foreground">mechanistic
              interpretability</span> of large language models. Istanbul → New York.
            </p>
          </div>

          <div className="hidden md:block">
            <img
              src={portrait}
              alt="Portrait of Selin Karaca"
              width={160}
              height={200}
              className="h-[200px] w-[160px] rounded-sm object-cover grayscale-[20%]"
            />
          </div>
        </motion.section>

        {/* About */}
        <Section id="about" label="about">
          <div className="space-y-4 text-[16px] leading-relaxed text-foreground/90">
            <p>
              I'm a Named Scholar at Columbia Engineering studying computer science
              with minors in applied math and entrepreneurship. I care about making the
              internals of modern AI systems <span className="font-serif-italic">legible</span> —
              not just as black boxes that work, but as objects we can understand.
            </p>
            <p>
              Before Columbia I grew up in Istanbul, where I spent summers in research
              labs working on autism diagnosis with deep learning, AR/VR systems, and
              semi-supervised methods on small datasets. The throughline has always been:
              what does the model actually <span className="font-serif-italic">know</span>?
            </p>
          </div>
        </Section>

        {/* Research */}
        <Section id="research" label="now / research">
          <div className="space-y-4 text-[16px] leading-relaxed text-foreground/90">
            <p>
              I'm an undergraduate research assistant at the{" "}
              <ExtLink href="https://cris.engineering.columbia.edu/">
                Complex Resilient Intelligent Systems (CRIS) Lab
              </ExtLink>{" "}
              at Columbia, working on mechanistic interpretability of transformer LLMs
              with <span className="font-serif-italic">sparse autoencoders</span> and
              probing methods.
            </p>
            <p>
              I'm building an end-to-end SAE training and analysis pipeline to study how
              interpretable features scale across model sizes — and where “phase-change”
              behavior emerges across layers. Currently reproducing baselines and pushing
              experiments onto larger models on GPU clusters.
            </p>
            <p className="text-muted-foreground">
              Also: CAIAC Technical AI Safety Fellow. TA for{" "}
              <span className="font-serif-italic">Fundamentals of Computer Systems</span>.
            </p>
          </div>
        </Section>

        {/* Selected work */}
        <Section id="work" label="selected work">
          <div className="divide-y divide-border/70">
            <Work
              title="CRIS Lab"
              org="Columbia University"
              when="2026 —"
            >
              Mechanistic interpretability research on transformer LLMs using sparse
              autoencoders and probing. Scaling experiments on GPU clusters.
            </Work>
            <Work
              title="Women's Ignite Trading Week"
              org="Citadel Securities"
              when="Jan 2026"
            >
              Simulation-based trade analysis under uncertainty — hypotheses, sizing,
              downside controls. Post-mortems with trader mentors.
            </Work>
            <Work
              title="Coding for Data, w/ Intel"
              org="Global Career Accelerator"
              when="Summer 2025"
            >
              Sustainability analytics project with Intel — environmental KPIs and
              corporate responsibility, in SQL.
            </Work>
            <Work
              title="Software & Product Design Intern"
              org="Cool Digital"
              when="Summer 2025"
            >
              Built cookie-banner UIs and frontend features in Vue and React for the
              Efilli startup. Figma prototyping; auth/routing debugging.
            </Work>
            <Work
              title="Augmented Summer Research"
              org="Koç University"
              when="2023"
            >
              AR/VR, sensors and signal processing, image processing, object detection
              — Python and Unity.
            </Work>
            <Work
              title="DL for Autism Diagnosis"
              org="Istanbul University Cerrahpaşa"
              when="2022 — 2023"
            >
              R&amp;D on facial-imaging algorithms for early autism detection in Turkey,
              integrating deep learning with ADOS and SPSS analysis.
            </Work>
          </div>
        </Section>

        {/* Elsewhere */}
        <Section id="contact" label="elsewhere">
          <div className="space-y-4 text-[16px] leading-relaxed text-foreground/90">
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

        <footer className="mt-16 flex items-center justify-between border-t border-border/70 pt-6 text-xs lowercase tracking-wider text-muted-foreground">
          <span>© {new Date().getFullYear()} selin karaca</span>
          <span className="font-serif-italic">new york</span>
        </footer>
      </div>
    </main>
  );
};

export default Index;
