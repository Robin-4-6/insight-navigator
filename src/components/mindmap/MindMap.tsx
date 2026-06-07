import { useCallback, useMemo, useState } from "react";
import {
  Background,
  Controls,
  ReactFlow,
  ReactFlowProvider,
  type Edge,
  type Node,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { mindmap, type MindNode } from "@/data/ir-mindmap";
import { MindMapNode } from "./MindMapNode";
import { NodeDetail } from "./NodeDetail";

const nodeTypes = { mind: MindMapNode };

// Layout constants
const ROOT_X = 0;
const ROOT_Y = 0;
const BRANCH_RADIUS = 520; // distance from root to depth-1 branches
const LEAF_X_OFFSET = 360; // horizontal distance from depth-1 node to its children
const LEAF_V_SPACING = 78;

function flatten(node: MindNode, map: Map<string, MindNode>) {
  map.set(node.id, node);
  node.children?.forEach((c) => flatten(c, map));
}

function MindMapInner() {
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set(["root"]));
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const nodeIndex = useMemo(() => {
    const m = new Map<string, MindNode>();
    flatten(mindmap, m);
    return m;
  }, []);

  const toggle = useCallback((id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const { nodes, edges } = useMemo(() => {
    const ns: Node[] = [];
    const es: Edge[] = [];

    const branches = mindmap.children ?? [];
    const total = branches.length;

    // Root
    ns.push({
      id: mindmap.id,
      type: "mind",
      position: { x: ROOT_X - 100, y: ROOT_Y - 100 },
      data: {
        label: mindmap.label,
        branch: 0,
        depth: 0,
        hasChildren: true,
        expanded: expanded.has(mindmap.id),
        hasContent: !!mindmap.content?.length,
        onToggle: () => toggle(mindmap.id),
        onOpen: () => setSelectedId(mindmap.id),
      },
      draggable: false,
    });

    if (!expanded.has(mindmap.id)) return { nodes: ns, edges: es };

    // Distribute branches around root in a circle (full 360 if many, else arc)
    branches.forEach((branch, i) => {
      // Spread evenly around the circle, starting at top
      const angle = (i / total) * Math.PI * 2 - Math.PI / 2;
      const bx = ROOT_X + Math.cos(angle) * BRANCH_RADIUS;
      const by = ROOT_Y + Math.sin(angle) * BRANCH_RADIUS;

      const isExpanded = expanded.has(branch.id);
      const isSelected = selectedId === branch.id;

      ns.push({
        id: branch.id,
        type: "mind",
        position: { x: bx - 130, y: by - 28 },
        data: {
          label: branch.label,
          branch: branch.branch ?? i + 1,
          depth: 1,
          hasChildren: !!branch.children?.length,
          expanded: isExpanded,
          hasContent: !!branch.content?.length,
          selected: isSelected,
          onToggle: () => toggle(branch.id),
          onOpen: () => setSelectedId(branch.id),
        },
        draggable: false,
      });

      es.push({
        id: `e-${mindmap.id}-${branch.id}`,
        source: mindmap.id,
        target: branch.id,
        type: "default",
        animated: false,
        style: {
          stroke: `var(--branch-${branch.branch ?? i + 1})`,
          strokeWidth: 1.5,
          opacity: 0.55,
        },
      });

      // Children of this branch — fan out to the side facing away from root
      if (isExpanded && branch.children?.length) {
        const kids = branch.children;
        // direction outward from root
        const dirX = Math.cos(angle);
        // Lay children in a vertical column offset outward from branch
        const colX = bx + dirX * LEAF_X_OFFSET;
        const startY = by - ((kids.length - 1) * LEAF_V_SPACING) / 2;

        kids.forEach((kid, k) => {
          const kx = colX - (dirX < 0 ? 200 : 0);
          const ky = startY + k * LEAF_V_SPACING;
          const kidSelected = selectedId === kid.id;

          ns.push({
            id: kid.id,
            type: "mind",
            position: { x: kx - 110, y: ky - 24 },
            data: {
              label: kid.label,
              branch: kid.branch ?? branch.branch ?? i + 1,
              depth: 2,
              hasChildren: !!kid.children?.length,
              expanded: false,
              hasContent: !!kid.content?.length,
              selected: kidSelected,
              onToggle: () => setSelectedId(kid.id),
              onOpen: () => setSelectedId(kid.id),
            },
            draggable: false,
          });

          es.push({
            id: `e-${branch.id}-${kid.id}`,
            source: branch.id,
            target: kid.id,
            type: "default",
            style: {
              stroke: `var(--branch-${branch.branch ?? i + 1})`,
              strokeWidth: 1,
              opacity: 0.4,
            },
          });
        });
      }
    });

    return { nodes: ns, edges: es };
  }, [expanded, selectedId, toggle]);

  const selectedNode = selectedId ? nodeIndex.get(selectedId) ?? null : null;

  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.25, maxZoom: 1 }}
        minZoom={0.2}
        maxZoom={1.6}
        proOptions={{ hideAttribution: true }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable
        onNodeClick={(_e, node) => {
          const d = node.data as { hasChildren?: boolean; hasContent?: boolean; depth?: number };
          if (d.hasChildren) toggle(node.id);
          if (d.hasContent && d.depth !== 0) setSelectedId(node.id);
        }}
        panOnScroll
        zoomOnScroll={false}
        zoomOnPinch
      >
        <Background gap={32} size={1} color="oklch(0.60 0.10 310 / 0.35)" />
        <Controls
          showInteractive={false}
          className="!rounded-xl !border !border-border !bg-card/80 !shadow-elegant !backdrop-blur-md"
        />
      </ReactFlow>

      <NodeDetail node={selectedNode} onClose={() => setSelectedId(null)} />
    </>
  );
}

export function MindMap() {
  return (
    <ReactFlowProvider>
      <MindMapInner />
    </ReactFlowProvider>
  );
}