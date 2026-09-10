import { Link } from "react-router-dom";
import ProjectLayout, { ExtLink, H, P } from "@/components/ProjectLayout";
import { bySlug } from "@/data/projects";

const Savanah = () => (
  <ProjectLayout
    project={bySlug("/work/savanah")!}
    links={
      <ExtLink href="https://github.com/selinkaracaa/pattern-benchmarking">
        the benchmarking study
      </ExtLink>
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

    <H>what i took from it</H>
    <P>
      Both pieces are the same habit in different clothes: before building the thing, work out what
      would count as evidence that it worked. The study did it for a generation pipeline, the
      framework does it for a recommendation surface, and in both cases the measurement design was
      more contested — and more useful — than the implementation.
    </P>
  </ProjectLayout>
);

export default Savanah;
