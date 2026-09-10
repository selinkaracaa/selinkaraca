import ArticleLayout, { H, P, Pull } from "@/components/ArticleLayout";

const Teaching = () => (
  <ArticleLayout
    kicker="work · teaching"
    title={
      <>
        Teaching 300 students how memory and architecture{" "}
        <span className="font-serif-italic font-light">actually work</span>
      </>
    }
    meta="columbia engineering · teaching assistant · jan 2026 —"
    tools={["c", "systems", "computer architecture", "discrete math", "proof techniques"]}
  >
    <P>
      I TA two of the courses that decide whether someone stays in computer science: Fundamentals
      of Computer Systems and Discrete Mathematics. Between them that's C programming, memory
      layout, computer architecture, proof techniques and induction — and just over 300 students a
      term.
    </P>

    <Pull>
      Office hours are where you find out which parts of your own understanding are load-bearing
      and which parts you'd only ever recited.
    </Pull>

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
      Partly because explaining a thing is the most reliable test of whether you know it, and
      systems is a subject where it is very easy to feel fluent and be wrong. But mostly because
      this is the same problem i work on everywhere else, in a different medium — figuring out what
      someone's model of a thing currently is, and what would move it. That's Todi's problem, and
      in a strange way it's the research question too.
    </P>
  </ArticleLayout>
);

export default Teaching;
