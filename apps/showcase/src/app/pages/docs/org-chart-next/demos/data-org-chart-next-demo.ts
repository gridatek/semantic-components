import { NgTemplateOutlet } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScOrgChartNext,
  ScOrgChartNextCard,
  ScOrgChartNextExpandIcon,
  ScOrgChartNextGroup,
  ScOrgChartNextItem,
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
  selector: 'app-data-org-chart-next-demo',
  imports: [
    NgTemplateOutlet,
    ScOrgChartNext,
    ScOrgChartNextItem,
    ScOrgChartNextCard,
    ScOrgChartNextGroup,
    ScOrgChartNextExpandIcon,
    SiChevronDownIcon,
  ],
  template: `
    <ul scOrgChartNext aria-label="Leadership">
      <ng-container
        *ngTemplateOutlet="
          node;
          context: { $implicit: team, level: 1 };
          injector: 'outlet'
        "
      />
    </ul>

    <ng-template #node let-person let-level="level">
      <li scOrgChartNextItem [value]="person.id" [expanded]="level < 2">
        <div scOrgChartNextCard>
          <div class="grid">
            <span class="font-medium">{{ person.name }}</span>
            <span class="text-muted-foreground text-xs">{{
              person.title
            }}</span>
          </div>
          @if (person.children?.length) {
            <svg siChevronDownIcon scOrgChartNextExpandIcon></svg>
          }
        </div>
        @if (person.children?.length) {
          <ul scOrgChartNextGroup>
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
  `,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class DataOrgChartNextDemo {
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
}
