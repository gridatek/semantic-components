import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { NonCollapsibleOrgChartDemo } from './non-collapsible-org-chart-demo';

@Component({
  selector: 'app-non-collapsible-org-chart-demo-container',
  imports: [DemoContainer, NonCollapsibleOrgChartDemo],
  template: `
    <app-demo-container title="Non-collapsible" [code]="code">
      <app-non-collapsible-org-chart-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NonCollapsibleOrgChartDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScOrgChart, type OrgChartNode } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-non-collapsible-org-chart-demo',
  imports: [ScOrgChart],
  template: \`
    <div class="border rounded-lg overflow-auto">
      <sc-org-chart [data]="orgData()" [collapsible]="false" />
    </div>
  \`,
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
}`;
}
