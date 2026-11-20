import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DeselectableRatingNextDemo } from './deselectable-rating-next-demo';

@Component({
  selector: 'app-deselectable-rating-next-demo-container',
  imports: [DemoContainer, DeselectableRatingNextDemo],
  template: `
    <app-demo-container
      title="Deselectable"
      demoUrl="/demos/rating-next/deselectable-rating-next-demo"
      [code]="code"
    >
      <app-deselectable-rating-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DeselectableRatingNextDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScRatingNext, ScRatingNextIcon } from '@semantic-components/ui';
import { SiStarIcon } from '@semantic-icons/lucide-icons';

/** Deselectable: a press on the score given, Delete or Backspace takes it back (null). */
@Component({
  selector: 'app-deselectable-rating-next-demo',
  imports: [ScRatingNext, ScRatingNextIcon, SiStarIcon],
  template: \`
    <div class="flex flex-col items-center gap-2">
      <div
        scRatingNext
        deselectable
        [(value)]="score"
        aria-label="Rating"
        valueText="{value} out of {max} stars"
      >
        <ng-template scRatingNextIcon>
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
export class DeselectableRatingNextDemo {
  private readonly score = signal<number | null>(3);
}`;
}
