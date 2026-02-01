import {
	GraphDirection,
	GraphEdge,
	GraphNode,
	PositionedNode,
} from './graph-layout.data';

export class GraphLayoutEngine {
	private readonly H_SPACING = 220;
	private readonly V_SPACING = 120;

	layout(
		nodes: GraphNode[],
		edges: GraphEdge[],
		direction: GraphDirection = 'horizontal',
	): PositionedNode[] {
		const nodeMap = new Map<string, GraphNode>();
        
		nodes.forEach((n) => nodeMap.set(n.id, n));

		// 1️⃣ construir dependencias
		const parents = new Map<string, string[]>();
		nodes.forEach((n) => parents.set(n.id, []));

		edges.forEach((e) => {
			parents.get(e.to)?.push(e.from);
		});

		const children = new Map<string, string[]>();
		nodes.forEach((n) => children.set(n.id, []));

		edges.forEach((e) => {
			children.get(e.from)?.push(e.to);
		});

		// 2️⃣ calcular niveles
		const levelMap = new Map<string, number>();

		const computeLevel = (id: string): number => {
			if (levelMap.has(id)) return levelMap.get(id)!;

			const p = parents.get(id) ?? [];
			if (p.length === 0) {
				levelMap.set(id, 0);
				return 0;
			}

			const level = Math.max(...p.map((pid) => computeLevel(pid))) + 1;

			levelMap.set(id, level);
			return level;
		};

		nodes.forEach((n) => computeLevel(n.id));

		// 3️⃣ agrupar por nivel
		const levels = new Map<number, GraphNode[]>();
		nodes.forEach((n) => {
			const lvl = levelMap.get(n.id)!;
			if (!levels.has(lvl)) levels.set(lvl, []);
			levels.get(lvl)!.push(n);
		});

		const positioned: PositionedNode[] = [];
		const positionIndex = new Map<string, number>();

		[...levels.entries()]
			.sort(([a], [b]) => a - b)
			.forEach(([level, levelNodes]) => {
				const sortedNodes =
					level === 0
						? levelNodes
						: this.sortLevel(levelNodes, parents, positionIndex);

				sortedNodes.forEach((node, index) => {
					positionIndex.set(node.id, index);

					const count = sortedNodes.length;

					// 👉 si hay un solo nodo en el nivel, lo centramos
					const offset = count === 1 ? this.V_SPACING : index * this.V_SPACING;

					const x =
						direction === 'horizontal' ? level * this.H_SPACING : offset;

					const y =
						direction === 'horizontal' ? offset : level * this.V_SPACING;

					positioned.push({
						...node,
						level,
						x,
						y,
					});
				});
			});

		return positioned;
	}

	private sortLevel(
		levelNodes: GraphNode[],
		parents: Map<string, string[]>,
		prevLevelPositions: Map<string, number>,
	): GraphNode[] {
		return [...levelNodes].sort((a, b) => {
			const aParents = parents.get(a.id) ?? [];
			const bParents = parents.get(b.id) ?? [];

			const aAvg =
				aParents.length === 0
					? Number.MAX_SAFE_INTEGER
					: aParents.reduce((s, p) => s + (prevLevelPositions.get(p) ?? 0), 0) /
						aParents.length;

			const bAvg =
				bParents.length === 0
					? Number.MAX_SAFE_INTEGER
					: bParents.reduce((s, p) => s + (prevLevelPositions.get(p) ?? 0), 0) /
						bParents.length;

			return aAvg - bAvg;
		});
	}
}
