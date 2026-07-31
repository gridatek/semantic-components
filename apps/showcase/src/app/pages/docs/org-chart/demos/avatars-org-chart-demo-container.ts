import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { AvatarsOrgChartDemo } from './avatars-org-chart-demo';

@Component({
  selector: 'app-avatars-org-chart-demo-container',
  imports: [DemoContainer, AvatarsOrgChartDemo],
  template: `
    <app-demo-container title="With Avatars" [code]="code">
      <app-avatars-org-chart-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class AvatarsOrgChartDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  type OrgChartNode,
  ScOrgChart,
  ScOrgChartCard,
  ScOrgChartNode,
  ScOrgChartNodeDef,
} from '@semantic-components/ui-lab';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-avatars-org-chart-demo',
  imports: [
    ScOrgChart,
    ScOrgChartCard,
    ScOrgChartNode,
    ScOrgChartNodeDef,
    SiChevronDownIcon,
  ],
  template: \`
    <div class="overflow-auto rounded-lg border">
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
            @if (node.avatar) {
              <img
                [src]="node.avatar"
                [alt]="node.name"
                class="h-12 w-12 shrink-0 rounded-full object-cover"
              />
            } @else {
              <div
                class="bg-primary/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
              >
                <span class="text-primary text-lg font-semibold">
                  {{ getInitials(node.name) }}
                </span>
              </div>
            }
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
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class AvatarsOrgChartDemo {
  readonly orgData = signal<OrgChartNode>({
    id: '1',
    name: 'Sarah Johnson',
    title: 'CEO',
    avatar: 'https://i.pravatar.cc/150?u=sarah',
    children: [
      {
        id: '2',
        name: 'Michael Chen',
        title: 'CTO',
        avatar: 'https://i.pravatar.cc/150?u=michael',
        children: [
          {
            id: '5',
            name: 'Emily Davis',
            title: 'Engineering Manager',
            avatar: 'https://i.pravatar.cc/150?u=emily',
          },
          {
            id: '6',
            name: 'James Wilson',
            title: 'DevOps Lead',
            avatar: 'https://i.pravatar.cc/150?u=james',
          },
        ],
      },
      {
        id: '3',
        name: 'Amanda Rodriguez',
        title: 'CFO',
        avatar: 'https://i.pravatar.cc/150?u=amanda',
      },
      {
        id: '4',
        name: 'Robert Taylor',
        title: 'CMO',
        avatar: 'https://i.pravatar.cc/150?u=robert',
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
}`;
}
