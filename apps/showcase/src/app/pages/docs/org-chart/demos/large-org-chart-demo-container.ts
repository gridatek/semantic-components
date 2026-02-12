import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { LargeOrgChartDemo } from './large-org-chart-demo';

@Component({
  selector: 'app-large-org-chart-demo-container',
  imports: [DemoContainer, LargeOrgChartDemo],
  template: `
    <app-demo-container title="Large Organization" [code]="code">
      <app-large-org-chart-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LargeOrgChartDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScOrgChart, type OrgChartNode } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-large-org-chart-demo',
  imports: [ScOrgChart],
  template: \`
    <div class="border rounded-lg overflow-auto max-h-[500px]">
      <sc-org-chart [data]="orgData()" />
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
}`;
}
