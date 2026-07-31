import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  type OrgChartNode,
  ScOrgChart,
  ScOrgChartCard,
  ScOrgChartNode,
  ScOrgChartNodeDef,
} from '@semantic-components/ui-lab';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-large-org-chart-demo',
  imports: [
    ScOrgChart,
    ScOrgChartCard,
    ScOrgChartNode,
    ScOrgChartNodeDef,
    SiChevronDownIcon,
  ],
  template: `
    <div class="max-h-[500px] overflow-auto rounded-lg border">
      <div scOrgChart>
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
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class LargeOrgChartDemo {
  readonly orgData = signal<OrgChartNode>({
    id: '1',
    name: 'Patricia Moore',
    title: 'CEO',
    department: 'Executive Office',
    children: [
      {
        id: '2',
        name: 'Thomas Anderson',
        title: 'COO',
        department: 'Operations',
        children: [
          {
            id: '8',
            name: 'Nancy White',
            title: 'Operations Director',
            department: 'Operations',
            children: [
              {
                id: '15',
                name: 'Mark Johnson',
                title: 'Operations Manager',
                department: 'Operations',
              },
              {
                id: '16',
                name: 'Susan Clark',
                title: 'Process Analyst',
                department: 'Operations',
              },
            ],
          },
          {
            id: '9',
            name: 'Kevin Hall',
            title: 'Logistics Director',
            department: 'Logistics',
          },
        ],
      },
      {
        id: '3',
        name: 'Jennifer Martinez',
        title: 'CTO',
        department: 'Technology',
        children: [
          {
            id: '10',
            name: 'Brian Lee',
            title: 'VP Engineering',
            department: 'Engineering',
            children: [
              {
                id: '17',
                name: 'Chris Evans',
                title: 'Tech Lead',
                department: 'Engineering',
              },
              {
                id: '18',
                name: 'Diana Prince',
                title: 'Tech Lead',
                department: 'Engineering',
              },
              {
                id: '19',
                name: 'Bruce Wayne',
                title: 'Architect',
                department: 'Engineering',
              },
            ],
          },
          {
            id: '11',
            name: 'Rachel Green',
            title: 'VP Product',
            department: 'Product',
            children: [
              {
                id: '20',
                name: 'Monica Geller',
                title: 'Product Manager',
                department: 'Product',
              },
            ],
          },
        ],
      },
      {
        id: '4',
        name: 'William Brown',
        title: 'CFO',
        department: 'Finance',
        expanded: false,
        children: [
          {
            id: '12',
            name: 'Laura Palmer',
            title: 'Finance Director',
            department: 'Finance',
          },
          {
            id: '13',
            name: 'Dale Cooper',
            title: 'Controller',
            department: 'Finance',
          },
        ],
      },
      {
        id: '5',
        name: 'Elizabeth Taylor',
        title: 'CHRO',
        department: 'Human Resources',
        children: [
          {
            id: '14',
            name: 'Harry Potter',
            title: 'HR Director',
            department: 'Human Resources',
          },
        ],
      },
      {
        id: '6',
        name: 'Richard Garcia',
        title: 'CMO',
        department: 'Marketing',
      },
      {
        id: '7',
        name: 'Sandra Wilson',
        title: 'CLO',
        department: 'Legal',
      },
    ],
  });

  getInitials(name: string): string {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
}
