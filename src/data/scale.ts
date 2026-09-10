/**
 * Within-book vs across-book embedding separation, by model scale.
 *
 * Source: my CRIS Lab run over 500 public-domain books (~46,800 chunks).
 * For every chunk we retrieve its nearest neighbours and compare the best
 * similarity to a chunk from the SAME book against the best similarity to a
 * chunk from a DIFFERENT book. `separation` is the gap between the two — how
 * much the model's representation actually knows that a book is one thing.
 *
 * Generated from out/within_vs_across_books/<model>/summary.json in
 * github.com/selinkaracaa/Book_Database_Analysis
 */

export type Point = {
  size: string;
  params: number; // parameter count
  within: number; // mean best within-book similarity
  across: number; // mean best across-book similarity
};

export type Family = {
  name: string;
  color: string;
  points: Point[];
};

export const FAMILIES: Family[] = [
  {
    name: "Pythia",
    color: "#CC4A1F",
    points: [
      { size: "70M", params: 7.0e7, within: 0.9965, across: 0.9963 },
      { size: "160M", params: 1.6e8, within: 0.9886, across: 0.9879 },
      { size: "410M", params: 4.1e8, within: 0.7645, across: 0.7407 },
      { size: "1B", params: 1.0e9, within: 0.7578, across: 0.7267 },
      { size: "1.4B", params: 1.4e9, within: 0.7391, across: 0.7089 },
      { size: "2.8B", params: 2.8e9, within: 0.6732, across: 0.634 },
      { size: "6.9B", params: 6.9e9, within: 0.6226, across: 0.5792 },
      { size: "12B", params: 1.2e10, within: 0.6321, across: 0.5979 },
    ],
  },
  {
    name: "Cerebras-GPT",
    color: "#0093A6",
    points: [
      { size: "111M", params: 1.11e8, within: 0.744, across: 0.7147 },
      { size: "256M", params: 2.56e8, within: 0.6896, across: 0.6541 },
      { size: "590M", params: 5.9e8, within: 0.6449, across: 0.6021 },
      { size: "1.3B", params: 1.3e9, within: 0.6312, across: 0.586 },
      { size: "2.7B", params: 2.7e9, within: 0.6228, across: 0.5729 },
      { size: "6.7B", params: 6.7e9, within: 0.6002, across: 0.5451 },
      { size: "13B", params: 1.3e10, within: 0.6396, across: 0.5949 },
    ],
  },
  {
    name: "Qwen2.5",
    color: "#6E3FC7",
    points: [
      { size: "0.5B", params: 5.0e8, within: 0.8813, across: 0.8672 },
      { size: "1.5B", params: 1.5e9, within: 0.9118, across: 0.9019 },
      { size: "3B", params: 3.0e9, within: 0.88, across: 0.8656 },
      { size: "7B", params: 7.0e9, within: 0.8578, across: 0.8406 },
    ],
  },
];

/** Purpose-trained embedding models, shown as a reference band. */
export const REFERENCE = {
  label: "OpenAI text-embedding-3",
  low: 0.8215 - 0.6923, // large
  high: 0.858 - 0.7341, // small
};

export const sep = (p: Point) => p.within - p.across;
