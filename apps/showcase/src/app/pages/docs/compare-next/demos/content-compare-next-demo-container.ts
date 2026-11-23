import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ContentCompareNextDemo } from './content-compare-next-demo';

@Component({
  selector: 'app-content-compare-next-demo-container',
  imports: [DemoContainer, ContentCompareNextDemo],
  template: `
    <app-demo-container
      title="Any content"
      [code]="code"
      demoUrl="/demos/compare-next/content-compare-next-demo"
    >
      <app-content-compare-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ContentCompareNextDemoContainer {
  private readonly code = `import { NgTemplateOutlet } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCompareNext,
  ScCompareNextAfter,
  ScCompareNextBefore,
  ScCompareNextHandle,
  ScCompareNextLabel,
  ScFrame,
} from '@semantic-components/ui';
import { SiChevronsLeftRightIcon } from '@semantic-icons/lucide-icons';

/** Not only images: the same card, in the light and the dark theme. */
@Component({
  selector: 'app-content-compare-next-demo',
  imports: [
    ScFrame,
    NgTemplateOutlet,
    ScCompareNext,
    ScCompareNextBefore,
    ScCompareNextAfter,
    ScCompareNextHandle,
    ScCompareNextLabel,
    SiChevronsLeftRightIcon,
  ],
  template: \`
    <div scCompareNext scFrame class="w-full max-w-md">
      <div scCompareNextBefore class="bg-background text-foreground p-8">
        <ng-container [ngTemplateOutlet]="card" />
      </div>
      <div scCompareNextAfter class="dark bg-background text-foreground p-8">
        <ng-container [ngTemplateOutlet]="card" />
      </div>
      <span scCompareNextLabel="before">Light</span>
      <span scCompareNextLabel="after">Dark</span>
      <div scCompareNextHandle aria-label="Light and dark theme">
        <svg siChevronsLeftRightIcon></svg>
      </div>
    </div>

    <ng-template #card>
      <div scFrame class="bg-card text-card-foreground mt-6 space-y-3 p-5">
        <p class="font-semibold">Team plan</p>
        <p class="text-muted-foreground text-sm">
          Everything in Pro, for up to ten people.
        </p>
        <p class="text-2xl font-bold">
          $49<span class="text-muted-foreground text-sm font-normal">
            / month</span
          >
        </p>
        <div
          class="bg-primary text-primary-foreground rounded-lg px-3 py-2 text-center text-sm font-medium"
        >
          Start a trial
        </div>
      </div>
    </ng-template>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ContentCompareNextDemo {}`;
}
