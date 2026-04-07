export type GraphDirection = 'horizontal' | 'vertical';

export interface GraphNode {
  id: string;
  title: string;
  state: 'blocked' | 'low' | 'good' | 'excellent' | 'perfect' | 'neutral';
  deep: number;
}

export interface GraphEdge {
  from: string;
  to: string;
}

export interface PositionedNode extends GraphNode {
  level: number;
  x: number;
  y: number;
}
