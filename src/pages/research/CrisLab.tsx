import ProjectLayout, { SourceLink, H, P } from "@/components/ProjectLayout";
import ScaleChart from "@/components/ScaleChart";
import AnisotropyChart from "@/components/AnisotropyChart";
import Figure from "@/components/Figure";
import { bySlug } from "@/data/projects";

const CrisLab = () => (
  <ProjectLayout
    project={bySlug("/research/cris-lab")!}
    links={<SourceLink href="/crislabspring2026.pdf">read the report (pdf)</SourceLink>}
    highlights={[
      { value: "28×", label: "jump in one scale step" },
      { value: "22", label: "model checkpoints" },
      { value: "500", label: "books, 20 genres" },
    ]}
    lead={
      <>
        Does a capability appear discontinuously as a model gets bigger, or only gradually? We
        looked for the answer inside the embedding space rather than in benchmark scores.
      </>
    }
  >
    <P>
      <span className="font-serif-italic">Semantic Emergence in Language Model Embeddings</span>,
      written with Ketaki Dabade. The test is deliberately narrow and measurable: do a model's
      chunk-level embeddings encode which book a passage came from?
    </P>

    <H>the setup</H>
    <P>
      500 books across 20 genres from Project Gutenberg, chunked at roughly 94 chunks per book, and
      embedded by five model families — Pythia (8 checkpoints, 70M–12B, trained on the deduplicated
      Pile), Cerebras-GPT (111M–13B), Qwen2.5 (0.5B–7B), OpenAI text-embedding-3, and
      Qwen3-Embedding as a retrieval reference. 22 checkpoints in total, no labels and no
      fine-tuning.
    </P>
    <P>
      Two label-free analyses run over the corpus: a{" "}
      <span className="font-serif-italic">within-vs-across books</span> comparison asking whether
      same-book passages sit closer together than passages from different books, and a BERTopic
      pipeline asking whether topic structure gets more coherent with scale. Then a deep dive on one
      genre — Romance, 25 books, about 3,018 chunks per checkpoint — from five independent angles.
    </P>

    <H>the finding</H>
    <P>
      Six independent methods converge on the same boundary in Pythia, between 160M and 410M
      parameters. The within-vs-across <strong>book</strong> gap increases 28-fold in that single
      scale step; the within-vs-across <strong>genre</strong> gap increases 35-fold; the BERTopic
      noise fraction drops; nearest-neighbour subject lift roughly doubles; the cohesion ratio
      crosses 1.2; and mean top-1 cosine similarity falls discontinuously — anisotropic embedding
      collapse resolving.
    </P>

    <Figure caption="Consecutive chunks of the same book, Pythia. At 70M they average 0.99 similarity — the space is so collapsed that 'similar' carries almost no information. By 6.9B it has fallen to 0.42, and the representations finally have room to disagree.">
      <AnisotropyChart />
    </Figure>

    <Figure caption="Within-book minus across-book similarity against parameter count. Every base model sits far below OpenAI's text-embedding-3, which was trained for exactly this task.">
      <ScaleChart />
    </Figure>

    <P>
      The Romance deep-dive splits emergence into two sequential phases: a{" "}
      <span className="font-serif-italic">geometric</span> phase at 160M→410M where anisotropy
      resolves, then a <span className="font-serif-italic">categorical</span> phase at 410M→1B where
      discovered topics start aligning with real book and bookshelf labels. Getting room to express
      difference and using that room for the right distinctions are two different events.
    </P>
    <P>
      Scale isn't the only variable. Cerebras-GPT is already discriminative at its smallest measured
      size, 111M, putting its threshold below anything we could measure. Qwen2.5 has a qualitatively
      different geometry, with cosine similarities uniformly compressed across its whole range.
      Same rough scales, different training data and recipe, different answers.
    </P>

    <H>where it goes</H>
    <P>
      The manuscript is in preparation. What makes the result worth arguing about isn't a benchmark
      number — it's that representational emergence turns out to be quantitatively locatable, robust
      across methods, and dependent on architecture rather than scale alone.
    </P>
  </ProjectLayout>
);

export default CrisLab;
