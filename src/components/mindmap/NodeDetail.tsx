import { X } from "lucide-react";
import { type ContentBlock, type MindNode } from "@/data/ir-mindmap";

interface Props {
  node: MindNode | null;
  onClose: () => void;
}

function renderBlock(block: ContentBlock, i: number, colorVar: string) {
  switch (block.type) {
    case "h":
      return (
        <h3
          key={i}
          className="mt-6 mb-2 font-display text-xl"
          style={{ color: colorVar }}
        >
          {block.text}
        </h3>
      );
    case "p":
      return (
        <p key={i} className="text-[15px] leading-relaxed text-foreground/90">
          {block.text}
        </p>
      );
    case "list":
      return (
        <ul key={i} className="my-2 space-y-2">
          {block.items?.map((it, j) => (
            <li
              key={j}
              className="flex gap-3 text-[14px] leading-relaxed text-foreground/85"
            >
              <span
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: colorVar }}
              />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      );
    case "table": {
      const [head, ...body] = block.rows ?? [];
      return (
        <div
          key={i}
          className="my-4 overflow-x-auto rounded-xl border"
          style={{ borderColor: `color-mix(in oklab, ${colorVar} 25%, transparent)` }}
        >
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: `color-mix(in oklab, ${colorVar} 12%, transparent)` }}>
                {head?.map((h, j) => (
                  <th
                    key={j}
                    className="px-3 py-2 text-left font-medium"
                    style={{ color: colorVar }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {body.map((row, rIdx) => (
                <tr key={rIdx} className="border-t border-border/60">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="px-3 py-2 align-top text-foreground/85">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    case "formula":
      return (
        <div
          key={i}
          className="my-3 rounded-lg border px-4 py-3 font-mono text-sm"
          style={{
            borderColor: `color-mix(in oklab, ${colorVar} 30%, transparent)`,
            background: `color-mix(in oklab, ${colorVar} 8%, transparent)`,
            color: "var(--foreground)",
          }}
        >
          {block.text}
        </div>
      );
    case "quote":
      return (
        <blockquote
          key={i}
          className="my-4 border-l-2 pl-4 font-display text-lg italic text-foreground/90"
          style={{ borderColor: colorVar }}
        >
          {block.text}
        </blockquote>
      );
  }
}

export function NodeDetail({ node, onClose }: Props) {
  const open = !!node;
  const colorVar = node?.branch ? `var(--branch-${node.branch})` : "var(--primary)";

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-background-deep/60 backdrop-blur-sm transition-opacity ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        style={{ background: "color-mix(in oklab, var(--background-deep) 70%, transparent)" }}
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-xl flex-col border-l bg-card/95 shadow-2xl backdrop-blur-xl transition-transform duration-500 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ borderColor: `color-mix(in oklab, ${colorVar} 25%, transparent)` }}
      >
        {node && (
          <>
            <header
              className="flex items-start justify-between gap-4 border-b px-8 pt-8 pb-5"
              style={{ borderColor: "var(--border)" }}
            >
              <div className="flex-1">
                <div
                  className="mb-2 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em]"
                  style={{ color: colorVar }}
                >
                  <span className="h-px w-6" style={{ background: colorVar }} />
                  Branch
                </div>
                <h2 className="font-display text-3xl leading-tight text-foreground">
                  {node.label}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="rounded-full border border-border p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </header>
            <div className="flex-1 overflow-y-auto px-8 py-6">
              <div className="space-y-2">
                {node.content?.map((b, i) => renderBlock(b, i, colorVar))}
              </div>
              {node.children && node.children.length > 0 && (
                <div className="mt-10 border-t pt-6" style={{ borderColor: "var(--border)" }}>
                  <div className="mb-3 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    Sub-branches
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {node.children.map((c) => (
                      <span
                        key={c.id}
                        className="rounded-full border px-3 py-1 text-xs text-foreground/80"
                        style={{
                          borderColor: `color-mix(in oklab, ${colorVar} 30%, transparent)`,
                          background: `color-mix(in oklab, ${colorVar} 8%, transparent)`,
                        }}
                      >
                        {c.label}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </aside>
    </>
  );
}