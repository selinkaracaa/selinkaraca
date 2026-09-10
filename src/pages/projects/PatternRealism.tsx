import { Link } from "react-router-dom";
import ProjectLayout, { H, P } from "@/components/ProjectLayout";
import Figure from "@/components/Figure";
import RubricHeatmap from "@/components/RubricHeatmap";
import { bySlug } from "@/data/projects";

const PatternRealism = () => (
  <ProjectLayout
    project={bySlug("/projects/pattern-realism")!}
    highlights={[
      { value: "7", label: "tools benchmarked" },
      { value: "12", label: "outputs scored" },
      { value: "5", label: "criteria, scored 1–5" },
    ]}
    lead={
      <>
        AI tools apply a printed pattern to a garment as a flat overlay with shading on top. On real
        fabric, folds physically interrupt the print — motifs get cut off at gathers, roses lose
        their shape across a pleat.
      </>
    }
  >
    <H>the rubric</H>
    <P>
      I defined five criteria, each scored 1–5: fold interruption (motifs visibly cut or compressed
      at folds, versus roses always complete and merely darkened), scale, garment preservation,
      shading integration, and artifact rate.
    </P>
    <P>
      I ran twelve outputs across seven tools against a fixed set of inputs — a flat-lay dress, a
      rose pattern swatch, and a model wearing the plain dress — covering Savanah's own pattern
      tool, Gemini, ControlNet, virtual try-on models including IDM-VTON and OOTDiffusion, and
      fashion-vertical products.
    </P>

    <Figure caption="Twelve outputs, seven tools, five criteria. Read the fold-interruption column top to bottom: it is 1 out of 5 almost everywhere. The one exception, Gemini output 6, scores 4 — and scores 1 on garment preservation. Nothing solves both.">
      <RubricHeatmap />
    </Figure>

    <H>what the runs showed</H>
    <P>
      Every tool that preserved the garment's geometry produced flat, sticker-like application.
      Savanah's own tool scored 1/5 on fold interruption while scoring 5/5 on garment preservation
      and artifact rate.
    </P>
    <P>
      Three prompts of escalating detail on the same input — from "put this flower pattern onto the
      dress" up to "motifs should be visibly cut off, compressed, or bent" — produced identical
      outputs, scoring identically on all five criteria. Prompt engineering has no effect on fold
      behaviour; the mechanism determines the output.
    </P>
    <P>
      A free-generation prompt, with no garment to preserve, produced the fold-interrupted behaviour
      every image-conditioned tool failed at.
    </P>

    <H>what i recommended</H>
    <P>
      Two workflow routes that need no fine-tuning: a depth-map UV warp, or a generate-then-
      composite pipeline that produces the fold-interrupted texture first and warps it onto the
      garment afterwards.
    </P>
    <P>
      From my work at{" "}
      <Link to="/work/savanah" className="link-underline">
        Savanah.ai
      </Link>
      .
    </P>
  </ProjectLayout>
);

export default PatternRealism;
