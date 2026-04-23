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

const NumberedList = ({ items }: { items: React.ReactNode[] }) => (
  <ol className="space-y-6">
    {items.map((item, i) => (
      <li key={i} className="grid grid-cols-[2.25rem_1fr] gap-3">
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

const Photo = ({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) => (
  <motion.img
    src={src}
    alt={alt}
    loading="lazy"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    className={`w-full object-cover ${className}`}
  />
);

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Top nav */}
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 pt-8">
        <a href="#top" className="font-serif-italic text-base lowercase">
          selin karaca
        </a>
        <nav className="flex items-center gap-5 text-sm lowercase text-muted-foreground">
          <a href="#about" className="link-underline">about</a>
          <a href="#album" className="link-underline">album</a>
        </nav>
      </header>

      {/* Hero name */}
      <motion.section
        id="top"
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-7xl px-6 pt-16 md:pt-24"
      >
        <h1 className="font-serif-display text-6xl leading-[0.95] md:text-8xl">
          selin <span className="font-serif-italic font-light">karaca</span>
        </h1>
      </motion.section>

      {/* Three landscape images filling screen */}
      <section className="mx-auto mt-12 grid max-w-7xl grid-cols-1 gap-3 px-6 md:mt-16 md:grid-cols-3">
        <Photo src={snapSkyline} alt="NYC skyline" className="aspect-[4/3] md:aspect-[3/4] md:h-[70vh]" />
        <Photo src={snapDance} alt="Dance" className="aspect-[4/3] md:aspect-[3/4] md:h-[70vh]" />
        <Photo src={snapSunset} alt="Sunset" className="aspect-[4/3] md:aspect-[3/4] md:h-[70vh]" />
      </section>

      {/* About: portrait + bio left, sections right */}
      <section
        id="about"
        className="mx-auto mt-24 grid max-w-7xl grid-cols-1 gap-12 px-6 md:mt-32 md:grid-cols-[minmax(280px,360px)_1fr] md:gap-16"
      >
        {/* Left: portrait + bio */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="md:sticky md:top-12 md:self-start"
        >
          <Photo src={portrait} alt="Portrait of Selin Karaca" className="aspect-[4/5]" />
          <p className="mt-6 text-[15px] leading-relaxed text-foreground/85">
            nineteen in nyc! studying computer science at columbia and researching how
            language models come to understand anything at all. i think the interesting
            question is usually <span className="font-serif-italic">why</span>, not{" "}
            <span className="font-serif-italic">what</span> — which is probably why i
            keep ending up in research.
          </p>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-[14px] text-foreground/85">
            <ExtLink href="mailto:sk5103@columbia.edu">email</ExtLink>
            <ExtLink href="https://www.linkedin.com/in/selinkaraca/">linkedin</ExtLink>
            <ExtLink href="https://www.instagram.com/selinkaraca/">instagram</ExtLink>
          </div>
        </motion.div>

        {/* Right: three sections */}
        <div className="space-y-16 md:space-y-20">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            <SectionHeading id="time">how i spend my time</SectionHeading>
            <div className="mt-6">
              <NumberedList
                items={[
                  <>
                    research at the{" "}
                    <ExtLink href="https://cris.engineering.columbia.edu/">CRIS Lab</ExtLink>{" "}
                    on how large language models develop{" "}
                    <span className="font-serif-italic">semantic understanding</span> as
                    they scale across model families
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
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            <SectionHeading id="mind">what's been on my mind</SectionHeading>
            <div className="mt-6">
              <NumberedList
                items={[
                  <>
                    where pattern-matching ends and{" "}
                    <span className="font-serif-italic">understanding</span> begins in
                    large language models
                  </>,
                  <>
                    which labs and companies are pushing the frontier of AI in an{" "}
                    <span className="font-serif-italic">ethical, safe, and impact-driven</span>{" "}
                    way
                  </>,
                  <>
                    how to find people who love building things — products, communities,
                    art — as much as i do
                  </>,
                  <>
                    how to make a real dent in this world through{" "}
                    <span className="font-serif-italic">mission-driven</span> research,
                    startups, and investment
                  </>,
                ]}
              />
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            <SectionHeading id="explored">what i've explored</SectionHeading>
            <div className="mt-6">
              <NumberedList
                items={[
                  <>
                    a week inside <span className="font-serif-italic">Citadel Securities</span>'
                    Women's Ignite program — running live trading simulations and
                    breaking down every decision afterward with quant traders
                  </>,
                  <>
                    building an AR/VR{" "}
                    <span className="font-serif-italic">breathing-regulation game</span>{" "}
                    at Koç University, blending sensor fusion, computer vision, and a
                    little bit of mindfulness
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
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            <SectionHeading id="create">what i like to create</SectionHeading>
            <div className="mt-6">
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
                    <ExtLink href="https://www.instagram.com/selinkaraca/">
                      drawings on instagram
                    </ExtLink>{" "}
                    — usually portraits, usually at 2am
                  </>,
                ]}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Album at bottom */}
      <section id="album" className="mx-auto mt-32 max-w-7xl px-6">
        <SectionHeading>album</SectionHeading>
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3">
          <Photo src={snapMet} alt="Met museum" className="aspect-[3/4]" />
          <Photo src={snapBeach} alt="Beach" className="aspect-[3/4]" />
          <Photo src={snapSnow} alt="Snow" className="aspect-[3/4]" />
          <Photo src={snapTreeLighting} alt="Tree lighting" className="aspect-[3/4]" />
          <Photo src={snapButler} alt="Butler library" className="aspect-[3/4]" />
          <Photo src={snapSunset} alt="Sunset" className="aspect-[3/4]" />
        </div>
      </section>

      <footer className="mx-auto mt-24 flex max-w-7xl items-center justify-between border-t border-border px-6 py-6 text-xs lowercase tracking-wider text-muted-foreground">
        <span>© {new Date().getFullYear()} selin karaca</span>
        <span className="font-serif-italic">new york</span>
      </footer>
    </main>
  );
};

export default Index;
