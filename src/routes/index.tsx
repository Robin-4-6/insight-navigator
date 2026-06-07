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
      {/* Header overlay */}
      <header className="pointer-events-none absolute top-0 left-0 right-0 z-30 flex items-start justify-between p-6 sm:p-8">
        <div className="pointer-events-auto">
          <div className="mb-1 flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
            <span className="h-px w-8 bg-primary" />
            Module Atlas
          </div>
          <h1 className="font-display text-2xl text-foreground sm:text-3xl">
            Information Retrieval
          </h1>
          <p className="mt-1 max-w-md text-sm text-muted-foreground">
            An interactive map of the module. Click any branch to expand its sub-topics — then click a leaf to read its content.
          </p>
        </div>
        <div className="pointer-events-auto hidden text-right sm:block">
          <div className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
            8 Branches
          </div>
          <div className="font-display text-xl text-foreground">Mind Map</div>
        </div>
      </header>

      {/* Legend footer */}
      <footer className="pointer-events-none absolute bottom-4 left-1/2 z-30 -translate-x-1/2">
        <div className="pointer-events-auto rounded-full border border-border bg-card/70 px-4 py-2 text-[11px] text-muted-foreground backdrop-blur-md">
          Drag the canvas to pan · pinch / use controls to zoom · click nodes to expand
        </div>
      </footer>

      <MindMap />
    </div>
  );
}
