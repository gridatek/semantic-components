import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { EventCountdownNextDemo } from './event-countdown-next-demo';

@Component({
  selector: 'app-event-countdown-next-demo-container',
  imports: [DemoContainer, EventCountdownNextDemo],
  template: `
    <app-demo-container
      title="Event"
      [code]="code"
      demoUrl="/demos/countdown-next/event-countdown-next-demo"
    >
      <app-event-countdown-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class EventCountdownNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScCountdownNext, ScCountdownNextUnit, ScCountdownNextText } from '@semantic-components/ui-lab';

/** To a moment: the days, hours, minutes and seconds left — each a unit, your labels. Screen readers hear it in words, in the app's language. */
@Component({
  selector: 'app-event-countdown-next-demo',
  imports: [ScCountdownNext, ScCountdownNextUnit, ScCountdownNextText],
  template: \`
    <div
      scCountdownNext
      [until]="launch"
      aria-label="Launch in"
      class="gap-3"
    >
        <div class="bg-card flex w-20 flex-col items-center rounded-lg border p-3 shadow-xs">
          <span scCountdownNextUnit="days" class="text-3xl font-semibold"></span>
          <span class="text-muted-foreground text-xs">Days</span>
        </div>
        <div class="bg-card flex w-20 flex-col items-center rounded-lg border p-3 shadow-xs">
          <span scCountdownNextUnit="hours" class="text-3xl font-semibold"></span>
          <span class="text-muted-foreground text-xs">Hours</span>
        </div>
        <div class="bg-card flex w-20 flex-col items-center rounded-lg border p-3 shadow-xs">
          <span scCountdownNextUnit="minutes" class="text-3xl font-semibold"></span>
          <span class="text-muted-foreground text-xs">Minutes</span>
        </div>
        <div class="bg-card flex w-20 flex-col items-center rounded-lg border p-3 shadow-xs">
          <span scCountdownNextUnit="seconds" class="text-3xl font-semibold"></span>
          <span class="text-muted-foreground text-xs">Seconds</span>
        </div>
      <span scCountdownNextText></span>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class EventCountdownNextDemo {
  /** In 2 days, 3 hours, 4 minutes and 5 seconds from now. */
  readonly launch = Temporal.Now.instant().add({
    hours: 51,
    minutes: 4,
    seconds: 5,
  });
}`;
}
