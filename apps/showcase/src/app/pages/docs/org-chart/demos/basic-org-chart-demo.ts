import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScOrgChart,
  type OrgChartNode,
  type OrgChartNodeClickEvent,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-org-chart-demo',
  imports: [ScOrgChart],
  template: `
    <div class="border rounded-lg overflow-auto">
      <sc-org-chart [data]="orgData()" (nodeClick)="onNodeClick($event)" />
    </div>
    @if (selectedNode()) {
      <p class="mt-2 text-sm text-muted-foreground">
        Selected: {{ selectedNode()?.name }} - {{ selectedNode()?.title }}
      </p>
    }
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicOrgChartDemo {
  readonly selectedNode = signal<OrgChartNode | null>(null);

  readonly orgData = signal<OrgChartNode>({
    id: '1',
    name: 'Sarah Johnson',
    title: 'CEO',
    department: 'Executive',
    children: [
      {
        id: '2',
        name: 'Michael Chen',
        title: 'CTO',
        department: 'Technology',
        children: [
          {
            id: '5',
            name: 'Emily Davis',
            title: 'Engineering Manager',
            department: 'Engineering',
            children: [
              {
                id: '9',
                name: 'Alex Kim',
                title: 'Senior Developer',
                department: 'Engineering',
              },
              {
                id: '10',
                name: 'Lisa Wang',
                title: 'Developer',
                department: 'Engineering',
              },
            ],
          },
          {
            id: '6',
            name: 'James Wilson',
            title: 'DevOps Lead',
            department: 'Infrastructure',
          },
        ],
      },
      {
        id: '3',
        name: 'Amanda Rodriguez',
        title: 'CFO',
        department: 'Finance',
        children: [
          {
            id: '7',
            name: 'David Brown',
            title: 'Finance Manager',
            department: 'Finance',
          },
        ],
      },
      {
        id: '4',
        name: 'Robert Taylor',
        title: 'CMO',
        department: 'Marketing',
        children: [
          {
            id: '8',
            name: 'Jennifer Lee',
            title: 'Marketing Lead',
            department: 'Marketing',
          },
        ],
      },
    ],
  });

  onNodeClick(event: OrgChartNodeClickEvent): void {
    this.selectedNode.set(event.node);
  }
}
