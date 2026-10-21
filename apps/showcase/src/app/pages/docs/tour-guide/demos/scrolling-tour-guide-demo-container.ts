import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ScrollingTourGuideDemo } from './scrolling-tour-guide-demo';

@Component({
  selector: 'app-scrolling-tour-guide-demo-container',
  imports: [DemoContainer, ScrollingTourGuideDemo],
  template: `
    <app-demo-container
      title="Scrolling"
      [code]="code"
      demoUrl="/demos/tour-guide/scrolling-tour-guide-demo"
    >
      <app-scrolling-tour-guide-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ScrollingTourGuideDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import {
  ScTourGuide,
  ScTourGuideClose,
  ScTourGuideDescription,
  ScTourGuideNext,
  ScTourGuidePrevious,
  ScTourGuideStep,
  ScTourGuideTitle,
} from '@semantic-components/ui-lab';
import { SiXIcon } from '@semantic-icons/lucide-icons';

/** Targets far apart in a long page: each is scrolled into view (smoothly — at once for reduced motion), and the card follows. */
@Component({
  selector: 'app-scrolling-tour-guide-demo',
  imports: [
    ScTourGuide,
    ScTourGuideStep,
    ScTourGuideTitle,
    ScTourGuideDescription,
    ScTourGuideNext,
    ScTourGuidePrevious,
    ScTourGuideClose,
    ScButton,
    SiXIcon,
  ],
  template: \`
    <button scButton variant="outline" (click)="tour.start()">
      Tour the page
    </button>
    <div class="w-full max-w-2xl space-y-[60vh] py-8">
      <section #first class="bg-card rounded-lg border p-6">
        <h3 class="font-medium">The plans</h3>
        <p class="text-muted-foreground text-sm">
          Three of them, side by side.
        </p>
      </section>
      <section #second class="bg-card rounded-lg border p-6">
        <h3 class="font-medium">The questions</h3>
        <p class="text-muted-foreground text-sm">Asked often, answered here.</p>
      </section>
      <section #third class="bg-card rounded-lg border p-6">
        <h3 class="font-medium">Contact</h3>
        <p class="text-muted-foreground text-sm">A person, not a bot.</p>
      </section>
    </div>

    <div scTourGuide #tour="scTourGuide">
      <ng-template scTourGuideStep [for]="first">
        <h2 scTourGuideTitle>The plans</h2>
        <p scTourGuideDescription>Start here: which plan fits.</p>
      </ng-template>
      <ng-template scTourGuideStep [for]="second" side="top">
        <h2 scTourGuideTitle>The questions</h2>
        <p scTourGuideDescription>Most answers are already here.</p>
      </ng-template>
      <ng-template scTourGuideStep [for]="third" side="top">
        <h2 scTourGuideTitle>Contact</h2>
        <p scTourGuideDescription>And if not, write to us.</p>
      </ng-template>
      <button scTourGuideClose>
        <svg siXIcon></svg>
        <span class="sr-only">Close tour</span>
      </button>
      <div class="flex items-center gap-2 pt-1">
        <span class="text-muted-foreground text-xs tabular-nums">
          {{ tour.step() + 1 }} of {{ tour.count() }}
        </span>
        <button scTourGuidePrevious class="ms-auto">Back</button>
        <button scTourGuideNext>{{ tour.last() ? 'Done' : 'Next' }}</button>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class ScrollingTourGuideDemo {}`;
}
