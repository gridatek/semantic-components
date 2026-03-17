import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicOrgChartDemo } from './basic-org-chart-demo';

@Component({
  selector: 'app-basic-org-chart-demo-container',
  imports: [DemoContainer, BasicOrgChartDemo],
  template: `
    <app-demo-container title="Basic" [code]="code">
      <app-basic-org-chart-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicOrgChartDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  type OrgChartNode,
  ScOrgChart,
  ScOrgChartCard,
  ScOrgChartNode,
  ScOrgChartNodeDef,
  type ScOrgChartNodeExpandEvent,
} from '@semantic-components/ui-lab';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-basic-org-chart-demo',
  imports: [
    ScOrgChart,
    ScOrgChartCard,
    ScOrgChartNode,
    ScOrgChartNodeDef,
    SiChevronDownIcon,
  ],
  template: \`
    <div class="overflow-auto rounded-lg border">
      <div scOrgChart [collapsible]="true" (nodeExpand)="onNodeExpand($event)">
        <sc-org-chart-node [node]="orgData()" />

        <ng-template
          scOrgChartNodeDef
          let-node
          let-expanded="expanded"
          let-hasChildren="hasChildren"
          let-toggle="toggle"
        >
          <button
            scOrgChartCard
            [attr.aria-expanded]="hasChildren ? expanded : null"
            [attr.aria-label]="
              node.name + (node.title ? ', ' + node.title : '')
            "
            (click)="toggle()"
          >
            <div
              class="bg-primary/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
            >
              <span class="text-primary text-lg font-semibold">
                {{ getInitials(node.name) }}
              </span>
            </div>
            <div class="min-w-0 flex-1 text-left">
              <p class="truncate text-sm font-semibold">{{ node.name }}</p>
              @if (node.title) {
                <p class="text-muted-foreground truncate text-xs">
                  {{ node.title }}
                </p>
              }
            </div>
            @if (hasChildren) {
              <svg
                siChevronDownIcon
                [class]="
                  expanded
                    ? 'text-muted-foreground rotate-180 transition-transform duration-200'
                    : 'text-muted-foreground transition-transform duration-200'
                "
              ></svg>
            }
          </button>
        </ng-template>
      </div>
    </div>
    @if (selectedNode()) {
      <p class="text-muted-foreground mt-2 text-sm">
        Selected: {{ selectedNode()?.name }} - {{ selectedNode()?.title }}
      </p>
    }
  \`,
  host: { class: 'flex w-full justify-center' },
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

  onNodeExpand(event: ScOrgChartNodeExpandEvent): void {
    this.selectedNode.set(event.node);
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
}`;
}
