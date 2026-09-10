import ProjectLayout, { ExtLink, H, P } from "@/components/ProjectLayout";
import { bySlug } from "@/data/projects";

const AgentOlympiad = () => (
  <ProjectLayout
    project={bySlug("/research/agent-olympiad")!}
    links={<ExtLink href="https://github.com/selinkaracaa/agent-olympiad">github</ExtLink>}
    lead={
      <>
        We are deploying multi-agent systems considerably faster than we can evaluate them. The
        standard way of scoring one is to check whether the final answer matches a key — which
        tells you nothing about whether the group reasoned, and nothing at all about where it went
        wrong when it fails.
      </>
    }
  >
    <P>
      A benchmark that only checks the final answer can't tell a lucky guess from a correct
      argument. For multi-agent work, the argument is the thing you care about.
    </P>

    <H>why olympiad problems</H>
    <P>
      Competition mathematics and programming turn out to be an unusually good instrument for this,
      for a reason that has nothing to do with difficulty. These contests come with{" "}
      <span className="font-serif-italic">official solutions and real grading rubrics</span> —
      documents written by humans to award partial credit to human contestants. A proof that gets
      the key insight but botches the final algebra scores differently from one that guesses the
      answer with no argument, and the rubric says exactly how differently.
    </P>
    <P>
      That gives an evaluation something string-matching can never have: a principled notion of
      partial credit that wasn't invented by the benchmark authors to make their numbers look
      reasonable.
    </P>

    <H>what i build</H>
    <P>
      My part is the pipeline that turns those materials into something a machine can grade. Contest
      problems, official solutions, and scoring rubrics arrive as PDFs and web pages in wildly
      inconsistent formats; they come out the other end as structured records where each problem
      carries its statement, its reference solution, and its rubric decomposed into scorable
      criteria. That normalisation is what makes rubric-calibrated judging possible at all.
    </P>
    <P>
      The unglamorous half is consistency and traceability. Every record has to be attributable back
      to its source, every task category has to be processed the same way, and an evaluation run has
      to be reproducible months later by someone who wasn't there. A benchmark whose numbers can't
      be regenerated is an anecdote.
    </P>

    <H>where it's going</H>
    <P>
      The benchmark scores teams of agents on these problems under contest-like conditions, with the
      rubric applied by an LLM judge calibrated against the official scoring, and reports not just
      whether a team solved the problem but how its reasoning was structured and where it broke. We
      are working toward a submission to ICLR.
    </P>
  </ProjectLayout>
);

export default AgentOlympiad;
