import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { TickerMarqueeDemo } from './ticker-marquee-demo';

@Component({
  selector: 'app-ticker-marquee-demo-container',
  imports: [DemoContainer, TickerMarqueeDemo],
  template: `
    <app-demo-container
      title="Ticker"
      [code]="code"
      demoUrl="/demos/marquee/ticker-marquee-demo"
    >
      <app-ticker-marquee-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class TickerMarqueeDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScMarquee, ScMarqueeContent } from '@semantic-components/ui-lab';

/** Headlines, with your separators — text is content like any other. */
@Component({
  selector: 'app-ticker-marquee-demo',
  imports: [ScMarquee, ScMarqueeContent],
  template: \`
    <section
      aria-label="Headlines"
      class="bg-primary text-primary-foreground w-full rounded-md py-2"
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
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class TickerMarqueeDemo {
  readonly headlines = [
    'Version 3 is out',
    'Signal Forms everywhere',
    'New: the dock',
    'Every component accessible',
  ];
}`;
}
