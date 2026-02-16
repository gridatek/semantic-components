import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
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
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarsOrgChartDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScOrgChart, type OrgChartNode } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-avatars-org-chart-demo',
  imports: [ScOrgChart],
  template: \`
    <div class="border rounded-lg overflow-auto">
      <sc-org-chart [data]="orgData()" />
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
}`;
}
