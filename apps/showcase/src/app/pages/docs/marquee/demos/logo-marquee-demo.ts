import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScMarquee,
  ScMarqueeContent,
  ScMarqueeItem,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-logo-marquee-demo',
  imports: [ScMarquee, ScMarqueeContent, ScMarqueeItem],
  template: `
    <div scMarquee [duration]="30" [gap]="48">
      <div scMarqueeContent>
        @for (brand of brands; track brand) {
          <div
            scMarqueeItem
            class="bg-background flex h-16 w-32 items-center justify-center rounded-lg border px-4"
          >
            <span class="text-muted-foreground text-lg font-semibold">
              {{ brand }}
            </span>
          </div>
        }
      </div>
      <div scMarqueeContent aria-hidden="true">
        @for (brand of brands; track brand) {
          <div
            scMarqueeItem
            class="bg-background flex h-16 w-32 items-center justify-center rounded-lg border px-4"
          >
            <span class="text-muted-foreground text-lg font-semibold">
              {{ brand }}
            </span>
          </div>
        }
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoMarqueeDemo {
  readonly brands = ['Acme', 'Globex', 'Initech', 'Umbrella', 'Stark', 'Wayne'];
}
