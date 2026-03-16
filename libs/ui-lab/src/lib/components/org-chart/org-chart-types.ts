import { InjectionToken } from '@angular/core';
import type { ScOrgChart } from './org-chart';

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

export type ScOrgChartDirection = 'vertical' | 'horizontal';

export interface ScOrgChartNodeExpandEvent {
  node: OrgChartNode;
  expanded: boolean;
}

export interface ScOrgChartNodeDefContext {
  $implicit: OrgChartNode;
  expanded: boolean;
  hasChildren: boolean;
  toggle: () => void;
}

export const SC_ORG_CHART = new InjectionToken<ScOrgChart>('SC_ORG_CHART');
