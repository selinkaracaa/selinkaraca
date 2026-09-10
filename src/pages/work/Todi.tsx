import ArticleLayout, { ExtLink, H, P, Pull } from "@/components/ArticleLayout";
import Figure from "@/components/Figure";
import Photo from "@/components/Photo";
import { TodiLoop } from "@/components/Diagrams";

const Todi = () => (
  <ArticleLayout
    kicker="work · todi"
    title={
      <>
        A learning platform that reshapes itself around{" "}
        <span className="font-serif-italic font-light">each child</span>
      </>
    }
    meta="todi · developer · family education company · live, paid, 2,000+ students"
    tools={["react", "node", "express", "rest api", "accessibility", "adaptive learning"]}
    links={<ExtLink href="https://todi.com.tr/">todi.com.tr</ExtLink>}
  >
    <P>
      Most educational software assumes every child arrives with the same cognitive profile and
      walks them through the same sequence at the same pace. For a child with dyslexia, that
      assumption isn't merely unhelpful — it's the reason the software fails them. A reading
      exercise calibrated to a median eight-year-old will be simultaneously too hard in decoding
      and too easy in comprehension, and the child learns mostly that they are bad at this.
    </P>

    <Pull>
      The design premise: assess where a child's reading, memory, attention and reasoning actually
      sit, then build the program around that — not around a grade level.
    </Pull>

    <H>what it does</H>
    <P>
      Todi covers eight cognitive modules — reading, visual perception, working memory, pattern
      recognition, reasoning, attention, verbal skills, and mathematics — with more than 10,000
      exercises behind them. A child aged five to fifteen starts with an assessment, and the
      program that follows is assembled from their actual profile rather than their age. Progress
      is reported back to families in real time, which matters more than it sounds: parents of
      children with learning differences are usually flying blind between one specialist
      appointment and the next.
    </P>
    <P>
      The multisensory material — visually and audibly enriched — is the part that took the longest
      to get right, and it's where accessibility stops being a checklist and starts being the
      product.
    </P>

    <Figure caption="The loop the product is built around. The assessment isn't a one-time placement test — it runs continuously, so the program keeps reshaping itself as the child changes.">
      <TodiLoop />
    </Figure>

    <H>my part in it</H>
    <P>
      This is my family's company, and i want to be exact about my role: i'm not a founder of it. I
      built most of the software. The React front end, the Express API and the data model behind
      it, and the accessibility work throughout — contrast, focus order, keyboard paths, audio
      alternatives, the things that decide whether a child with a reading difficulty can actually
      operate the interface that's meant to help them.
    </P>
    <P>
      It is also the first codebase i've worked on where the users were not people like me, could
      not be asked to try again, and would simply stop using it if a flow confused them. That is a
      very different discipline from a class project, and most of what i know about building
      software i learned from it.
    </P>

    <Figure caption="The product itself: the landing experience families arrive at, and the eight cognitive modules a child's program is assembled from.">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <Photo
          name="todi-hero"
          alt="The Todi home screen"
          sizes="(max-width:768px) 100vw, 50vw"
          className="w-full border border-border"
        />
        <Photo
          name="todi-modules"
          alt="Todi's eight cognitive modules"
          sizes="(max-width:768px) 100vw, 50vw"
          className="w-full border border-border"
        />
      </div>
    </Figure>

    <H>what it taught me</H>
    <P>
      Two things carried over into everything since. The first is that personalization is a data
      problem long before it's a UI problem — if the assessment doesn't measure the right things,
      no amount of adaptive logic downstream will save it. The second is that shipping to real
      users changes which bugs matter. A rendering glitch nobody hits is not a bug; a confusing
      empty state on day one is a catastrophe.
    </P>
  </ArticleLayout>
);

export default Todi;
