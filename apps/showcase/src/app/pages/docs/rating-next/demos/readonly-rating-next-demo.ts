import { Component, ViewEncapsulation } from '@angular/core';
import { ScRatingNext, ScRatingNextIcon } from '@semantic-components/ui';
import { SiStarIcon } from '@semantic-icons/lucide-icons';

/** Read-only: any score (4.2), an image named by its value text. */
@Component({
  selector: 'app-readonly-rating-next-demo',
  imports: [ScRatingNext, ScRatingNextIcon, SiStarIcon],
  template: `
    <div class="flex items-center gap-2">
      <div
        scRatingNext
        readonly
        [value]="4.2"
        valueText="Rated {value} out of {max}"
      >
        <ng-template scRatingNextIcon>
          <svg siStarIcon></svg>
        </ng-template>
      </div>
      <span class="text-muted-foreground text-sm">4.2 · 128 reviews</span>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ReadonlyRatingNextDemo {}
