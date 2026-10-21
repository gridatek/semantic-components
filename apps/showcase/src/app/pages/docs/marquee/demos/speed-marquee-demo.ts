import { Component, ViewEncapsulation } from '@angular/core';
import { ScMarquee, ScMarqueeContent } from '@semantic-components/ui-lab';

/** In pixels a second: short and long content move at the same pace. */
@Component({
  selector: 'app-speed-marquee-demo',
  imports: [ScMarquee, ScMarqueeContent],
  template: `
    <div class="w-full space-y-3">
      <div scMarquee [speed]="40" class="rounded-md border py-2">
        <ng-template scMarqueeContent>
          @for (word of short; track word) {
            <span class="text-sm whitespace-nowrap">{{ word }}</span>
          }
        </ng-template>
      </div>
      <div scMarquee [speed]="40" class="rounded-md border py-2">
        <ng-template scMarqueeContent>
          @for (word of long; track word) {
            <span class="text-sm whitespace-nowrap">{{ word }}</span>
          }
        </ng-template>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SpeedMarqueeDemo {
  readonly short = ['One', 'Two', 'Three'];
  readonly long = [
    'Alpha',
    'Bravo',
    'Charlie',
    'Delta',
    'Echo',
    'Foxtrot',
    'Golf',
    'Hotel',
    'India',
    'Juliett',
    'Kilo',
    'Lima',
    'Mike',
    'November',
  ];
}
