import ProjectLayout, { H, P } from "@/components/ProjectLayout";
import { bySlug } from "@/data/projects";

const AgentOlympiad = () => (
  <ProjectLayout
    project={bySlug("/research/agent-olympiad")!}
    highlights={[
      { value: "6", label: "contest families collected" },
      { value: "3", label: "rule-enforcement modes" },
      { value: "ICPC", label: "+ LiveOIBench ranking" },
    ]}
    lead={
      <>
        A benchmark for multi-agent AI teams on olympiad-style team tasks, at DAPLab. The standard
        way to score a multi-agent run is to check the final answer against a key, which says
        nothing about whether the group actually reasoned.
      </>
    }
  >
    <H>why team contests</H>
    <P>
      Olympiad and team competitions ship with something most benchmarks lack: official solutions
      and real grading rubrics, written by humans to award partial credit to human contestants. That
      gives a principled notion of partial credit that the benchmark authors didn't invent to make
      their own numbers look reasonable.
    </P>

    <H>what i build</H>
    <P>
      The data pipeline. Source PDFs from six contest families — IOL, IOAA, ARML (national and
      local), IJSO, and business-case competitions — go in; structured per-problem JSON comes out,
      each record carrying its statement, reference solution, and rubric decomposed into scorable
      criteria. Everything stays attributable to its source file, and the catalog tracks collection
      status per competition.
    </P>
    <P>
      Alongside it, the programming leaderboard: deterministic ICPC standings, and the LiveOIBench
      three-stage ranking pipeline — explicit oracle best-of-8 selection, contest-local score
      totals, then normalised global aggregation. Human baselines are read only from local files;
      missing data gets reported rather than fetched, so a run is reproducible months later.
    </P>
    <P>
      The benchmark also has a rule-aware baseline with three modes. <code>off</code> leaves
      collaboration and tool behaviour untouched; <code>prompt_only</code> hands contestants a
      canonical card of competition, resource, collaboration, roster and role-duty rules without
      enforcing them; <code>enforced</code> additionally applies communication budgets, submission
      authority, tool allowlists, private notes and structured deliberation invariants. The gap
      between those three is itself a measurement.
    </P>

    <H>where it goes</H>
    <P>
      Teams of agents run under contest-like conditions, with the rubric applied by an LLM judge
      calibrated against the official scoring, reporting how the reasoning was structured and where
      it broke rather than just whether it landed. We're working toward a submission to ICLR.
    </P>
  </ProjectLayout>
);

export default AgentOlympiad;
