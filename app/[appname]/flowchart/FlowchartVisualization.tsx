'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { questions, type QuestionId, type Religion } from '../apps/Flowchart';
import styles from './FlowchartVisualization.module.css';

interface Node {
  id: string;
  text: string;
  type: 'question' | 'religion';
  x: number;
  y: number;
}

interface Edge {
  from: string;
  to: string;
  label: string;
}

interface ViewBox {
  width: number;
  height: number;
}

const QUESTION_WRAP_WIDTH = 240;
const RELIGION_WRAP_WIDTH = 110;

function measureNodeWidth(text: string, isQuestion: boolean) {
  const maxWidth = isQuestion ? QUESTION_WRAP_WIDTH : RELIGION_WRAP_WIDTH;
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  words.forEach((word) => {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    if (testLine.length * 5.5 <= maxWidth) {
      currentLine = testLine;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  });
  if (currentLine) lines.push(currentLine);

  const longestLineLength = lines.reduce((max, line) => Math.max(max, line.length), 0);
  return isQuestion
    ? Math.max(220, longestLineLength * 12 + 36)
    : Math.max(110, longestLineLength * 12 + 30);
}

function EdgeLine({
  edge,
  nodeMap,
}: {
  edge: Edge;
  nodeMap: Map<string, Node>;
}) {
  const fromNode = nodeMap.get(edge.from);
  const toNode = nodeMap.get(edge.to);

  if (!fromNode || !toNode) return null;

  const x1 = fromNode.x;
  const y1 = fromNode.y + 30;
  const x2 = toNode.x;
  const y2 = toNode.y - 10;

  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;

  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.max(1, Math.hypot(dx, dy));
  const ux = dx / length;
  const uy = dy / length;

  const labelPadding = 10;
  const labelHeight = 32;
  const labelWidth = Math.max(70, edge.label.length * 11 + labelPadding * 2);
  const gapHalf = labelWidth / 2 + 8;

  const firstEndX = midX - ux * gapHalf;
  const firstEndY = midY - uy * gapHalf;
  const secondStartX = midX + ux * gapHalf;
  const secondStartY = midY + uy * gapHalf;

  return (
    <g key={`edge-${edge.from}-${edge.to}`}>
      <line
        x1={x1}
        y1={y1}
        x2={firstEndX}
        y2={firstEndY}
        stroke="#666"
        strokeWidth="2"
      />
      <line
        x1={secondStartX}
        y1={secondStartY}
        x2={x2}
        y2={y2}
        stroke="#666"
        strokeWidth="2"
        markerEnd="url(#arrowhead)"
      />

      <g transform={`translate(${midX}, ${midY})`}>
        <rect
          x={-labelWidth / 2}
          y={-labelHeight / 2}
          width={labelWidth}
          height={labelHeight}
          rx={6}
          fill="white"
          stroke="#d5d9df"
          strokeWidth="1.5"
        />
        <text
          textAnchor="middle"
          className={styles.edgeLabel}
          fontSize="18"
          fontWeight="700"
          y={6}
        >
          {edge.label}
        </text>
      </g>
    </g>
  );
}

export default function FlowchartVisualization() {
  // Memoize nodes and edges calculation for performance
  const { nodes, edges, viewBox } = useMemo(() => {
    const edgesList: Edge[] = [];
    const childrenMap = new Map<string, string[]>();
    const parentsMap = new Map<string, string[]>();
    const allNodeIds = new Set<string>();
    const nodeWidths = new Map<string, number>();
    const priority = new Map<string, number>([
      ['none_spirituality', -2],
      ['one_separate', 0],
      ['many_reincarnation', 3],
      ['one_interact', -1],
      ['one_idols', 1],
      ['Hindu', 8],
      ['Pagan', 6],
      ['Sikh', 4],
    ]);

    // Collect nodes and edges from the question data
    Object.values(questions).forEach((q) => {
      allNodeIds.add(q.id);
      nodeWidths.set(q.id, measureNodeWidth(q.text, true));
      q.answers.forEach((answer) => {
        allNodeIds.add(answer.next);
        edgesList.push({
          from: q.id,
          to: answer.next,
          label: answer.value,
        });
        childrenMap.set(q.id, [...(childrenMap.get(q.id) ?? []), answer.next]);
        parentsMap.set(answer.next, [...(parentsMap.get(answer.next) ?? []), q.id]);
        if (!nodeWidths.has(answer.next)) {
          nodeWidths.set(
            answer.next,
            measureNodeWidth(answer.next, false)
          );
        }
      });
    });

    // Establish a stable ordering via BFS to keep siblings consistent
    const order: string[] = [];
    const visited = new Set<string>();
    const queue: string[] = ['start'];
    visited.add('start');

    while (queue.length > 0) {
      const current = queue.shift()!;
      order.push(current);
      (childrenMap.get(current) ?? []).forEach((child) => {
        if (!visited.has(child)) {
          visited.add(child);
          queue.push(child);
        }
      });
    }

    // Add any stragglers (defensive, should not happen with current data)
    allNodeIds.forEach((id) => {
      if (!visited.has(id)) order.push(id);
    });

    const orderIndex = new Map<string, number>();
    order.forEach((id, idx) => orderIndex.set(id, idx));

    // Compute levels (depth) for each node. For nodes with multiple parents,
    // pick the deepest level to avoid overlap.
    const levels = new Map<string, number>([['start', 0]]);
    const iterations = allNodeIds.size + 5;

    for (let i = 0; i < iterations; i++) {
      let changed = false;
      edgesList.forEach((edge) => {
        const fromLevel = levels.get(edge.from);
        if (fromLevel !== undefined) {
          const proposed = fromLevel + 1;
          const current = levels.get(edge.to);
          if (current === undefined || proposed > current) {
            levels.set(edge.to, proposed);
            changed = true;
          }
        }
      });
      if (!changed) break;
    }

    const maxLevel = Math.max(...Array.from(levels.values()));
    const nodesByLevel: string[][] = Array.from({ length: maxLevel + 1 }, () => []);

    levels.forEach((level, id) => {
      nodesByLevel[level].push(id);
    });

    nodesByLevel.forEach((levelNodes) => {
      levelNodes.sort(
        (a, b) => (orderIndex.get(a) ?? 0) - (orderIndex.get(b) ?? 0)
      );
    });

    const verticalGap = 360;
    const paddingX = 160;
    const paddingY = 160;
    const siblingGutter = 160;

    // Initial x assignment: give leaves sequential slots
    const xPositions = new Map<string, number>();
    const leaves = Array.from(allNodeIds).filter(
      (id) => (childrenMap.get(id)?.length ?? 0) === 0
    );
    leaves.sort((a, b) => (orderIndex.get(a) ?? 0) - (orderIndex.get(b) ?? 0));
    let cursor = 0;
    leaves.forEach((id, idx) => {
      const width = nodeWidths.get(id) ?? 200;
      if (idx === 0) {
        xPositions.set(id, width / 2);
        cursor = width;
      } else {
        const prevId = leaves[idx - 1];
        const prevWidth = nodeWidths.get(prevId) ?? 200;
        const nextCenter =
          (xPositions.get(prevId) ?? 0) +
          prevWidth / 2 +
          siblingGutter +
          width / 2;
        xPositions.set(id, nextCenter);
        cursor = nextCenter + width / 2;
      }
    });

    // Assign internal nodes based on average of children (processed from bottom)
    const nodesByDescLevel = [...order].sort(
      (a, b) => (levels.get(b) ?? 0) - (levels.get(a) ?? 0)
    );

    nodesByDescLevel.forEach((id) => {
      const children = childrenMap.get(id) ?? [];
      if (children.length === 0) {
        if (!xPositions.has(id)) {
          xPositions.set(id, xPositions.size * (200 + siblingGutter));
        }
        return;
      }

      const childXs = children
        .map((c) => xPositions.get(c))
        .filter((v): v is number => v !== undefined);

      if (childXs.length === 0) {
        if (!xPositions.has(id)) {
          xPositions.set(id, xPositions.size * (200 + siblingGutter));
        }
        return;
      }

      const avg = childXs.reduce((sum, v) => sum + v, 0) / childXs.length;
      const existing = xPositions.get(id);
      const nextX = existing !== undefined ? (existing + avg) / 2 : avg;
      xPositions.set(id, nextX);
    });

    const placeLevel = (levelNodes: string[], getTarget: (id: string) => number) => {
      levelNodes.sort((a, b) => {
        const ta = getTarget(a) + (priority.get(a) ?? 0) * 160;
        const tb = getTarget(b) + (priority.get(b) ?? 0) * 160;
        if (ta !== tb) return ta - tb;
        const pa = priority.get(a) ?? 0;
        const pb = priority.get(b) ?? 0;
        if (pa !== pb) return pa - pb;
        return (orderIndex.get(a) ?? 0) - (orderIndex.get(b) ?? 0);
      });
      let lastCenter: number | undefined;
      let lastWidth = 0;
      levelNodes.forEach((id) => {
        const width = nodeWidths.get(id) ?? 200;
        const target = getTarget(id) + (priority.get(id) ?? 0) * 160;
        if (lastCenter === undefined) {
          xPositions.set(id, target);
          lastCenter = target;
          lastWidth = width;
          return;
        }
        const required = lastCenter + lastWidth / 2 + siblingGutter + width / 2;
        const center = Math.max(target, required);
        xPositions.set(id, center);
        lastCenter = center;
        lastWidth = width;
      });
    };

    // Top-down sweep using parents to reduce crossings
    for (let level = 1; level < nodesByLevel.length; level++) {
      const levelNodes = nodesByLevel[level];
      const getTarget = (id: string) => {
        const parents = parentsMap.get(id) ?? [];
        const vals = parents
          .map((p) => xPositions.get(p))
          .filter((v): v is number => v !== undefined);
        if (vals.length === 0) return xPositions.get(id) ?? 0;
        return vals.reduce((sum, v) => sum + v, 0) / vals.length;
      };
      placeLevel(levelNodes, getTarget);
    }

    // Bottom-up sweep using children to further reduce crossings
    for (let level = nodesByLevel.length - 2; level >= 0; level--) {
      const levelNodes = nodesByLevel[level];
      const getTarget = (id: string) => {
        const children = childrenMap.get(id) ?? [];
        const vals = children
          .map((c) => xPositions.get(c))
          .filter((v): v is number => v !== undefined);
        if (vals.length === 0) return xPositions.get(id) ?? 0;
        return vals.reduce((sum, v) => sum + v, 0) / vals.length;
      };
      placeLevel(levelNodes, getTarget);
    }

    // Manual nudges to stabilize right-side ordering
    const paganX = xPositions.get('Pagan');
    if (paganX !== undefined) {
      xPositions.set('Pagan', paganX + 260);
    }
    const hinduX = xPositions.get('Hindu');
    if (hinduX !== undefined) {
      xPositions.set('Hindu', hinduX + 520);
    }

    const minX = Math.min(
      ...Array.from(xPositions.entries()).map(([id, x]) => x - (nodeWidths.get(id) ?? 200) / 2)
    );
    const maxX = Math.max(
      ...Array.from(xPositions.entries()).map(([id, x]) => x + (nodeWidths.get(id) ?? 200) / 2)
    );
    const widthSpan = maxX - minX;

    const chartWidth = Math.max(1300, widthSpan + paddingX * 2);
    const chartHeight = Math.max(900, maxLevel * verticalGap + paddingY * 2);

    const nodesList: Node[] = [];
    nodesByLevel.forEach((levelNodes, levelIndex) => {
      levelNodes.forEach((id) => {
        const rawX = xPositions.get(id) ?? 0;
        nodesList.push({
          id,
          text: (questions as Record<string, { text: string }>)[id]?.text ?? id,
          type: (questions as Record<string, { text: string }>)[id] ? 'question' : 'religion',
          x: rawX - minX + paddingX,
          y: paddingY + levelIndex * verticalGap,
        });
      });
    });

    return { nodes: nodesList, edges: edgesList, viewBox: { width: chartWidth, height: chartHeight } as ViewBox };
  }, []); // Empty deps since questions is imported constant

  const nodeMap = useMemo(
    () => new Map<string, Node>(nodes.map((n) => [n.id, n])),
    [nodes]
  );

  // Error handling: check if we have nodes and edges
  if (!nodes || nodes.length === 0) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Flowchart</h1>
        <p className={styles.description}>Unable to load flowchart data.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Flowchart</h1>
      <p className={styles.description}>
        Visual representation of the decision tree
      </p>

      <Link href="/whichreligion" className={styles.tryQuizButton}>
        Try the Interactive Quiz →
      </Link>

      <div className={styles.flowchartContainer}>
        <svg 
          className={styles.svg} 
          viewBox={`0 0 ${viewBox.width} ${viewBox.height}`} 
          preserveAspectRatio="xMidYMin meet"
          role="img"
          aria-labelledby="flowchart-title"
          aria-label="Flowchart visualization of religion decision tree"
        >
          {/* Render edges with inline labels */}
          {edges.map((edge) => (
            <EdgeLine key={`edge-${edge.from}-${edge.to}`} edge={edge} nodeMap={nodeMap} />
          ))}

          {/* Arrow marker definition */}
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 10 3, 0 6" fill="#666" />
            </marker>
          </defs>

          {/* Render nodes */}
          {nodes.map((node) => {
            // Calculate text wrapping for long text - adjusted based on node type
            const isReligion = node.type === 'religion';
            const maxWidth = isReligion ? 110 : 240;
            const words = node.text.split(' ');
            const lines: string[] = [];
            let currentLine = '';

            words.forEach((word) => {
              const testLine = currentLine ? `${currentLine} ${word}` : word;
              if (testLine.length * 5.5 <= maxWidth) {
                currentLine = testLine;
              } else {
                if (currentLine) lines.push(currentLine);
                currentLine = word;
              }
            });
            if (currentLine) lines.push(currentLine);

            const lineHeight = 24;
            const totalHeight = lines.length * lineHeight;
            const startY = node.y - totalHeight / 2 + lineHeight / 2;

            // Special handling for Pagan node to show it can be reached from two paths
            const isPagan = node.id === 'Pagan';
            // Religion nodes should be sized to fit text properly, questions sized based on content
            const longestLineLength = lines.reduce((max, line) => Math.max(max, line.length), 0);
            const nodeWidth = isReligion 
              ? Math.max(120, longestLineLength * 13 + 28)
              : Math.max(240, longestLineLength * 13 + 36);
            const nodeHeight = Math.max(isReligion ? 46 : 60, totalHeight + (isReligion ? 10 : 12));

            return (
              <g key={node.id}>
                <rect
                  x={node.x - nodeWidth / 2}
                  y={node.y - nodeHeight / 2}
                  width={nodeWidth}
                  height={nodeHeight}
                  rx="8"
                  className={node.type === 'question' ? styles.questionNode : styles.religionNode}
                  strokeDasharray={isPagan ? "5,5" : undefined}
                  strokeWidth={isPagan ? "3" : "2"}
                />
                {lines.map((line, idx) => (
                  <text
                    key={idx}
                    x={node.x}
                    y={startY + idx * lineHeight}
                    textAnchor="middle"
                    className={styles.nodeText}
                    fontSize="24"
                  >
                    {line}
                  </text>
                ))}
                {isPagan && (
                  <text
                    x={node.x}
                    y={node.y + nodeHeight / 2 + 26}
                    textAnchor="middle"
                    className={styles.paganNote}
                    fontSize="16"
                    fill="#666"
                    fontStyle="italic"
                    fontWeight="500"
                  >
                    (2 paths)
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
