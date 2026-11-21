import { Component, ViewEncapsulation } from '@angular/core';
import { ScFrame, ScMarquee, ScMarqueeContent } from '@semantic-components/ui';

/** Headlines, with your separators — text is content like any other. */
@Component({
  selector: 'app-ticker-marquee-demo',
  imports: [ScFrame, ScMarquee, ScMarqueeContent],
  template: `
    <section
      scFrame
      size="xs"
      aria-label="Headlines"
      class="bg-primary text-primary-foreground w-full py-2"
    >
      <div scMarquee [speed]="80" [gap]="24">
        <ng-template scMarqueeContent>
          @for (headline of headlines; track headline) {
            <span class="text-sm font-medium whitespace-nowrap">{{
              headline
            }}</span>
            <span aria-hidden="true">•</span>
          }
        </ng-template>
      </div>
    </section>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class TickerMarqueeDemo {
  private readonly headlines = [
    'Version 3 is out',
    'Signal Forms everywhere',
    'New: the dock',
    'Every component accessible',
  ];
}
