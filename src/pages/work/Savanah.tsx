import { Link } from "react-router-dom";
import ProjectLayout, { SourceLink, H, P } from "@/components/ProjectLayout";
import Figure from "@/components/Figure";
import Photo from "@/components/Photo";
import { bySlug } from "@/data/projects";

const Savanah = () => (
  <ProjectLayout
    project={bySlug("/work/savanah")!}
    links={
      <>
        <SourceLink href="https://savanah.ai/">savanah.ai</SourceLink>
        <SourceLink href="https://github.com/selinkaracaa/pattern-benchmarking">
          the benchmarking study
        </SourceLink>
      </>
    }
    lead={
      <>
        Two pieces of work at an early-stage AI commerce company: an evaluation study that changed
        which engineering path the team should take, and a personalization system that didn't exist
        before.
      </>
    }
  >
    <H>the evaluation study</H>
    <P>
      The first was a benchmark of how AI tools apply printed patterns to garments — a rubric
      across seven tools, and a finding that redirected the team away from fine-tuning. It has a
      page of its own:{" "}
      <Link to="/projects/pattern-realism" className="link-underline">
        pattern realism
      </Link>
      .
    </P>

    <Figure caption="What the product does: a flat-lay garment becomes an on-model image. Getting the fabric to behave correctly in that second image is what the benchmarking study measures. Images from savanah.ai.">
      <div className="grid grid-cols-2 gap-3">
        <Photo
          name="savanah-flatlay"
          alt="A flat-lay garment photograph"
          sizes="(max-width:768px) 50vw, 320px"
          className="w-full bg-white object-contain"
        />
        <Photo
          name="savanah-model"
          alt="The same garment generated on a model"
          sizes="(max-width:768px) 50vw, 320px"
          className="w-full bg-white object-contain"
        />
      </div>
    </Figure>

    <H>the personalization system</H>
    <P>
      The second piece: the company's first personalization framework, mapping customer behaviour
      and profile signals to storefront visuals that adapt to who is looking at them. I specified
      an unsupervised segmentation pipeline — behavioural embeddings, then UMAP, then HDBSCAN — so
      the customer cohorts come out of the data rather than out of somebody's intuition about who
      the customer is.
    </P>
    <P>
      I also defined what the pilot needs to collect and the A/B test that will tell us whether any
      of it worked: click-through, add-to-cart rate, and conversion lift. That last part is the one
      i'd defend hardest. A personalization system with no measurement plan is a system that will
      be declared successful regardless of what it does.
    </P>
  </ProjectLayout>
);

export default Savanah;
