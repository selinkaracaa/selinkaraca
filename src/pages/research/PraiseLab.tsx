import ProjectLayout, { ExtLink, H, P } from "@/components/ProjectLayout";
import { bySlug } from "@/data/projects";

const PraiseLab = () => (
  <ProjectLayout
    project={bySlug("/research/praise-lab")!}
    links={<ExtLink href="https://www.cs.columbia.edu/~ansaf/praise/index.html">the lab</ExtLink>}
    lead={
      <>
        Symbolic regression — recovering the equation behind a set of measurements — is usually
        posed as a search problem, and it scales badly, because the space of possible equations
        grows faster than any search can comfortably cover.
      </>
    }
  >
    <P>
      The reframing that pulled me in: treat an equation as a shape a model can recognise, rather
      than a string it has to generate.
    </P>

    <H>the approach</H>
    <P>
      Automatic Symbolic Law Discovery takes a different route. The input data is encoded as an{" "}
      <span className="font-serif-italic">image</span> — a picture of the relationship between
      variables — and refined with super-resolution so fine structure survives. That image goes
      through a deep network, which predicts the importance of each mathematical operator from the
      picture alone.
    </P>
    <P>
      So instead of searching expression space, you ask a vision model what the relationship{" "}
      <em>looks like</em>. A logarithm has a silhouette. So does a product of powers. If the network
      can learn those silhouettes, it can narrow the search radically before any symbolic machinery
      runs.
    </P>

    <H>why it's interesting</H>
    <P>
      There's something appealing about the fact that this is close to how physicists actually work.
      You plot the data first. You look at the curve, decide it smells exponential, and only then
      start fitting. The insight arrives visually and the algebra follows — and this approach takes
      that ordering seriously instead of treating it as an informal shortcut on the way to the real
      method.
    </P>
    <P>
      It also connects to the question i'm chasing in the other labs. In all three cases i'm asking
      what a model's representation has actually captured, and whether we can see the structure from
      the outside — in embeddings, in reasoning traces, or here, quite literally, in a picture.
    </P>
  </ProjectLayout>
);

export default PraiseLab;
