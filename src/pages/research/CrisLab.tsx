import ArticleLayout, { ExtLink, H, P, Pull } from "@/components/ArticleLayout";
import ScaleChart from "@/components/ScaleChart";
import AnisotropyChart from "@/components/AnisotropyChart";
import Figure from "@/components/Figure";
import { FAMILIES, sep } from "@/data/scale";

const CrisLab = () => {
  const pythia = FAMILIES.find((f) => f.name === "Pythia")!;
  const first = pythia.points[0];
  const best = pythia.points.reduce((a, b) => (sep(b) > sep(a) ? b : a));

  return (
    <ArticleLayout
      kicker="research · CRIS Lab"
      title={
        <>
          When does a model stop mimicking meaning and start{" "}
          <span className="font-serif-italic font-light">representing</span> it?
        </>
      }
      meta="Complex Resilient Intelligent Systems Lab, Columbia · jan 2026 — · manuscript in preparation"
      tools={["pytorch", "bertopic", "embeddings", "hdbscan", "gpu cluster"]}
      links={
        <>
          <ExtLink href="/crislabspring2026.pdf">read the report (pdf)</ExtLink>
          <ExtLink href="https://github.com/selinkaracaa/Book_Database_Analysis">github</ExtLink>
        </>
      }
    >
      <P>
        "Understanding" is a word we reach for long before we can measure it. A language model that
        has read enough text will produce sentences about a novel that sound like comprehension,
        and the question of whether anything underneath corresponds to the novel is not one you can
        settle by reading the output. So the project starts somewhere narrower and more testable:
        does the model's internal representation know that a book is <em>one thing</em>?
      </P>

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
        will sit at zero. If it does, within-book will pull ahead.
      </P>

      <Pull>
        Pythia at 70M scores {sep(first).toFixed(4)}. By {best.size} it scores{" "}
        {sep(best).toFixed(4)} — more than two orders of magnitude.
      </Pull>

      <H>what the numbers do</H>
      <P>
        The smallest Pythia models are effectively blind to book identity. Their embeddings are so
        tightly clustered — mean similarity above 0.99 for everything, within-book and across-book
        alike — that the space has almost no room to express difference. That is the anisotropy
        problem, and at 70M and 160M it dominates everything else. Somewhere between 160M and 410M
        the representations spread out and the signal appears.
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
      <P>
        Those two tell a more complicated story than the separation curve, and sorting out how they
        relate is most of what i'm doing now.
      </P>

      <H>what i think is going on</H>
      <P>
        The capability is clearly emerging with scale — that part is not in doubt. But it emerges
        at visibly different rates in different families, which means scale alone isn't the
        variable doing the work. Something about the data mixture and the training recipe is
        shaping how much of the representational budget goes to document-level identity rather than
        local fluency, and the scaling curve alone can't separate those.
      </P>
      <P>
        That's the thread the manuscript follows, and it's why the interesting artifact here isn't
        a benchmark number. It's the shape of the curve, and the fact that three families draw
        three different ones.
      </P>
    </ArticleLayout>
  );
};

export default CrisLab;
