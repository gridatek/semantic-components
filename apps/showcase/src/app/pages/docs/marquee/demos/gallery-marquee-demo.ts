import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScMarquee,
  ScMarqueeClone,
  ScMarqueeItem,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-gallery-marquee-demo',
  imports: [ScMarquee, ScMarqueeClone, ScMarqueeItem],
  template: `
    <sc-marquee [duration]="35" [gap]="16">
      @for (i of images; track i) {
        <div
          scMarqueeItem
          class="from-primary/20 to-primary/5 flex h-32 w-48 items-center justify-center rounded-lg bg-linear-to-br"
        >
          <span class="text-4xl opacity-50">📷</span>
        </div>
      }
      <ng-container scMarqueeClone>
        @for (i of images; track i) {
          <div
            scMarqueeItem
            class="from-primary/20 to-primary/5 flex h-32 w-48 items-center justify-center rounded-lg bg-linear-to-br"
          >
            <span class="text-4xl opacity-50">📷</span>
          </div>
        }
      </ng-container>
    </sc-marquee>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryMarqueeDemo {
  readonly images = [1, 2, 3, 4, 5, 6];
}
