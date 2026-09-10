import ArticleLayout, { ExtLink, H, P, Pull } from "@/components/ArticleLayout";
import Figure from "@/components/Figure";
import { OlympiadPipeline } from "@/components/Diagrams";

const AgentOlympiad = () => (
  <ArticleLayout
    kicker="research · DAPLab"
    title={
      <>
        Can a group of models actually reason together, or only{" "}
        <span className="font-serif-italic font-light">sound like it</span>?
      </>
    }
    meta="Data Analytics and Processing Lab, Columbia · jun 2026 — · working toward ICLR"
    tools={["python", "llm eval", "benchmarks", "rubrics", "data pipelines"]}
    links={
      <ExtLink href="https://github.com/selinkaracaa/agent-olympiad">github</ExtLink>
    }
  >
    <P>
      We are deploying multi-agent systems considerably faster than we can evaluate them. Put
      several language models in a room, let them pass messages, and something comes out that looks
      like collaboration — but the standard way of scoring it is to check whether the final answer
      matches a key. That tells you almost nothing about whether the group reasoned, and nothing at
      all about where it went wrong when it fails.
    </P>

    <Pull>
      A benchmark that only checks the final answer can't tell a lucky guess from a correct
      argument — and for multi-agent work, the argument is the thing you care about.
    </Pull>

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
      criteria.
    </P>
    <P>
      The unglamorous half is consistency and traceability. Every record has to be attributable back
      to its source, every task category has to be processed the same way, and an evaluation run has
      to be reproducible months later by someone who wasn't there. A benchmark whose numbers can't
      be regenerated is an anecdote.
    </P>

    <Figure caption="Contest materials arrive as PDFs and web pages in inconsistent formats. My pipeline parses, aligns and normalises them into records where each problem carries its statement, reference solution, and rubric decomposed into scorable criteria — which is what makes rubric-calibrated judging possible at all.">
      <OlympiadPipeline />
    </Figure>

    <H>where it's going</H>
    <P>
      The benchmark scores teams of agents on these problems under contest-like conditions, with the
      rubric applied by an LLM judge calibrated against the official scoring, and reports not just
      whether a team solved the problem but how its reasoning was structured and where it broke. We
      are working toward a submission to ICLR.
    </P>
  </ArticleLayout>
);

export default AgentOlympiad;
