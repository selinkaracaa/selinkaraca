import ArticleLayout, { ExtLink, H, P, Pull } from "@/components/ArticleLayout";
import Figure from "@/components/Figure";
import { PraiseApproach } from "@/components/Diagrams";

const PraiseLab = () => (
  <ArticleLayout
    kicker="research · PRAISE Lab"
    title={
      <>
        Can a machine <span className="font-serif-italic font-light">see</span> an equation before
        it can write one down?
      </>
    }
    meta="Practice and Research in AI for Science and Education, Columbia · may 2026 —"
    tools={["pytorch", "computer vision", "super-resolution", "symbolic regression"]}
    links={
      <>
        <ExtLink href="https://www.cs.columbia.edu/~ansaf/praise/project-law.html">
          project page
        </ExtLink>
        <ExtLink href="https://www.cs.columbia.edu/~ansaf/praise/index.html">the lab</ExtLink>
      </>
    }
  >
    <P>
      Symbolic regression — recovering the equation behind a set of measurements — is usually posed
      as a search problem. You define a grammar of operators, then hunt through the combinatorial
      space of expressions for one that fits. It works, and it scales badly, because the space of
      possible equations grows faster than any search can comfortably cover.
    </P>

    <Pull>
      The reframing that pulled me in: treat an equation as a shape a model can recognise, rather
      than a string it has to generate.
    </Pull>

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

    <Figure caption="Instead of searching expression space for a formula that fits, the data is rendered as a picture and a vision model is asked what the relationship looks like — narrowing the symbolic search before it starts.">
      <PraiseApproach />
    </Figure>

    <H>why it's interesting</H>
    <P>
      There's something appealing about the fact that this is close to how physicists actually
      work. You plot the data first. You look at the curve, decide it smells exponential, and only
      then start fitting. The insight arrives visually and the algebra follows — and this approach
      takes that ordering seriously instead of treating it as an informal shortcut on the way to
      the real method.
    </P>
    <P>
      It also connects to the question i'm chasing in the other labs. In all three cases i'm asking
      what a model's representation has actually captured, and whether we can see the structure
      from the outside — in embeddings, in reasoning traces, or here, quite literally, in a picture.
    </P>
  </ArticleLayout>
);

export default PraiseLab;
