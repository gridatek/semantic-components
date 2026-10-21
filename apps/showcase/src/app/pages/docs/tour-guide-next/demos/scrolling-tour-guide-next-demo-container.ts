import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ScrollingTourGuideNextDemo } from './scrolling-tour-guide-next-demo';

@Component({
  selector: 'app-scrolling-tour-guide-next-demo-container',
  imports: [DemoContainer, ScrollingTourGuideNextDemo],
  template: `
    <app-demo-container
      title="Scrolling"
      [code]="code"
      demoUrl="/demos/tour-guide-next/scrolling-tour-guide-next-demo"
    >
      <app-scrolling-tour-guide-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ScrollingTourGuideNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import {
  ScTourGuideNext,
  ScTourGuideNextClose,
  ScTourGuideNextDescription,
  ScTourGuideNextNext,
  ScTourGuideNextPrevious,
  ScTourGuideNextStep,
  ScTourGuideNextTitle,
} from '@semantic-components/ui-lab';
import { SiXIcon } from '@semantic-icons/lucide-icons';

/** Targets far apart in a long page: each is scrolled into view (smoothly — at once for reduced motion), and the card follows. */
@Component({
  selector: 'app-scrolling-tour-guide-next-demo',
  imports: [
    ScTourGuideNext,
    ScTourGuideNextStep,
    ScTourGuideNextTitle,
    ScTourGuideNextDescription,
    ScTourGuideNextNext,
    ScTourGuideNextPrevious,
    ScTourGuideNextClose,
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

    <div scTourGuideNext #tour="scTourGuideNext">
      <ng-template scTourGuideNextStep [for]="first">
        <h2 scTourGuideNextTitle>The plans</h2>
        <p scTourGuideNextDescription>Start here: which plan fits.</p>
      </ng-template>
      <ng-template scTourGuideNextStep [for]="second" side="top">
        <h2 scTourGuideNextTitle>The questions</h2>
        <p scTourGuideNextDescription>Most answers are already here.</p>
      </ng-template>
      <ng-template scTourGuideNextStep [for]="third" side="top">
        <h2 scTourGuideNextTitle>Contact</h2>
        <p scTourGuideNextDescription>And if not, write to us.</p>
      </ng-template>
      <button scTourGuideNextClose>
        <svg siXIcon></svg>
        <span class="sr-only">Close tour</span>
      </button>
      <div class="flex items-center gap-2 pt-1">
        <span class="text-muted-foreground text-xs tabular-nums">
          {{ tour.step() + 1 }} of {{ tour.count() }}
        </span>
        <button scTourGuideNextPrevious class="ms-auto">Back</button>
        <button scTourGuideNextNext>{{ tour.last() ? 'Done' : 'Next' }}</button>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class ScrollingTourGuideNextDemo {}`;
}
