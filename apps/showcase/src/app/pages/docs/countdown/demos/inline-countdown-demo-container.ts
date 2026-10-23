import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { InlineCountdownDemo } from './inline-countdown-demo';

@Component({
  selector: 'app-inline-countdown-demo-container',
  imports: [DemoContainer, InlineCountdownDemo],
  template: `
    <app-demo-container
      title="Inline"
      [code]="code"
      demoUrl="/demos/countdown/inline-countdown-demo"
    >
      <app-inline-countdown-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class InlineCountdownDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCountdown,
  ScCountdownText,
  ScCountdownUnit,
} from '@semantic-components/ui';

/** In a sentence: hours, minutes and seconds, with your separators. */
@Component({
  selector: 'app-inline-countdown-demo',
  imports: [ScCountdown, ScCountdownUnit, ScCountdownText],
  template: \`
    <p class="text-sm">
      Sale ends in
      <span
        scCountdown
        [until]="end"
        aria-label="Sale ends in"
        class="bg-muted rounded px-1.5 py-0.5 font-mono font-medium"
      >
        <span scCountdownUnit="hours"></span>:<span
          scCountdownUnit="minutes"
        ></span
        >:<span scCountdownUnit="seconds"></span>
        <span scCountdownText></span>
      </span>
    </p>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class InlineCountdownDemo {
  readonly end = Temporal.Now.instant().add({
    hours: 2,
    minutes: 14,
    seconds: 5,
  });
}`;
}
