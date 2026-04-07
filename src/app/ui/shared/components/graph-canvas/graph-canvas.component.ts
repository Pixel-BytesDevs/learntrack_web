import { Component, computed, input, Input, OnInit } from '@angular/core';
import { GraphLayoutEngine } from '../graph-layout/graph-layout.service';
import {
	GraphDirection,
	GraphEdge,
	GraphNode,
	PositionedNode,
} from '../graph-layout/graph-layout.data';
import { NgFor } from '@angular/common';
import { GraphNodeComponent } from './graph-node/graph-node.component';

interface TotalByDeep {
	deep: number;
	total: number;
}

interface NodePosition {
	data: GraphNode;
	x: number;
	y: number;
}

export interface EdgeN {
	from: string;
	to: string;
}

interface EdgeLine {
	x1: number;
	y1: number;
	x2: number;
	y2: number;
}

@Component({
	selector: 'graph-canvas',
	imports: [GraphNodeComponent],
	templateUrl: './graph-canvas.component.html',
	styleUrl: './graph-canvas.component.scss',
})
export class GraphCanvasComponent implements OnInit {
	NODE_WIDTH = 300;
	NODE_HEIGHT = 95;
	GAP_X = 50;
	GAP_Y = 50;

	STEP_X = this.NODE_WIDTH + this.GAP_X;
	STEP_Y = this.NODE_HEIGHT + this.GAP_Y;

	nodes = input<GraphNode[]>();
	edges = input<EdgeN[]>();

	nodesWithPosition = computed<NodePosition[]>(() => {
		const nodes = this.nodes();
		const edges = this.edges();

		if (!nodes || !edges || nodes.length === 0) return [];

		const tree = this.buildTree(edges);
		const root = this.findRoot(nodes, edges);

		const nodeMap = new Map(nodes.map((n) => [n.id, n]));
		const result: NodePosition[] = [];

		const subtreeSizes = new Map<string, number>();
		this.calculateSubtreeSize(root.id, tree, subtreeSizes);

		this.layoutTree(root.id, 0, 0, tree, nodeMap, result, subtreeSizes);

		return result;
	});

	nodesPositionMap = computed(() => {
		const map = new Map<string, NodePosition>();
		this.nodesWithPosition().forEach((n) => {
			map.set(n.data.id, n);
		});
		return map;
	});

	edgeLines = computed<EdgeLine[]>(() => {
		const edges = this.edges();
		const posMap = this.nodesPositionMap();

		if (!edges) return [];

		return edges
			.map((edge) => {
				const from = posMap.get(edge.from);
				const to = posMap.get(edge.to);

				if (!from || !to) return null;

				return {
					x1: from.x + this.NODE_WIDTH,
					y1: from.y + this.NODE_HEIGHT / 2,
					x2: to.x,
					y2: to.y + this.NODE_HEIGHT / 2,
				};
			})
			.filter(Boolean) as EdgeLine[];
	});

	ngOnInit(): void {
		// this.calculateAllPositions();
	}

	buildTree(edges: EdgeN[]): Map<string, string[]> {
		const tree = new Map<string, string[]>();

		edges.forEach(({ from, to }) => {
			if (!tree.has(from)) tree.set(from, []);
			tree.get(from)!.push(to);
		});

		return tree;
	}

	findRoot(nodes: GraphNode[], edges: EdgeN[]): GraphNode {
		const children = new Set(edges.map((e) => e.to));
		return nodes.find((n) => !children.has(n.id))!;
	}

	calculateSubtreeSize(
		nodeId: string,
		tree: Map<string, string[]>,
		memo = new Map<string, number>(),
	): number {
		if (memo.has(nodeId)) return memo.get(nodeId)!;

		const children = tree.get(nodeId) ?? [];
		let size = 1;

		children.forEach((child) => {
			size += this.calculateSubtreeSize(child, tree, memo);
		});

		memo.set(nodeId, size);
		return size;
	}

	layoutTree(
		nodeId: string,
		x: number,
		y: number,
		tree: Map<string, string[]>,
		nodeMap: Map<string, GraphNode>,
		result: NodePosition[],
		subtreeSizes: Map<string, number>,
	) {
		const node = nodeMap.get(nodeId)!;

		result.push({ data: node, x, y });

		const children = tree.get(nodeId) ?? [];
		if (children.length === 0) return;

		let currentY = y;

		children.forEach((childId) => {
			const childSize = subtreeSizes.get(childId)!;
			const childHeight = childSize * this.STEP_Y;

			const childX = x + this.STEP_X;
			const childY = currentY + childHeight / 2;

			this.layoutTree(
				childId,
				childX,
				childY,
				tree,
				nodeMap,
				result,
				subtreeSizes,
			);

			currentY += childHeight;
		});
	}

	getBezierPath(x1: number, y1: number, x2: number, y2: number): string {
		// Calcular la distancia horizontal
		const dist = Math.abs(x2 - x1);

		// LÓGICA DE SIMPLICIDAD:
		// 1. La curvatura es proporcional a la distancia (40% de la distancia).
		// 2. Le ponemos un tope máximo (ej. 80px) para que en distancias largas
		//    la línea no haga una "panza" gigante, sino que se vaya aplanando.
		const curvature = Math.min(dist * 0.4, 80);

		// Puntos de control más cerrados
		const cp1x = x1 + curvature;
		const cp1y = y1;

		const cp2x = x2 - curvature;
		const cp2y = y2;

		return `M ${x1} ${y1} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x2} ${y2}`;
	}

	nodeTransform(node: NodePosition): string {
		console.log(node.data.title, node.x, node.y);
		return `translate(${node.x}px, ${node.y}px)`;
	}
}
