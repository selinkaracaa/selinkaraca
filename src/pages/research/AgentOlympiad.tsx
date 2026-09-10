import ProjectLayout, { H, P } from "@/components/ProjectLayout";
import { bySlug } from "@/data/projects";

const AgentOlympiad = () => (
  <ProjectLayout
    project={bySlug("/research/agent-olympiad")!}
    highlights={[
      { value: "20", label: "competition families" },
      { value: "308", label: "years and sessions" },
      { value: "4,434", label: "questions collected" },
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
      Real team competitions ship with something most benchmarks lack: official solutions and human
      grading rubrics, written to award partial credit to human contestants. That gives a
      principled notion of partial credit the benchmark authors didn't invent to flatter their own
      numbers.
    </P>

    <H>the data</H>
    <P>
      I build the pipeline that turns contest materials into something a machine can grade. Twenty
      competition families are collected and normalised, spanning 308 published team exams and
      4,434 individual questions — linguistics (IOL), astronomy (IOAA), mathematics (ARML power,
      national team and power, local; HMMT team and guts; Purple Comet; ITYM; MCM), physics (IYPT,
      Fyziklání), science (IJSO practical), economics (IEO business case), interdisciplinary (ICM),
      humanities (WSC collaborative writing), international law (Jessup), and informatics (IIOT,
      ICPC World Finals).
    </P>
    <P>
      Source PDFs go in; structured per-problem JSON comes out, each record carrying its statement,
      reference solution, and rubric decomposed into scorable criteria, attributable back to its
      source file.
    </P>

    <H>contest realism</H>
    <P>
      Each competition also carries a simulator specification, verified against primary official
      sources: team size, input modality, what tools are permitted, what materials the organisers
      provide, and what the final deliverable is. IOL is four agents with paper and pencil and no
      internet; IYPT allows every aid including live search; MCM gives three agents unrestricted
      software and a 99-hour window. An agent team gets exactly the resources a human team would.
    </P>
    <P>
      Time, cost and tokens are tracked as three separate budgets, penalties consume the resource
      they would really consume, and competition rules can run prompt-only or fully enforced — the
      gap between those two is itself a measurement.
    </P>

    <H>what gets scored</H>
    <P>
      Task score says whether the answer was right. Two further metrics say how the team worked:{" "}
      <strong>Coordination Score</strong> rates the quality of the collaboration, and{" "}
      <strong>Interaction Helpfulness Score</strong> rates the same run for effect — whether the
      talking actually improved the answers. A team that deliberates thoroughly and never fixes an
      answer scores high on one and low on the other. Board metrics cover how much of the paper was
      attempted and whether the team repeated itself.
    </P>
    <P>
      Alongside it, the programming leaderboard: deterministic ICPC standings and the LiveOIBench
      three-stage ranking pipeline. Human baselines are read only from local files; missing data is
      reported rather than fetched, so a run stays reproducible months later.
    </P>

    <H>where it goes</H>
    <P>
      Teams of agents run under contest conditions, with rubrics applied by an LLM judge calibrated
      against the official scoring, reporting how the reasoning was structured and where it broke
      rather than just whether it landed. We're working toward a submission to ICLR.
    </P>
  </ProjectLayout>
);

export default AgentOlympiad;
