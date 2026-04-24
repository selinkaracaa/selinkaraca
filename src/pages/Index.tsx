import { motion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import portrait from "@/assets/portrait.jpg";
import heroTL from "@/assets/hero-tl.jpg";
import heroTR from "@/assets/hero-tr.jpg";
import heroBL from "@/assets/hero-bl.jpg";
import heroBR from "@/assets/hero-br.jpg";

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
  <ol className="space-y-8">
    {items.map((item, i) => (
      <li key={i} className="grid grid-cols-[2.5rem_1fr] gap-4">
        <span className="font-serif-italic text-base text-muted-foreground pt-1">
          {String(i + 1).padStart(2, "0")}
        </span>
        <p className="text-[17px] leading-relaxed text-foreground/85">{item}</p>
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
        <a href="#top" className="font-serif-italic text-base lowercase text-white">
          selin karaca
        </a>
        <nav className="flex flex-col items-center gap-1 text-sm lowercase text-white/90">
          <a href="#about" className="link-underline-light">about</a>
          <a href="#research" className="link-underline-light">research</a>
          <a href="#mind" className="link-underline-light">mind</a>
        </nav>
        <span className="font-serif-italic text-xs lowercase text-white/80">scroll</span>
      </header>

      {/* HERO — clean 2x2 grid matching the mockup */}
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

      {/* ABOUT + TIME — two-column side-by-side */}
      <motion.section
        id="about"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto mt-32 grid max-w-6xl grid-cols-1 gap-12 px-6 md:mt-48 md:grid-cols-2 md:gap-16"
      >
        {/* LEFT: about */}
        <div className="flex flex-col">
          <img
            src={portrait}
            alt="Portrait of Selin Karaca"
            className="aspect-[4/5] w-full max-w-[340px] object-cover"
          />
          <h1 className="mt-8 font-serif-display text-5xl leading-[0.95] md:text-6xl">
            selin <span className="font-serif-italic font-light">karaca</span>
          </h1>
          <p className="mt-8 max-w-xl text-[17px] leading-relaxed text-foreground/85">
            hi, i'm selin! i live in nyc and study computer science at columbia with
            minors in <span className="font-serif-italic">applied math</span> and{" "}
            <span className="font-serif-italic">entrepreneurship & innovation</span>.
            i'm excited to meet people who love building things — products, tech,
            communities, art — so don't hesitate to reach out.
          </p>
          <p className="mt-6 text-[15px] text-muted-foreground">
            <ExtLink href="mailto:sk5103@columbia.edu">sk5103@columbia.edu</ExtLink>
          </p>

          <div className="mt-12">
            <SectionHeading>find me elsewhere</SectionHeading>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[17px] text-foreground/85">
              <ExtLink href="https://www.linkedin.com/in/selinkaraca/">linkedin</ExtLink>
              <ExtLink href="https://www.instagram.com/selinkaraca/">instagram</ExtLink>
              <ExtLink href="https://cris.engineering.columbia.edu/">cris lab</ExtLink>
            </div>
          </div>
        </div>

        {/* RIGHT: things i like spending my time on */}
        <div id="time" className="md:pt-[calc(340px*1.25+2rem)]">
          <SectionHeading>things i like spending my time on</SectionHeading>
          <div className="mt-8">
            <NumberedList
              items={[
                <>
                  research at the{" "}
                  <ExtLink href="https://cris.engineering.columbia.edu/">CRIS Lab</ExtLink>{" "}
                  on how large language models develop{" "}
                  <span className="font-serif-italic">semantic understanding</span> as they
                  scale across model families
                </>,
                <>
                  building communities at <span className="font-serif-italic">ADI</span>,{" "}
                  <span className="font-serif-italic">Women in Computer Science</span>,{" "}
                  <span className="font-serif-italic">Girls Who Code</span>, and the{" "}
                  <span className="font-serif-italic">Columbia Turkish Students Association</span>
                </>,
                <>
                  TA-ing{" "}
                  <span className="font-serif-italic">Fundamentals of Computer Systems</span>{" "}
                  and serving as a CAIAC Technical AI Safety Fellow
                </>,
                <>
                  dancing — latin & ballroom and choreographing for{" "}
                  <span className="font-serif-italic">orchesis</span>, columbia's largest
                  performance club
                </>,
                <>
                  creating <ExtLink href="#">podcasts</ExtLink> especially around women in
                  tech
                </>,
              ]}
            />
          </div>
        </div>
      </motion.section>

      <div className="mx-auto max-w-5xl px-6">

        {/* RESEARCH — new section */}
        <motion.section
          id="research"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-28 grid grid-cols-1 gap-10 md:grid-cols-[minmax(260px,340px)_1fr] md:gap-16"
        >
          <SectionHeading>research</SectionHeading>
          <div className="space-y-6">
            <p className="text-[17px] leading-relaxed text-foreground/85">
              i think the interesting question is usually{" "}
              <span className="font-serif-italic">why</span>, not{" "}
              <span className="font-serif-italic">what</span> — which is why i keep
              ending up in research.
            </p>
            <p className="text-[17px] leading-relaxed text-foreground/85">
              currently at the{" "}
              <ExtLink href="https://cris.engineering.columbia.edu/">
                Complex Resilience Intelligence Systems Lab
              </ExtLink>{" "}
              at columbia, asking where pattern-matching ends and{" "}
              <span className="font-serif-italic">understanding</span> begins in large
              language models.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-[17px] text-foreground/85">
              <ExtLink href="#">read the report (pdf)</ExtLink>
              <ExtLink href="https://cris.engineering.columbia.edu/">cris lab</ExtLink>
              <ExtLink href="#">github repo</ExtLink>
            </div>
          </div>
        </motion.section>

        {/* MIND */}
        <motion.section
          id="mind"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-28 grid grid-cols-1 gap-10 md:grid-cols-[minmax(260px,340px)_1fr] md:gap-16"
        >
          <SectionHeading>what's been on my mind</SectionHeading>
          <NumberedList
            items={[
              <>
                where pattern-matching ends and{" "}
                <span className="font-serif-italic">understanding</span> begins in large
                language models
              </>,
              <>
                which labs and companies are pushing the frontier of AI in an{" "}
                <span className="font-serif-italic">ethical, safe, and impact-driven</span>{" "}
                way
              </>,
              <>
                how to find people who love building things — products, communities, art —
                as much as i do
              </>,
              <>
                how to make a real dent in this world through{" "}
                <span className="font-serif-italic">mission-driven</span> research,
                startups, and investment
              </>,
            ]}
          />
        </motion.section>

        {/* EXPLORED */}
        <motion.section
          id="explored"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-28 grid grid-cols-1 gap-10 md:grid-cols-[minmax(260px,340px)_1fr] md:gap-16"
        >
          <SectionHeading>what i've explored</SectionHeading>
          <NumberedList
            items={[
              <>
                a week inside <span className="font-serif-italic">Citadel Securities</span>'
                Women's Ignite program — running live trading simulations and breaking
                down every decision afterward with quant traders
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
                product management at{" "}
                <span className="font-serif-italic">Efilli</span>, a sustainability
                software startup — turning messy user feedback into something a team
                could actually ship
              </>,
            ]}
          />
        </motion.section>
      </div>

      <footer className="mx-auto mt-16 flex max-w-5xl items-center justify-between border-t border-border px-6 py-6 text-xs lowercase tracking-wider text-muted-foreground">
        <span>© {new Date().getFullYear()} selin karaca</span>
        <span className="font-serif-italic">new york</span>
      </footer>
    </main>
  );
};

export default Index;
