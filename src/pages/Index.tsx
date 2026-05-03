import { motion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import portrait from "@/assets/portrait.jpg";
import heroTL from "@/assets/hero-tl.jpg";
import heroTR from "@/assets/hero-tr.jpg";
import heroBL from "@/assets/hero-bl.jpg";
import heroBR from "@/assets/hero-br.jpg";
import sideCitadel from "@/assets/side-citadel.jpg";
import sideLights from "@/assets/side-lights.jpg";
import sideArchitecture from "@/assets/side-architecture.jpg";
import sidePainting from "@/assets/side-painting.jpg";
import sideSunsetBeach from "@/assets/side-sunset-beach.jpg";
import sideFountain from "@/assets/side-fountain.jpg";
import sideSkyline from "@/assets/side-skyline.jpg";
import sideMet from "@/assets/side-met.jpg";
import sideSunsetCity from "@/assets/side-sunset-city.jpg";
import sideWillow from "@/assets/side-willow.jpg";

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

const NumberedList = ({ items }: { items: React.ReactNode[] }) => (
  <ol className="space-y-6">
    {items.map((item, i) => (
      <li key={i} className="grid grid-cols-[2.5rem_1fr] gap-4">
        <span className="font-serif-italic text-sm text-muted-foreground pt-1">
          {String(i + 1).padStart(2, "0")}
        </span>
        <p className="text-[15px] leading-relaxed text-foreground/85">{item}</p>
      </li>
    ))}
  </ol>
);

const SectionHeading = ({ children, id }: { children: React.ReactNode; id?: string }) => (
  <h2 id={id} className="font-serif-italic text-2xl text-foreground md:text-3xl">
    {children}
  </h2>
);

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Fixed top bar overlaying hero */}
      <header className="fixed left-0 right-0 top-0 z-50 flex items-start justify-between px-6 pt-6 mix-blend-difference">
        <a href="#top" className="font-serif-italic text-base text-white">
          Selin Karaca
        </a>
        <nav className="flex flex-col items-center gap-1 text-sm lowercase text-white/90">
          <a href="#about" className="link-underline-light">about</a>
          <a href="#research" className="link-underline-light">research</a>
          <a href="#explored" className="link-underline-light">experience</a>
        </nav>
        <span aria-hidden />
      </header>

      {/* HERO — clean 2x2 grid */}
      <section id="top" className="w-full">
        <div className="grid h-screen w-full grid-cols-2 grid-rows-2 gap-0">
          <div className="overflow-hidden">
            <img src={heroTL} alt="On the steps" className="h-full w-full object-cover" />
          </div>
          <div className="overflow-hidden">
            <img src={heroTR} alt="Columbia at sunset" className="h-full w-full object-cover" />
          </div>
          <div className="overflow-hidden">
            <img src={heroBL} alt="Orchesis on stage" className="h-full w-full object-cover" />
          </div>
          <div className="overflow-hidden">
            <img src={heroBR} alt="In the library" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      {/* CONTENT WRAPPER — left/middle content with one continuous right photo strip */}
      <div className="md:grid md:grid-cols-[1fr_180px]">
        {/* LEFT/MIDDLE COLUMN — all sections stacked */}
        <div>
          {/* ABOUT + TIME */}
          <motion.section
            id="about"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid scroll-mt-20 grid-cols-1 gap-10 px-6 pt-16 md:grid-cols-[minmax(220px,300px)_1fr] md:gap-12 md:pt-12"
          >
            {/* LEFT: about */}
            <div className="flex flex-col md:pl-4">
              <img
                src={portrait}
                alt="Portrait of Selin Karaca"
                className="aspect-[4/5] w-full max-w-[200px] object-cover"
              />
              <h1 className="mt-5 font-serif-display text-3xl leading-[0.95] md:text-4xl">
                Selin <span className="font-serif-italic font-light">Karaca</span>
              </h1>
              <p className="mt-5 max-w-[280px] text-[16px] leading-relaxed text-foreground/85">
                hi, i'm Selin! i live in NYC and study computer science at Columbia Engineering with minors in <span className="font-serif-italic">applied math</span> and <span className="font-serif-italic">entrepreneurship & innovation</span>. I'm excited to meet people who love building things: products, tech, communities, art<br />so don't hesitate to reach out!!
              </p>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-[14px] text-foreground/85">
                <ExtLink href="mailto:sk5103@columbia.edu">sk5103@columbia.edu</ExtLink>
                <ExtLink href="https://www.linkedin.com/in/selinkaraca/">linkedin</ExtLink>
              </div>
            </div>

            {/* MIDDLE: things i like spending my time on */}
            <div id="time">
              <SectionHeading>what i'm pursuing</SectionHeading>
              <div className="mt-6">
                <NumberedList
                  items={[
                    <>
                      research at the{" "}
                      <ExtLink href="https://cris.cheme.columbia.edu/">CRIS Lab</ExtLink>{" "}
                      on how large language models develop{" "}
                      <span className="font-serif-italic">semantic understanding</span> as they
                      scale across model families, and at the{" "}
                      <ExtLink href="https://www.cs.columbia.edu/~ansaf/praise/index.html">PRAISE Lab</ExtLink>{" "}
                      on{" "}
                      <span className="font-serif-italic">automatic symbolic law discovery</span>{" "}
                      using computer vision to recover scientific equations from data
                    </>,
                    <>
                      building communities at <span className="font-serif-italic">ADI</span>,{" "}
                      <span className="font-serif-italic">Women in Computer Science</span>,{" "}
                      <span className="font-serif-italic">Girls Who Code</span>, and the{" "}
                      <span className="font-serif-italic">Columbia Turkish Students Association</span>
                    </>,
                    <>
                      creating collaborative spaces for learning and teaching as a Teaching assistant for Fundamentals of Computer Systems, Discrete Mathematics and CAIAC Technical AI Safety Fellow
                    </>,
                    <>
                      <ExtLink href="https://www.youtube.com/@selinkaracaaa">dancing latin & ballroom</ExtLink> and choreographing for{" "}
                      <ExtLink href="https://www.youtube.com/watch?v=ZvNva2_8x-I"><span className="font-serif-italic">Columbia Orchesis</span></ExtLink>
                    </>,
                    <>
                      making podcasts
                      {"\n"} especially on women in tech with diverse and inspiring groups:{" "}
                      <ExtLink href="https://open.spotify.com/show/0Z2mQG5grq8SU8f4G2u8fe?si=d43780fcdb734602">Reign Of Chains</ExtLink>{" "}
                      and{" "}
                      <ExtLink href="https://open.spotify.com/show/5tZbbhiqsr3acOScglDnfq?si=bc1ec5ecf8764d02">the WiCS Network</ExtLink>
                    </>,
                    <>
                      finding ways to make a real dent in this world through{" "}
                      <span className="font-serif-italic">mission-driven</span> research,
                      startups, and investment
                    </>,
                  ]}
                />
              </div>
            </div>
          </motion.section>

          {/* RESEARCH */}
          <motion.section
            id="research"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="mt-24 grid scroll-mt-20 grid-cols-1 gap-10 px-6 pt-4 md:grid-cols-[minmax(220px,300px)_1fr] md:gap-12"
          >
            <SectionHeading>research</SectionHeading>
            <div className="space-y-12">
              {/* CRIS Lab */}
              <div className="space-y-5">
                <h3 className="font-serif-italic text-xl text-foreground">
                  CRIS Lab — semantic understanding in LLMs
                </h3>
                <p className="text-[16px] leading-relaxed text-foreground/85">
                  I'm a researcher at the{" "}
                  <ExtLink href="https://cris.cheme.columbia.edu/">
                    Complex Resilience Intelligence Systems Lab
                  </ExtLink>{" "}
                  at Columbia, where i study how large language models move from
                  surface-level pattern-matching toward something closer to{" "}
                  <span className="font-serif-italic">semantic understanding</span>.
                </p>
                <p className="text-[16px] leading-relaxed text-foreground/85">
                  My current project probes how this capacity emerges{" "}
                  <span className="font-serif-italic">across scale</span>, comparing model
                  families (OpenAI, Qwen, Pythia, Cerebras) at different parameter counts
                  using representational-similarity analysis, probing classifiers, and
                  targeted behavioral tests on compositional and counterfactual reasoning.
                </p>
                <p className="text-[16px] leading-relaxed text-foreground/85">
                  The goal isn't just better benchmarks, it's a clearer answer to{" "}
                  <span className="font-serif-italic">when</span> a model stops mimicking
                  meaning and starts representing it, which matters a lot for how we
                  evaluate and trust these systems.
                </p>
                <div className="flex flex-wrap gap-x-6 gap-y-2 pt-1 text-[16px] text-foreground/85">
                  <ExtLink href="#">read the report (pdf)</ExtLink>
                  <ExtLink href="https://github.com/CRIS-Lab-2025">github repo</ExtLink>
                </div>
              </div>

              {/* PRAISE Lab */}
              <div className="space-y-5">
                <h3 className="font-serif-italic text-xl text-foreground">
                  PRAISE Lab — symbolic law discovery with computer vision
                </h3>
                <p className="text-[16px] leading-relaxed text-foreground/85">
                  I've recently joined the{" "}
                  <ExtLink href="https://www.cs.columbia.edu/~ansaf/praise/index.html">
                    Practice and Research in Artificial Intelligence for Science and
                    Education
                  </ExtLink>{" "}
                  at Columbia, working on{" "}
                  <ExtLink href="https://www.cs.columbia.edu/~ansaf/praise/project-law.html">
                    <span className="font-serif-italic">
                      Automatic Symbolic Law Discovery
                    </span>
                  </ExtLink>
                  .
                </p>
                <p className="text-[16px] leading-relaxed text-foreground/85">
                  The novelty of the approach lies in (1) encoding the input data as an{" "}
                  <span className="font-serif-italic">image</span> with super-resolution,
                  (2) developing an appropriate deep network pipeline, and (3) predicting
                  the importance of each mathematical operator from the relationship image.
                </p>
                <p className="text-[16px] leading-relaxed text-foreground/85">
                  What I find compelling is the reframing of discovery as a{" "}
                  <span className="font-serif-italic">visual</span> problem, treating an
                  equation as a shape the model can learn to recognize before it ever
                  writes it down.
                </p>
              </div>
            </div>
          </motion.section>

          {/* EXPLORED */}
          <motion.section
            id="explored"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="mt-24 grid scroll-mt-20 grid-cols-1 gap-10 px-6 pb-16 pt-4 md:grid-cols-[minmax(220px,300px)_1fr] md:gap-12"
          >
            <SectionHeading>experiences along the way</SectionHeading>
            <NumberedList
              items={[
                <>
                  a week inside <span className="font-serif-italic">Citadel Securities</span>'
                  Women's Ignite program, running live trading simulations and breaking
                  down every decision afterward with quant traders
                </>,
                <>
                  a week at <span className="font-serif-italic">Microsoft</span> through
                  their <span className="font-serif-italic">Girls in AI</span> program,
                  working on sustainability solutions with Azure image recognition
                  alongside people sharing different visions of what AI could become
                </>,
                <>
                  building an AR/VR{" "}
                  <span className="font-serif-italic">breathing-regulation game</span> at
                  Koç University, blending sensor fusion, computer vision, and a little bit
                  of mindfulness
                </>,
                <>
                  deep learning models for{" "}
                  <span className="font-serif-italic">early autism diagnosis</span>{" "}
                  alongside ADOS clinicians at Istanbul University Cerrahpaşa
                </>,
                <>
                  software engineering and product management at{" "}
                  <span className="font-serif-italic">Efilli</span>, a cookie consent platform
                  startup, where I designed websites (and delicious little cookies) on Figma
                </>,
              ]}
            />
          </motion.section>
        </div>

        {/* RIGHT: one continuous photo strip from below hero to footer */}
        <aside className="hidden md:flex flex-col gap-1 pt-1">
          <img src={sideLights} alt="" className="flex-1 min-h-0 w-full object-cover" />
          <img src={sideWillow} alt="" className="flex-1 min-h-0 w-full object-cover" />
          <img src={sideArchitecture} alt="" className="flex-1 min-h-0 w-full object-cover" />
          <img src={sideFountain} alt="" className="flex-1 min-h-0 w-full object-cover" />
          <img src={sideSunsetBeach} alt="" className="flex-1 min-h-0 w-full object-cover" />
          <img src={sidePainting} alt="" className="flex-1 min-h-0 w-full object-cover" />
          <img src={sideCitadel} alt="" className="flex-1 min-h-0 w-full object-cover" />
          <img src={sideSkyline} alt="" className="flex-1 min-h-0 w-full object-cover" />
          <img src={sideMet} alt="" className="flex-1 min-h-0 w-full object-cover" />
          <img src={sideSunsetCity} alt="" className="flex-1 min-h-0 w-full object-cover" />
        </aside>
      </div>

      <footer className="mx-auto mt-16 flex max-w-5xl items-center justify-between border-t border-border px-6 py-6 text-xs lowercase tracking-wider text-muted-foreground">
        <span>© {new Date().getFullYear()} Selin Karaca</span>
        <span className="font-serif-italic">new york</span>
      </footer>
    </main>
  );
};

export default Index;
