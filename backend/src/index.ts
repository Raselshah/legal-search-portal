import cors from "cors";
import express from "express";

const app = express();
app.use(cors());
app.use(express.json());
// Three hardcoded legal documents
const docs = [
  {
    id: 1,
    title: "Employment Agreement",
    content: `Employment Agreement – Section 4: Confidentiality
    The Employee agrees that during employment and after termination more...`,
  },
  {
    id: 2,
    title: "Non-Disclosure Agreement",
    content: `Non-Disclosure Agreement – Clause 3: Non-Use Obligation
    The Recipient agrees not to use Confidential Information more...`,
  },
  {
    id: 3,
    title: "Website Terms & Conditions",
    content: `Terms & Conditions – Section 7: Limitation of Liability
    To the maximum extent permitted by law, the Company is not liable more...`,
  },
];

// search and summarize function
const docsSearchingAndSumm = (query: string) => {
  const lower = query.toLowerCase();

  const matchesDoc = docs
    .map((d) => {
      const idx = d.content.toLowerCase().indexOf(lower);
      if (idx === -1) return null;
      const start = Math.max(0, idx - 30);
      const content = d.content.slice(
        start,
        Math.min(d.content.length, idx + query.length + 60)
      );
      return {
        id: d.id,
        title: d.title,
        content: content.replace(/\n/g, " "),
      };
    })
    .filter(Boolean);

  const summary = matchesDoc.length
    ? `Found ${
        matchesDoc.length
      } documentes matching "${query}". Top hits: ${matchesDoc
        .map((m) => m!.title)
        .join(", ")}.`
    : `No documents matched the query "${query}".`;

  return { summary, matches: matchesDoc };
};

app.post("/generate", (req, res) => {
  const { query } = req.body as { query?: string };
  if (!query || typeof query !== "string" || query.trim().length === 0) {
    return res.status(400).json({ error: "query is required" });
  }

  // delay to simulate processing
  setTimeout(() => {
    const result = docsSearchingAndSumm(query.trim());
    res.json({ query: query.trim(), ...result, docsCount: docs.length });
  }, 700); // 700ms
});

const PORT = 4000;
app.listen(PORT, () =>
  console.log(`Legal-search backend running on port : ${PORT}`)
);
