import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RollCountdownNextDemo } from './roll-countdown-next-demo';

@Component({
  selector: 'app-roll-countdown-next-demo-container',
  imports: [DemoContainer, RollCountdownNextDemo],
  template: `
    <app-demo-container
      title="Rolling digits"
      [code]="code"
      demoUrl="/demos/countdown-next/roll-countdown-next-demo"
    >
      <app-roll-countdown-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RollCountdownNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScCountdownNext, ScCountdownNextUnit, ScCountdownNextText } from '@semantic-components/ui-lab';

/** Each digit slides to the next — still, for anyone who asks for less motion. */
@Component({
  selector: 'app-roll-countdown-next-demo',
  imports: [ScCountdownNext, ScCountdownNextUnit, ScCountdownNextText],
  template: \`
    <div
      scCountdownNext
      [until]="end"
      aria-label="Ends in"
      class="gap-1 text-5xl font-semibold"
    >
      <span scCountdownNextUnit="hours" roll></span>
      <span class="text-muted-foreground">:</span>
      <span scCountdownNextUnit="minutes" roll></span>
      <span class="text-muted-foreground">:</span>
      <span scCountdownNextUnit="seconds" roll></span>
      <span scCountdownNextText></span>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RollCountdownNextDemo {
  readonly end = Temporal.Now.instant().add({ hours: 5, minutes: 30 });
}`;
}
