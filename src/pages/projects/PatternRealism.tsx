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
      { value: "5", label: "rubric criteria, 1–5" },
    ]}
    lead={
      <>
        When you apply a printed pattern to a garment image with an AI tool, the print behaves like
        a sticker — motifs stay whole across a pleat and only get darker in shadow. Real printed
        textile doesn't do that.
      </>
    }
  >
    <P>
      Fabric folds physically interrupt the print: flowers get cut off at gathers, roses lose their
      shape across a drape. Customers can't articulate this, but they can see it, and it's most of
      why AI-generated garment images look wrong.
    </P>

    <H>the rubric</H>
    <P>
      I built a scoring rubric — fold interruption, scale, garment preservation, shading
      integration, artifact rate, each scored 1–5 — and ran{" "}
      <span className="font-serif-italic">twelve outputs across seven tools</span>: Savanah's own
      pattern tool, Gemini, ControlNet, virtual try-on models like IDM-VTON and OOTDiffusion, and
      fashion-vertical products.
    </P>

    <Figure caption="Twelve outputs, seven tools, five criteria. Read the fold-interruption column top to bottom: it is 1 out of 5 almost everywhere. The one exception, Gemini output 6, scores 4 — and scores 1 on garment preservation. Nothing solves both.">
      <RubricHeatmap />
    </Figure>

    <H>what it found</H>
    <P>
      Every tool that preserved the garment's geometry produced flat, sticker-like application.
      Prompt engineering had <span className="font-serif-italic">zero</span> effect — three
      escalating prompts on the same input produced pixel-identical results, which is the cleanest
      possible evidence that the mechanism, not the text, determines the output.
    </P>
    <P>
      Then a free-generation prompt, with no garment to preserve, produced exactly the fold
      behaviour every other tool failed at. The knowledge was there the whole time.
    </P>

    <H>why that changed the roadmap</H>
    <P>
      The team's assumption had been that the model needed to be taught fold physics, which pointed
      at LoRA fine-tuning — expensive, slow, uncertain. But if the model can already render
      fold-interrupted fabric when it generates freely, the failure is that pattern-application
      workflows constrain it to match a flat reference image and suppress the behaviour it would
      otherwise produce.
    </P>
    <P>
      So the recommendation changed from "fine-tune" to "design a workflow that lets the model
      express what it already knows" — a depth-map UV warp, or a generate-then-composite pipeline
      that produces the fold-interrupted texture first and then warps it onto the garment. Neither
      needs fine-tuning. Both use a proved building block.
    </P>
    <P>
      This came out of my work at{" "}
      <Link to="/work/savanah" className="link-underline">
        Savanah.ai
      </Link>
      .
    </P>
  </ProjectLayout>
);

export default PatternRealism;
