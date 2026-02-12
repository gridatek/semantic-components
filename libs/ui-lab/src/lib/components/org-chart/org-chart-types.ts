export interface OrgChartNode {
  id: string;
  name: string;
  title?: string;
  avatar?: string;
  department?: string;
  children?: OrgChartNode[];
  expanded?: boolean;
  data?: Record<string, unknown>;
}

export type OrgChartDirection = 'vertical' | 'horizontal';

export interface OrgChartNodeClickEvent {
  node: OrgChartNode;
  event: MouseEvent;
}

export interface OrgChartNodeExpandEvent {
  node: OrgChartNode;
  expanded: boolean;
}
