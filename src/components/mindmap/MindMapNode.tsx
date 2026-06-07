import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { ChevronRight, Sparkles } from "lucide-react";

export interface MindMapNodeData {
  label: string;
  branch: number; // 0 = root, 1..8
  depth: number;
  hasChildren: boolean;
  expanded: boolean;
  hasContent: boolean;
  selected?: boolean;
  onToggle: () => void;
  onOpen: () => void;
  [key: string]: unknown;
}

function MindMapNodeImpl({ data }: NodeProps) {
  const d = data as MindMapNodeData;
  const isRoot = d.depth === 0;
  const colorVar = isRoot ? "var(--primary)" : `var(--branch-${d.branch})`;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (d.hasChildren) d.onToggle();
    if (d.hasContent && !isRoot) d.onOpen();
  };

  if (isRoot) {
    return (
      <>
        <button
          onClick={handleClick}
          onPointerDown={(e) => e.stopPropagation()}
          className="nodrag nopan group relative flex cursor-pointer items-center justify-center rounded-full"
          style={{
            width: 200,
            height: 200,
            background: "var(--gradient-primary)",
            boxShadow: "var(--shadow-glow), var(--shadow-elegant)",
          }}
        >
          <div className="pointer-events-none absolute inset-1 rounded-full" style={{ background: "var(--card)" }} />
          <div className="relative z-10 flex flex-col items-center gap-2 px-6 text-center">
            <Sparkles className="h-5 w-5" style={{ color: "var(--primary)" }} />
            <div className="font-display text-2xl leading-tight" style={{ color: "var(--primary)" }}>
              Information
              <br />
              Retrieval
            </div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Module Map</div>
          </div>
        </button>
        <Handle type="source" position={Position.Right} className="!opacity-0" />
      </>
    );
  }

  return (
    <>
      <Handle type="target" position={Position.Left} className="!opacity-0" />
      <button
        onClick={handleClick}
        onPointerDown={(e) => e.stopPropagation()}
        className={`nodrag nopan group relative flex cursor-pointer items-center gap-3 rounded-2xl border bg-card/90 px-4 py-3 text-left backdrop-blur-md transition-all hover:-translate-y-0.5 hover:bg-card ${
          d.selected ? "ring-2 ring-offset-2 ring-offset-background" : ""
        }`}
        style={{
          borderColor: `color-mix(in oklab, ${colorVar} 40%, transparent)`,
          boxShadow: d.selected
            ? `0 0 0 2px ${colorVar}, 0 12px 40px -12px color-mix(in oklab, ${colorVar} 50%, transparent)`
            : `0 8px 30px -12px color-mix(in oklab, ${colorVar} 30%, transparent)`,
          minWidth: d.depth === 1 ? 240 : 200,
          maxWidth: d.depth === 1 ? 280 : 260,
        }}
      >
        <span
          className="h-9 w-1 shrink-0 rounded-full"
          style={{ background: colorVar, boxShadow: `0 0 12px ${colorVar}` }}
        />
        <div className="flex-1">
          <div
            className={`leading-tight text-foreground ${
              d.depth === 1 ? "font-display text-lg" : "text-sm font-medium"
            }`}
          >
            {d.label}
          </div>
          {d.hasChildren && (
            <div className="mt-0.5 text-[10px] uppercase tracking-widest text-muted-foreground">
              {d.expanded ? "click to collapse" : "click to expand"}
            </div>
          )}
        </div>
        {d.hasChildren && (
          <ChevronRight
            className="h-4 w-4 shrink-0 transition-transform"
            style={{
              color: colorVar,
              transform: d.expanded ? "rotate(90deg)" : "rotate(0deg)",
            }}
          />
        )}
      </button>
      <Handle type="source" position={Position.Right} className="!opacity-0" />
    </>
  );
}

export const MindMapNode = memo(MindMapNodeImpl);