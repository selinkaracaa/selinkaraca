import { motion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import portrait from "@/assets/portrait.jpg";
import snapTreeLighting from "@/assets/snap-tree-lighting.jpg";
import snapButler from "@/assets/snap-butler.jpg";
import snapBeach from "@/assets/snap-beach.jpg";
import snapSnow from "@/assets/snap-snow.jpg";
import snapSkyline from "@/assets/snap-skyline.jpg";
import snapMet from "@/assets/snap-met.jpg";
import heroCenter from "@/assets/hero-center.jpg";
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
      {/* Fixed top bar overlaying hero strips */}
      <header className="fixed left-0 right-0 top-0 z-50 flex items-start justify-between px-6 pt-6 mix-blend-difference">
        <a href="#top" className="font-serif-italic text-base lowercase text-white">
          selin karaca
        </a>
        <nav className="flex flex-col items-center gap-1 text-sm lowercase text-white/90">
          <a href="#about" className="link-underline-light">about</a>
          <a href="#time" className="link-underline-light">time</a>
          <a href="#mind" className="link-underline-light">mind</a>
          <a href="#explored" className="link-underline-light">explored</a>
          <a href="#album" className="link-underline-light">album</a>
        </nav>
        <span className="font-serif-italic text-xs lowercase text-white/80">scroll</span>
      </header>

      {/* HERO — three full-width horizontal strips stacked, each ~1/3 of viewport */}
      <section id="top" className="w-full">
        <div className="h-[33vh] w-full overflow-hidden md:h-[33.33vh]">
          <img
            src={snapDance}
            alt="Behind the scenes"
            className="h-full w-full object-cover grayscale"
          />
        </div>
        <div className="h-[33vh] w-full overflow-hidden md:h-[33.33vh]">
          <img
            src={heroCenter}
            alt="At the Met"
            className="h-full w-full object-cover object-top"
          />
        </div>
        <div className="h-[33vh] w-full overflow-hidden md:h-[33.33vh]">
          <img
            src={snapSkyline}
            alt="NYC skyline"
            className="h-full w-full object-cover grayscale"
          />
        </div>
      </section>

      {/* ABOUT — portrait left, intro right */}
      <motion.section
        id="about"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto mt-32 grid max-w-5xl grid-cols-1 gap-12 px-6 md:mt-48 md:grid-cols-[minmax(260px,340px)_1fr] md:gap-16"
      >
        <div>
          <img
            src={portrait}
            alt="Portrait of Selin Karaca"
            className="aspect-[4/5] w-full object-cover"
          />
        </div>
        <div className="md:pt-4">
          <h1 className="font-serif-display text-5xl leading-[0.95] md:text-6xl">
            selin <span className="font-serif-italic font-light">karaca</span>
          </h1>
          <p className="mt-8 max-w-xl text-[17px] leading-relaxed text-foreground/85">
            nineteen in nyc! studying computer science at columbia and researching how
            language models come to understand anything at all. i think the interesting
            question is usually <span className="font-serif-italic">why</span>, not{" "}
            <span className="font-serif-italic">what</span> — which is probably why i
            keep ending up in research.
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
      </motion.section>

      {/* THREE NUMBERED SECTIONS — stacked single-column, like Justine */}
      <div className="mx-auto max-w-5xl px-6">
        <motion.section
          id="time"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-28 grid grid-cols-1 gap-10 md:grid-cols-[minmax(260px,340px)_1fr] md:gap-16"
        >
          <SectionHeading>how i spend my time</SectionHeading>
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
                dancing — latin and{" "}
                <span className="font-serif-italic">orchesis</span>, columbia's
                contemporary dance company
              </>,
              <>
                building communities at{" "}
                <span className="font-serif-italic">ADI</span>,{" "}
                <span className="font-serif-italic">Women in Computer Science</span>,{" "}
                <span className="font-serif-italic">Girls Who Code</span>, and the{" "}
                <span className="font-serif-italic">Columbia Turkish Students Association</span>
              </>,
              <>
                TA-ing{" "}
                <span className="font-serif-italic">Fundamentals of Computer Systems</span>{" "}
                and serving as a CAIAC Technical AI Safety Fellow
              </>,
            ]}
          />
        </motion.section>

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

        <motion.section
          id="create"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-28 grid grid-cols-1 gap-10 md:grid-cols-[minmax(260px,340px)_1fr] md:gap-16"
        >
          <SectionHeading>what i like to create</SectionHeading>
          <NumberedList
            items={[
              <>
                a <ExtLink href="#">podcast</ExtLink> about the people behind the
                research, the startups, and the ideas i can't stop thinking about
              </>,
              <>
                <ExtLink href="#">dance films</ExtLink> — small documentations of
                rehearsals, performances, and the in-between moments
              </>,
              <>
                <ExtLink href="https://www.instagram.com/selinkaraca/">drawings on instagram</ExtLink>{" "}
                — usually portraits, usually at 2am
              </>,
            ]}
          />
        </motion.section>
      </div>

      {/* ALBUM — full-width image grid at the very bottom */}
      <section id="album" className="mt-32 w-full">
        <div className="grid grid-cols-2 gap-1 md:grid-cols-3">
          {[snapSunset, snapBeach, snapSnow, snapTreeLighting, snapButler, snapDance, snapMet, snapSkyline, portrait].map(
            (src, i) => (
              <motion.img
                key={i}
                src={src}
                alt=""
                loading="lazy"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: (i % 3) * 0.05 }}
                className="aspect-[4/5] w-full object-cover"
              />
            )
          )}
        </div>
      </section>

      <footer className="mx-auto mt-16 flex max-w-5xl items-center justify-between border-t border-border px-6 py-6 text-xs lowercase tracking-wider text-muted-foreground">
        <span>© {new Date().getFullYear()} selin karaca</span>
        <span className="font-serif-italic">new york</span>
      </footer>
    </main>
  );
};

export default Index;
