import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SizeRatingNextDemo } from './size-rating-next-demo';

@Component({
  selector: 'app-size-rating-next-demo-container',
  imports: [DemoContainer, SizeRatingNextDemo],
  template: `
    <app-demo-container
      title="Size and colour"
      demoUrl="/demos/rating-next/size-rating-next-demo"
      [code]="code"
    >
      <app-size-rating-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SizeRatingNextDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScRatingNext,
  ScRatingNextItem,
} from '@semantic-components/ui';
import { SiStarIcon } from '@semantic-icons/lucide-icons';

/** Bigger icons (a size of yours on them) and amber stars (a colour on the star). */
@Component({
  selector: 'app-size-rating-next-demo',
  imports: [ScRatingNext, ScRatingNextItem, SiStarIcon],
  template: \`
    <div
      scRatingNext
      [(value)]="score"
      aria-label="Rating"
      valueText="{value} out of {max} stars"
    >
      @for (star of stars; track star) {
          <span scRatingNextItem class="text-amber-500">
            <svg siStarIcon class="size-8"></svg>
            <svg siStarIcon class="size-8"></svg>
          </span>
        }
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SizeRatingNextDemo {
  private readonly stars = [1, 2, 3, 4, 5];
  private readonly score = signal<number | null>(4);
}`;
}
