import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScLink, ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { TocHeading } from '../../../components/toc/toc-heading';
import { CountdownUsageDemoContainer } from './demos/countdown-usage-demo-container';
import { RtlCountdownDemoContainer } from './demos/rtl-countdown-demo-container';
import { TimerCountdownDemoContainer } from './demos/timer-countdown-demo-container';

@Component({
  selector: 'app-countdown-page',
  imports: [
    Anatomy,
    RouterLink,
    ScLink,
    ScTypeset,
    CountdownUsageDemoContainer,
    TimerCountdownDemoContainer,
    RtlCountdownDemoContainer,
    TocHeading,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Countdown</h1>
        <p class="text-muted-foreground">
          A recipe: the time left to a moment, or a timer, its digits rolling —
          a
          <a scLink routerLink="/docs/components/number-ticker"
            >Number Ticker</a
          >
          for each unit, the time from Temporal. No component of its own.
        </p>
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-countdown-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>How it is made</h2>
        <p>
          The time left is the target less now —
          <code scTypeset>Temporal.Now.instant()</code>, read once a second by a
          timer of yours, in the browser (after the first render), stopped when
          the page goes. Split into days, hours, minutes and seconds, each is a
          Number Ticker with
          <code scTypeset>effect="roll"</code>
          and
          <code scTypeset>{{ formatCode }}</code>
          (07, not 7). The unit names are your words, or the locale&apos;s
          (<code scTypeset>Intl.DisplayNames</code>, type dateTimeField).
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            The digits sit in a <code scTypeset>role="timer"</code> you name: a
            live region that is quiet — read when someone goes to it, not every
            second.
          </li>
          <li>
            Screen readers get each Number Ticker&apos;s value, never the digits
            rolling; with reduced motion, the digits change at once.
          </li>
          <li>
            The end is a status of yours («Time&apos;s up»): announced once.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-timer-countdown-demo-container />
        <app-rtl-countdown-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class CountdownPage {
  private readonly formatCode = '[format]="{ minimumIntegerDigits: 2 }"';

  private readonly anatomy = {
    imports: "import { ScNumberTicker } from '@semantic-components/ui';",
    markup: [
      '<div role="timer" aria-label="Time left until the launch">',
      '  @for (unit of units(); track unit.name) {',
      '    <span scNumberTicker effect="roll" [value]="unit.value"',
      '          [format]="{ minimumIntegerDigits: 2 }"></span>',
      '    <span>{{ unit.name }}</span>',
      '  }',
      '</div>',
    ].join('\n'),
  };
}
