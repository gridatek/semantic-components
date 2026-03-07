import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { type OrgChartNode, ScOrgChart } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-non-collapsible-org-chart-demo',
  imports: [ScOrgChart],
  template: `
    <div class="overflow-auto rounded-lg border">
      <sc-org-chart [data]="orgData()" [collapsible]="false" />
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
}
