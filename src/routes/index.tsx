import { createFileRoute } from "@tanstack/react-router";
import { MindMap } from "@/components/mindmap/MindMap";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Information Retrieval — Interactive Mind Map" },
      { name: "description", content: "An elegant, interactive mind map of the Information Retrieval module: foundations, IRS, indexing, models, relevance, and evaluation." },
      { property: "og:title", content: "Information Retrieval — Interactive Mind Map" },
      { property: "og:description", content: "Explore the IR module visually. Click any branch to expand its sub-topics and dive into the content." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <header className="pointer-events-none absolute top-0 left-0 right-0 z-30 flex items-start justify-between p-6 sm:p-8">
        <div className="pointer-events-auto">
          <h1 className="font-display text-2xl text-foreground sm:text-3xl">
            Information Retrieval
          </h1>
        </div>
      </header>

      <MindMap />
    </div>
  );
}
