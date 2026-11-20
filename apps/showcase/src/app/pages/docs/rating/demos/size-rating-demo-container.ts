import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SizeRatingDemo } from './size-rating-demo';

@Component({
  selector: 'app-size-rating-demo-container',
  imports: [DemoContainer, SizeRatingDemo],
  template: `
    <app-demo-container
      title="Size and colour"
      demoUrl="/demos/rating/size-rating-demo"
      [code]="code"
    >
      <app-size-rating-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SizeRatingDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScRating, ScRatingIcon } from '@semantic-components/ui';
import { SiStarIcon } from '@semantic-icons/lucide-icons';

/** Bigger icons (a size of yours on the icon) and amber stars (a colour on the rating). */
@Component({
  selector: 'app-size-rating-demo',
  imports: [ScRating, ScRatingIcon, SiStarIcon],
  template: \`
    <div
      scRating
      class="text-amber-500"
      [(value)]="score"
      aria-label="Rating"
      valueText="{value} out of {max} stars"
    >
      <ng-template scRatingIcon>
        <svg siStarIcon class="size-8"></svg>
      </ng-template>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SizeRatingDemo {
  private readonly score = signal<number | null>(4);
}`;
}
