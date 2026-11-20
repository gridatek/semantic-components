import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ReadonlyRatingDemo } from './readonly-rating-demo';

@Component({
  selector: 'app-readonly-rating-demo-container',
  imports: [DemoContainer, ReadonlyRatingDemo],
  template: `
    <app-demo-container
      title="Read-only"
      demoUrl="/demos/rating/readonly-rating-demo"
      [code]="code"
    >
      <app-readonly-rating-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ReadonlyRatingDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScRating, ScRatingIcon } from '@semantic-components/ui';
import { SiStarIcon } from '@semantic-icons/lucide-icons';

/** Read-only: any score (4.2), an image named by its value text. */
@Component({
  selector: 'app-readonly-rating-demo',
  imports: [ScRating, ScRatingIcon, SiStarIcon],
  template: \`
    <div class="flex items-center gap-2">
      <div
        scRating
        readonly
        [value]="4.2"
        valueText="Rated {value} out of {max}"
      >
        <ng-template scRatingIcon>
          <svg siStarIcon></svg>
        </ng-template>
      </div>
      <span class="text-muted-foreground text-sm">4.2 · 128 reviews</span>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ReadonlyRatingDemo {}`;
}
