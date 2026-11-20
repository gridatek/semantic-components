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
import { ScRatingNext, ScRatingNextIcon } from '@semantic-components/ui';
import { SiStarIcon } from '@semantic-icons/lucide-icons';

/** Bigger icons (a size of yours on the icon) and amber stars (a colour on the rating). */
@Component({
  selector: 'app-size-rating-next-demo',
  imports: [ScRatingNext, ScRatingNextIcon, SiStarIcon],
  template: \`
    <div
      scRatingNext
      class="text-amber-500"
      [(value)]="score"
      aria-label="Rating"
      valueText="{value} out of {max} stars"
    >
      <ng-template scRatingNextIcon>
        <svg siStarIcon class="size-8"></svg>
      </ng-template>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SizeRatingNextDemo {
  private readonly score = signal<number | null>(4);
}`;
}
