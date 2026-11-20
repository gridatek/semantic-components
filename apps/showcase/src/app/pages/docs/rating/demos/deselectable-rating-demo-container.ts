import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DeselectableRatingDemo } from './deselectable-rating-demo';

@Component({
  selector: 'app-deselectable-rating-demo-container',
  imports: [DemoContainer, DeselectableRatingDemo],
  template: `
    <app-demo-container
      title="Deselectable"
      demoUrl="/demos/rating/deselectable-rating-demo"
      [code]="code"
    >
      <app-deselectable-rating-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DeselectableRatingDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScRating, ScRatingIcon } from '@semantic-components/ui';
import { SiStarIcon } from '@semantic-icons/lucide-icons';

/** Deselectable: a press on the score given, Delete or Backspace takes it back (null). */
@Component({
  selector: 'app-deselectable-rating-demo',
  imports: [ScRating, ScRatingIcon, SiStarIcon],
  template: \`
    <div class="flex flex-col items-center gap-2">
      <div
        scRating
        deselectable
        [(value)]="score"
        aria-label="Rating"
        valueText="{value} out of {max} stars"
      >
        <ng-template scRatingIcon>
          <svg siStarIcon></svg>
        </ng-template>
      </div>
      <p class="text-muted-foreground text-sm">
        {{ score() === null ? 'Not rated' : score() + ' out of 5' }}
      </p>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DeselectableRatingDemo {
  private readonly score = signal<number | null>(3);
}`;
}
