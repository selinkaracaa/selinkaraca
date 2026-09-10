import ProjectLayout, { H, P } from "@/components/ProjectLayout";
import Figure from "@/components/Figure";
import Photo from "@/components/Photo";
import { bySlug } from "@/data/projects";

const Todi = () => (
  <ProjectLayout
    project={bySlug("/work/todi")!}
    highlights={[
      { value: "8", label: "cognitive modules" },
      { value: "10,000+", label: "exercises" },
      { value: "5–15", label: "age range" },
    ]}
    lead={
      <>
        Most educational software assumes every child arrives with the same cognitive profile. For a
        child with dyslexia, that assumption isn't merely unhelpful — it's the reason the software
        fails them.
      </>
    }
  >
    <P>
      A reading exercise calibrated to a median eight-year-old is simultaneously too hard in
      decoding and too easy in comprehension, and the child mostly learns that they are bad at
      this. Todi assesses where a child's reading, memory, attention and reasoning actually sit,
      then builds the program around that — not around a grade level.
    </P>

    <Figure caption="The landing experience families arrive at, and the eight cognitive modules a child's program is assembled from.">
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

    <H>what it does</H>
    <P>
      Eight modules — reading, visual perception, working memory, pattern recognition, reasoning,
      attention, verbal skills and mathematics — with more than 10,000 exercises behind them. The
      assessment isn't a one-time placement test; it runs continuously, so the program keeps
      reshaping itself as the child changes. Progress goes back to families in real time, which
      matters more than it sounds: parents of children with learning differences are usually flying
      blind between one specialist appointment and the next.
    </P>

    <H>my part in it</H>
    <P>
      I built most of the software: the React front end, the Express API and the data model behind
      it, and the accessibility work throughout — contrast, focus order, keyboard paths, audio
      alternatives. Those are the things that decide whether a child with a reading difficulty can
      operate the interface at all.
    </P>
    <P>
      It's the first codebase i worked on where the users were not people like me, could not be
      asked to try again, and would simply stop using it if a flow confused them.
    </P>

    <H>what it taught me</H>
    <P>
      Personalization is a data problem long before it's a UI problem — if the assessment doesn't
      measure the right things, no amount of adaptive logic downstream will save it. And shipping to
      real users changes which bugs matter: a rendering glitch nobody hits is not a bug; a confusing
      empty state on day one is a catastrophe.
    </P>
  </ProjectLayout>
);

export default Todi;
