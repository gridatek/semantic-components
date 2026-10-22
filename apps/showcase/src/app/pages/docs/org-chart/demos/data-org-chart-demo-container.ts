import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DataOrgChartDemo } from './data-org-chart-demo';

@Component({
  selector: 'app-data-org-chart-demo-container',
  imports: [DemoContainer, DataOrgChartDemo],
  template: `
    <app-demo-container
      title="From data"
      [code]="code"
      demoUrl="/demos/org-chart/data-org-chart-demo"
    >
      <app-data-org-chart-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DataOrgChartDemoContainer {
  readonly code = `import { NgTemplateOutlet } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScOrgChart,
  ScOrgChartCard,
  ScOrgChartExpandIcon,
  ScOrgChartGroup,
  ScOrgChartItem,
} from '@semantic-components/ui-lab';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

interface Person {
  id: string;
  name: string;
  title: string;
  children?: Person[];
}

/** From your own data: a template that writes a person, then — for each report — itself, with the outlet’s injector (so each report finds its group). Any shape; here, those below the second level start closed. */
@Component({
  selector: 'app-data-org-chart-demo',
  imports: [
    NgTemplateOutlet,
    ScOrgChart,
    ScOrgChartItem,
    ScOrgChartCard,
    ScOrgChartGroup,
    ScOrgChartExpandIcon,
    SiChevronDownIcon,
  ],
  template: \`
    <ul scOrgChart aria-label="Leadership">
      <ng-container
        *ngTemplateOutlet="
          node;
          context: { $implicit: team, level: 1 };
          injector: 'outlet'
        "
      />
    </ul>

    <ng-template #node let-person let-level="level">
      <li scOrgChartItem [value]="person.id" [expanded]="level < 2">
        <div scOrgChartCard>
          <div class="grid">
            <span class="font-medium">{{ person.name }}</span>
            <span class="text-muted-foreground text-xs">{{
              person.title
            }}</span>
          </div>
          @if (person.children?.length) {
            <svg siChevronDownIcon scOrgChartExpandIcon></svg>
          }
        </div>
        @if (person.children?.length) {
          <ul scOrgChartGroup>
            @for (report of person.children; track report.id) {
              <ng-container
                *ngTemplateOutlet="
                  node;
                  context: { $implicit: report, level: level + 1 };
                  injector: 'outlet'
                "
              />
            }
          </ul>
        }
      </li>
    </ng-template>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class DataOrgChartDemo {
  readonly team: Person = {
    id: 'ada',
    name: 'Ada Lovelace',
    title: 'Chief Executive',
    children: [
      {
        id: 'grace',
        name: 'Grace Hopper',
        title: 'Chief Technology Officer',
        children: [
          {
            id: 'alan',
            name: 'Alan Turing',
            title: 'Platform Lead',
          },
          {
            id: 'katherine',
            name: 'Katherine Johnson',
            title: 'Data Lead',
          },
        ],
      },
      {
        id: 'margaret',
        name: 'Margaret Hamilton',
        title: 'Chief Financial Officer',
      },
      {
        id: 'hedy',
        name: 'Hedy Lamarr',
        title: 'Chief Operating Officer',
        children: [
          {
            id: 'linus',
            name: 'Linus Torvalds',
            title: 'Operations Lead',
          },
        ],
      },
    ],
  };
}`;
}
