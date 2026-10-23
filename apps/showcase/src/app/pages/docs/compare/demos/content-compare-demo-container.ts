import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ContentCompareDemo } from './content-compare-demo';

@Component({
  selector: 'app-content-compare-demo-container',
  imports: [DemoContainer, ContentCompareDemo],
  template: `
    <app-demo-container
      title="Any content"
      [code]="code"
      demoUrl="/demos/compare/content-compare-demo"
    >
      <app-content-compare-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ContentCompareDemoContainer {
  readonly code = `import { NgTemplateOutlet } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCompare,
  ScCompareAfter,
  ScCompareBefore,
  ScCompareHandle,
  ScCompareLabel,
} from '@semantic-components/ui';
import { SiChevronsLeftRightIcon } from '@semantic-icons/lucide-icons';

/** Not only images: the same card, in the light and the dark theme. */
@Component({
  selector: 'app-content-compare-demo',
  imports: [
    NgTemplateOutlet,
    ScCompare,
    ScCompareBefore,
    ScCompareAfter,
    ScCompareHandle,
    ScCompareLabel,
    SiChevronsLeftRightIcon,
  ],
  template: \`
    <div scCompare class="w-full max-w-md rounded-xl border">
      <div scCompareBefore class="bg-background text-foreground p-8">
        <ng-container [ngTemplateOutlet]="card" />
      </div>
      <div scCompareAfter class="dark bg-background text-foreground p-8">
        <ng-container [ngTemplateOutlet]="card" />
      </div>
      <span scCompareLabel="before">Light</span>
      <span scCompareLabel="after">Dark</span>
      <div scCompareHandle aria-label="Light and dark theme">
        <svg siChevronsLeftRightIcon></svg>
      </div>
    </div>

    <ng-template #card>
      <div
        class="bg-card text-card-foreground mt-6 space-y-3 rounded-xl border p-5 shadow-sm"
      >
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
export class ContentCompareDemo {}`;
}
