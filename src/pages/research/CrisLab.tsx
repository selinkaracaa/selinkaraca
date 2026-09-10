import ProjectLayout, { ExtLink, H, P } from "@/components/ProjectLayout";
import ScaleChart from "@/components/ScaleChart";
import AnisotropyChart from "@/components/AnisotropyChart";
import Figure from "@/components/Figure";
import { bySlug } from "@/data/projects";
import { FAMILIES, sep } from "@/data/scale";

const CrisLab = () => {
  const pythia = FAMILIES.find((f) => f.name === "Pythia")!;
  const first = pythia.points[0];
  const best = pythia.points.reduce((a, b) => (sep(b) > sep(a) ? b : a));

  return (
    <ProjectLayout
      project={bySlug("/research/cris-lab")!}
      links={<ExtLink href="/crislabspring2026.pdf">read the report (pdf)</ExtLink>}
      highlights={[
        { value: "500", label: "public-domain books" },
        { value: "19", label: "base models, 3 families" },
        { value: "46,800", label: "text chunks embedded" },
      ]}
      lead={
        <>
          "Understanding" is a word we reach for long before we can measure it. So the project
          starts somewhere narrower and testable: does a model's internal representation know that
          a book is one thing?
        </>
      }
    >
      <H>the setup</H>
      <P>
        I took 500 public-domain books, cut them into roughly 46,800 chunks, and embedded every
        chunk with 19 base language models spanning three families — Pythia from 70M to 12B,
        Cerebras-GPT from 111M to 13B, and Qwen2.5 from 0.5B to 7B. No labels, no fine-tuning,
        nothing task-specific: just the representations the models already have.
      </P>
      <P>
        Then, for every chunk, a single question. Take its nearest neighbours in embedding space.
        Is the best match more similar to a chunk from its own book, or to a chunk from a different
        book entirely? Call the gap between those two similarities the{" "}
        <span className="font-serif-italic">separation</span>. If a model has no representation of
        a book as a coherent object, the two numbers will be nearly identical and the separation
        will sit at zero.
      </P>

      <H>what the numbers do</H>
      <P>
        Pythia at 70M scores {sep(first).toFixed(4)}. By {best.size} it scores{" "}
        {sep(best).toFixed(4)} — more than two orders of magnitude. The smallest models are
        effectively blind to book identity: their embeddings are so tightly clustered, mean
        similarity above 0.99 for everything, that the space has almost no room to express
        difference. That's the anisotropy problem, and at 70M and 160M it dominates everything
        else. Somewhere between 160M and 410M the representations spread out and the signal
        appears.
      </P>

      <Figure caption="Consecutive chunks of the same book, Pythia. At 70M they average 0.99 similarity — the space is so collapsed that 'similar' carries almost no information. By 6.9B it has fallen to 0.42, and the representations finally have room to disagree.">
        <AnisotropyChart />
      </Figure>

      <Figure caption="Within-book minus across-book similarity, plotted against parameter count. Every base model sits far below OpenAI's text-embedding-3, which was trained for exactly this task.">
        <ScaleChart />
      </Figure>

      <P>
        Cerebras climbs steadily across its whole range. Qwen barely moves — it hovers around 0.014
        from 0.5B to 7B, an order of magnitude below Pythia and Cerebras at comparable sizes, which
        is the result i find hardest to explain and most worth explaining. Same rough scale, very
        different training data and recipe, very different geometry.
      </P>
      <P>
        And the reference line matters as much as the curves. OpenAI's{" "}
        <span className="font-serif-italic">text-embedding-3</span> models score around 0.126 —
        roughly triple the best base model here. They were trained to do exactly this, so it isn't
        a fair fight; the point is the size of the gap between a representation that emerges as a
        side effect of next-token prediction and one that was optimised for retrieval.
      </P>

      <H>the other two analyses</H>
      <P>
        The same embedding runs feed two more views. <strong>Consistency within a book</strong>{" "}
        measures how similar consecutive chunks are and how often a chunk's nearest neighbour is
        physically adjacent to it in the text — a proxy for whether the model is tracking narrative
        continuity or just local style. <strong>Topic discovery</strong> runs BERTopic over each
        model's embeddings and asks how many coherent topics fall out, how much gets labelled
        noise, and whether topics span multiple books or collapse onto single ones.
      </P>

      <H>what i think is going on</H>
      <P>
        The capability is clearly emerging with scale — that part is not in doubt. But it emerges
        at visibly different rates in different families, which means scale alone isn't the
        variable doing the work. Something about the data mixture and the training recipe is
        shaping how much of the representational budget goes to document-level identity rather than
        local fluency, and the scaling curve alone can't separate those. That's the thread the
        manuscript follows.
      </P>
    </ProjectLayout>
  );
};

export default CrisLab;
