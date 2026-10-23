import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { LogosMarqueeDemo } from './logos-marquee-demo';

@Component({
  selector: 'app-logos-marquee-demo-container',
  imports: [DemoContainer, LogosMarqueeDemo],
  template: `
    <app-demo-container
      title="Logos"
      [code]="code"
      demoUrl="/demos/marquee/logos-marquee-demo"
    >
      <app-logos-marquee-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class LogosMarqueeDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScMarquee,
  ScMarqueeContent,
  ScMarqueePause,
} from '@semantic-components/ui';
import { SiPauseIcon, SiPlayIcon } from '@semantic-icons/lucide-icons';

/** Links, written once: the copies are out of reach. It waits under the pointer and with focus inside — Tab into it — and the button pauses it. */
@Component({
  selector: 'app-logos-marquee-demo',
  imports: [
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
              href="#"
              class="text-muted-foreground hover:text-foreground rounded text-xl font-semibold whitespace-nowrap"
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
export class LogosMarqueeDemo {
  readonly brands = [
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
