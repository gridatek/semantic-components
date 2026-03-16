import {
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
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-non-collapsible-org-chart-demo',
  imports: [ScOrgChart, ScOrgChartCard, ScOrgChartNode, ScOrgChartNodeDef],
  template: `
    <div class="overflow-auto rounded-lg border">
      <div scOrgChart [collapsible]="false">
        <sc-org-chart-node [node]="orgData()" />

        <ng-template scOrgChartNodeDef let-node let-hasChildren="hasChildren">
          <button
            scOrgChartCard
            [attr.aria-label]="
              node.name + (node.title ? ', ' + node.title : '')
            "
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
          </button>
        </ng-template>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NonCollapsibleOrgChartDemo {
  readonly orgData = signal<OrgChartNode>({
    id: '1',
    name: 'John Smith',
    title: 'Team Lead',
    children: [
      { id: '2', name: 'Alice Brown', title: 'Developer' },
      { id: '3', name: 'Bob Wilson', title: 'Designer' },
      { id: '4', name: 'Carol Davis', title: 'QA Engineer' },
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
