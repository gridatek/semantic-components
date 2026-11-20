import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { HalfRatingNextDemo } from './half-rating-next-demo';

@Component({
  selector: 'app-half-rating-next-demo-container',
  imports: [DemoContainer, HalfRatingNextDemo],
  template: `
    <app-demo-container
      title="Halves"
      demoUrl="/demos/rating-next/half-rating-next-demo"
      [code]="code"
    >
      <app-half-rating-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class HalfRatingNextDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScRatingNext, ScRatingNextIcon } from '@semantic-components/ui';
import { SiStarIcon } from '@semantic-icons/lucide-icons';

/** By halves (step 0.5): the left half of a star gives a half, the arrows move by halves. */
@Component({
  selector: 'app-half-rating-next-demo',
  imports: [ScRatingNext, ScRatingNextIcon, SiStarIcon],
  template: \`
    <div class="flex flex-col items-center gap-2">
      <div
        scRatingNext
        [(value)]="score"
        [step]="0.5"
        aria-label="Rating"
        valueText="{value} out of {max} stars"
      >
        <ng-template scRatingNextIcon>
          <svg siStarIcon></svg>
        </ng-template>
      </div>
      <p class="text-muted-foreground text-sm tabular-nums">
        {{ score() ?? 0 }} out of 5
      </p>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class HalfRatingNextDemo {
  private readonly score = signal<number | null>(3.5);
}`;
}
