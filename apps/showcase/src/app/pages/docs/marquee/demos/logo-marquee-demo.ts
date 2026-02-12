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
  selector: 'app-logo-marquee-demo',
  imports: [ScMarquee, ScMarqueeClone, ScMarqueeItem],
  template: `
    <sc-marquee [duration]="30" [gap]="48">
      @for (brand of brands; track brand) {
        <div
          sc-marquee-item
          class="flex h-16 w-32 items-center justify-center rounded-lg border bg-background px-4"
        >
          <span class="text-lg font-semibold text-muted-foreground">
            {{ brand }}
          </span>
        </div>
      }
      <ng-container sc-marquee-clone>
        @for (brand of brands; track brand) {
          <div
            sc-marquee-item
            class="flex h-16 w-32 items-center justify-center rounded-lg border bg-background px-4"
          >
            <span class="text-lg font-semibold text-muted-foreground">
              {{ brand }}
            </span>
          </div>
        }
      </ng-container>
    </sc-marquee>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoMarqueeDemo {
  readonly brands = ['Acme', 'Globex', 'Initech', 'Umbrella', 'Stark', 'Wayne'];
}
