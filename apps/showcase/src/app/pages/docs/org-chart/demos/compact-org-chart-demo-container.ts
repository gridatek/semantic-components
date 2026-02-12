import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { CompactOrgChartDemo } from './compact-org-chart-demo';

@Component({
  selector: 'app-compact-org-chart-demo-container',
  imports: [DemoContainer, CompactOrgChartDemo],
  template: `
    <app-demo-container title="Compact" [code]="code">
      <app-compact-org-chart-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompactOrgChartDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScOrgChart, type OrgChartNode } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-compact-org-chart-demo',
  imports: [ScOrgChart],
  template: \`
    <div class="border rounded-lg overflow-auto">
      <sc-org-chart [data]="orgData()" [compact]="true" />
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompactOrgChartDemo {
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
}`;
}
