import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { MarqueeUsageDemo } from './marquee-usage-demo';

@Component({
  selector: 'app-marquee-usage-demo-container',
  imports: [DemoContainer, MarqueeUsageDemo],
  template: `
    <app-demo-container
      title="Usage"
      [code]="code"
      demoUrl="/demos/marquee/marquee-usage-demo"
    >
      <app-marquee-usage-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class MarqueeUsageDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ScLink,
  ScMarquee,
  ScMarqueeContent,
  ScMarqueePause,
} from '@semantic-components/ui';
import { SiPauseIcon, SiPlayIcon } from '@semantic-icons/lucide-icons';

/** Links, written once: the copies are out of reach. It waits under the pointer and with focus inside — Tab into it — and the button pauses it. */
@Component({
  selector: 'app-marquee-usage-demo',
  imports: [
    RouterLink,
    ScLink,
    ScMarquee,
    ScMarqueeContent,
    ScMarqueePause,
    SiPauseIcon,
    SiPlayIcon,
  ],
  template: \`
    <section aria-label="Our users" class="w-full">
      <div scMarquee #logos="scMarquee" fade [gap]="48">
        <ng-template scMarqueeContent>
          @for (brand of brands; track brand) {
            <a
              scLink
              routerLink="."
              [fragment]="brand"
              class="text-muted-foreground hover:text-foreground text-xl font-semibold whitespace-nowrap no-underline"
            >
              {{ brand }}
            </a>
          }
        </ng-template>
        <button scMarqueePause>
          @if (logos.paused()) {
            <svg siPlayIcon></svg>
            <span class="sr-only">Play</span>
          } @else {
            <svg siPauseIcon></svg>
            <span class="sr-only">Pause</span>
          }
        </button>
      </div>
    </section>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class MarqueeUsageDemo {
  private readonly brands = [
    'Acme',
    'Globex',
    'Initech',
    'Umbrella',
    'Hooli',
    'Vehement',
    'Stark',
  ];
}`;
}
