import ArticleLayout, { ExtLink, H, P, Pull } from "@/components/ArticleLayout";
import Figure from "@/components/Figure";
import RubricHeatmap from "@/components/RubricHeatmap";

const Savanah = () => (
  <ArticleLayout
    kicker="work · savanah.ai"
    title={
      <>
        The model already knows how fabric folds. The{" "}
        <span className="font-serif-italic font-light">workflow</span> suppresses it.
      </>
    }
    meta="savanah.ai · ai personalization intern · jun 2026 —"
    tools={["python", "diffusion", "controlnet", "embeddings", "umap", "hdbscan", "a/b testing"]}
    links={
      <ExtLink href="https://github.com/selinkaracaa/pattern-benchmarking">
        the benchmarking study
      </ExtLink>
    }
  >
    <P>
      Savanah is an early-stage AI commerce company, and i've worked on two things there: an
      evaluation study that changed which engineering path the team should take, and a
      personalization system that didn't exist before.
    </P>

    <H>the pattern realism study</H>
    <P>
      The question sounds narrow and turns out not to be. When you apply a printed pattern to a
      garment image with an AI tool, the print behaves like a sticker — motifs stay whole and
      circular across a pleat, and only get darker in shadow. Real printed textile doesn't do that.
      Fabric folds physically interrupt the print: flowers get cut off at gathers, roses lose their
      shape across a drape. Customers can't articulate this, but they can see it, and it's most of
      why AI-generated garment images look wrong.
    </P>
    <P>
      I built a rubric — fold interruption, scale, garment preservation, shading integration,
      artifact rate, each scored 1–5 — and ran <span className="font-serif-italic">twelve outputs
      across seven tools</span>: Savanah's own pattern tool, Gemini, ControlNet, virtual try-on
      models like IDM-VTON and OOTDiffusion, and fashion-vertical products.
    </P>
    <P>
      Every tool that preserved the garment's geometry produced flat, sticker-like application.
      Prompt engineering had <span className="font-serif-italic">zero</span> effect — three
      escalating prompts on the same input produced pixel-identical results, which is the cleanest
      possible evidence that the mechanism, not the text, determines the output.
    </P>

    <Figure caption="Twelve outputs, seven tools, five criteria. Read the fold-interruption column top to bottom: it is 1 out of 5 almost everywhere. The one exception, Gemini output 6, scores 4 — and scores 1 on garment preservation. Nothing solves both.">
      <RubricHeatmap />
    </Figure>

    <Pull>
      Then a free-generation prompt, with no garment to preserve, produced exactly the fold
      behavior every other tool failed at. The knowledge was there the whole time.
    </Pull>

    <P>
      That reframed the problem entirely. The team's assumption had been that the model needed to
      be taught fold physics, which pointed at LoRA fine-tuning — expensive, slow, uncertain. But
      if the model can already render fold-interrupted fabric when it generates freely, the failure
      is that pattern-application workflows constrain it to match a flat reference image and
      suppress the behavior it would otherwise produce.
    </P>
    <P>
      So the recommendation changed from "fine-tune" to "design a workflow that lets the model
      express what it already knows" — a depth-map UV warp, or a generate-then-composite pipeline
      that produces the fold-interrupted texture first and then warps it onto the garment. Neither
      needs fine-tuning. Both use a proved building block.
    </P>

    <H>the personalization system</H>
    <P>
      The second piece: the company's first personalization framework, mapping customer behavior
      and profile signals to storefront visuals that adapt to who is looking at them. I specified
      an unsupervised segmentation pipeline — behavioral embeddings, then UMAP, then HDBSCAN — so
      the customer cohorts come out of the data rather than out of somebody's intuition about who
      the customer is.
    </P>
    <P>
      I also defined what the pilot needs to collect and the A/B test that will tell us whether any
      of it worked: click-through, add-to-cart rate, and conversion lift. That last part is the
      one i'd defend hardest. A personalization system with no measurement plan is a system that
      will be declared successful regardless of what it does.
    </P>
  </ArticleLayout>
);

export default Savanah;
