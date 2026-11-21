import { Component, ViewEncapsulation } from '@angular/core';
import { ScKbd, ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import {
  type ApiInput,
  ApiTable,
} from '../../../components/api-table/api-table';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { PartsTable } from '../../../components/parts-table/parts-table';
import { TocHeading } from '../../../components/toc/toc-heading';
import { MarqueeUsageDemoContainer } from './demos/marquee-usage-demo-container';
import { SpeedMarqueeDemoContainer } from './demos/speed-marquee-demo-container';
import { TestimonialsMarqueeDemoContainer } from './demos/testimonials-marquee-demo-container';
import { TickerMarqueeDemoContainer } from './demos/ticker-marquee-demo-container';
import { VerticalMarqueeDemoContainer } from './demos/vertical-marquee-demo-container';

@Component({
  selector: 'app-marquee-page',
  imports: [
    ScKbd,
    ScTypeset,
    Anatomy,
    ApiTable,
    PartsTable,
    MarqueeUsageDemoContainer,
    TestimonialsMarqueeDemoContainer,
    VerticalMarqueeDemoContainer,
    TickerMarqueeDemoContainer,
    SpeedMarqueeDemoContainer,
    TocHeading,
    ComponentBadges,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Marquee</h1>
        <p class="text-muted-foreground">
          Your content written once and repeated to fill, at a speed in pixels a
          second, in four directions; it waits under the pointer and with focus,
          pauses on a button, and stands still for reduced motion.
        </p>
        <app-component-badges path="marquee" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-marquee-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          The marquee holds your content, written once in an
          <code scTypeset>ng-template</code>, and a pause button beside it. The
          look is your content&apos;s: links, cards, text.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>How it moves</h2>
        <p>
          The template is repeated as often as it takes to fill what shows, and
          once more, so the loop is seamless; the copies are inert and hidden
          from screen readers.
          <code scTypeset>speed</code>
          is in pixels a second: short and long content move at the same pace.
          It moves with the Web Animations API and pauses where it is. A
          vertical marquee needs a height.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            It waits under the pointer, and with focus in the content —
            <kbd scKbd>Tab</kbd> into a link — then goes on.
          </li>
          <li>
            The pause button stops it (WCAG 2.2.2); write its name from
            <code scTypeset>paused()</code>
            (Pause, Play).
          </li>
          <li>
            With reduced motion it doesn&apos;t move: one copy, a row to scroll
            (data-still).
          </li>
          <li>
            Screen readers and <kbd scKbd>Tab</kbd> meet your content once; name
            the region it is in.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-testimonials-marquee-demo-container />
        <app-vertical-marquee-demo-container />
        <app-ticker-marquee-demo-container />
        <app-speed-marquee-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p>
          Each part takes
          <code scTypeset>class</code>, merged over its own (cn: a later class
          wins).
        </p>
        <app-parts-table label="Marquee parts" [parts]="parts" />
        <app-api-table label="ScMarquee inputs" [inputs]="inputs" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class MarqueePage {
  private readonly anatomy = {
    imports:
      "import { ScMarquee, ScMarqueeContent, ScMarqueePause } from '@semantic-components/ui';",
    markup: [
      '<section aria-label="Our users">',
      '  <div scMarquee #logos="scMarquee">',
      '    <ng-template scMarqueeContent>…your content, once…</ng-template>',
      '    <button scMarqueePause>…Pause or Play, from logos.paused()…</button>',
      '  </div>',
      '</section>',
    ].join('\n'),
  };

  private readonly parts = [
    {
      name: 'ScMarquee',
      selector: '[scMarquee]',
      description:
        'Repeats its content to fill and moves it; waits under the pointer and with focus; still for reduced motion (data-still). exportAs scMarquee: paused().',
    },
    {
      name: 'ScMarqueeContent',
      selector: 'ng-template[scMarqueeContent]',
      description: 'Your content, written once: the marquee stamps the copies.',
    },
    {
      name: 'ScMarqueePause',
      selector: 'button[scMarqueePause]',
      description:
        'Pauses and plays it: the style’s button (outline, icon-sm). Write its icon and name from paused().',
    },
  ];

  private readonly inputs: ApiInput[] = [
    {
      name: 'direction',
      type: "'left' | 'right' | 'up' | 'down'",
      default: "'left'",
      description: 'Where it moves to.',
    },
    {
      name: 'speed',
      type: 'number',
      default: '40',
      description: 'Pixels a second, whatever the content’s length.',
    },
    {
      name: 'gap',
      type: 'number',
      default: '16',
      description: 'Space between items and copies, in pixels.',
    },
    {
      name: 'paused',
      type: 'boolean',
      default: 'false',
      description: 'Two-way: stopped, by your pause button.',
    },
    {
      name: 'fade',
      type: 'boolean',
      default: 'false',
      description: 'Its edges fade out.',
    },
  ];
}
