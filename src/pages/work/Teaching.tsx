import ProjectLayout, { H, P } from "@/components/ProjectLayout";
import { bySlug } from "@/data/projects";

const Teaching = () => (
  <ProjectLayout
    project={bySlug("/work/teaching")!}
    highlights={[
      { value: "300+", label: "students a term" },
      { value: "2", label: "courses" },
    ]}
    lead={
      <>
        I TA two of the courses that decide whether someone stays in computer science: Fundamentals
        of Computer Systems and Discrete Mathematics. Between them that's C, memory layout,
        architecture, proof techniques and induction — and just over 300 students a term.
      </>
    }
  >
    <H>what actually happens in office hours</H>
    <P>
      Almost nobody arrives with the question they need answered. A student comes in with a
      segfault, and the segfault is real, but the thing underneath is usually that they have no
      mental model of the stack — they've been treating pointer syntax as an incantation that
      sometimes works. You can fix the segfault in thirty seconds and they'll be back tomorrow with
      another one, or you can spend fifteen minutes drawing memory and they won't.
    </P>
    <P>
      The same pattern shows up in Discrete. A student who can't finish an induction proof usually
      hasn't misunderstood induction; they haven't yet believed that the inductive hypothesis is
      something you're allowed to <em>use</em>. That's not a gap in technique, it's a gap in
      permission, and it needs a completely different conversation.
    </P>

    <H>why i keep doing it</H>
    <P>
      Explaining a thing is the most reliable test of whether you know it, and systems is a subject
      where it is very easy to feel fluent and be wrong. Office hours are where you find out which
      parts of your own understanding are load-bearing and which parts you'd only ever recited.
    </P>
  </ProjectLayout>
);

export default Teaching;
