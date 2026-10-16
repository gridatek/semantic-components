import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { DoneCountdownNextDemoContainer } from './demos/done-countdown-next-demo-container';
import { EventCountdownNextDemoContainer } from './demos/event-countdown-next-demo-container';
import { InlineCountdownNextDemoContainer } from './demos/inline-countdown-next-demo-container';
import { RollCountdownNextDemoContainer } from './demos/roll-countdown-next-demo-container';
import { TimerCountdownNextDemoContainer } from './demos/timer-countdown-next-demo-container';

@Component({
  selector: 'app-countdown-next-page',
  imports: [
    EventCountdownNextDemoContainer,
    InlineCountdownNextDemoContainer,
    TimerCountdownNextDemoContainer,
    RollCountdownNextDemoContainer,
    DoneCountdownNextDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Countdown Next</h1>
        <p class="text-muted-foreground">
          The countdown, rebuilt: to a moment, or a timer that pauses; on the
          second, from the clock; its units in the app's language, in words for
          screen readers; rolling digits and a ring.
        </p>
        <app-component-badges path="countdown-next" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Event</h2>
        <p class="text-muted-foreground">
          To a moment: the days, hours, minutes and seconds left — each a unit,
          your labels. Screen readers hear it in words, in the app's language.
        </p>
        <app-event-countdown-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Inline</h2>
        <p class="text-muted-foreground">
          In a sentence: hours, minutes and seconds, with your separators.
        </p>
        <app-inline-countdown-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Timer</h2>
        <p class="text-muted-foreground">
          A duration: it starts, pauses and resets; the ring empties as it runs.
        </p>
        <app-timer-countdown-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Rolling digits</h2>
        <p class="text-muted-foreground">
          Each digit slides to the next — still, for anyone who asks for less
          motion.
        </p>
        <app-roll-countdown-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Done</h2>
        <p class="text-muted-foreground">
          Ten seconds; at zero, (completed) — once — and data-done to style what
          is over.
        </p>
        <app-done-countdown-next-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class CountdownNextPage {}
