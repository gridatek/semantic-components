import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { InlineCountdownNextDemo } from './inline-countdown-next-demo';

@Component({
  selector: 'app-inline-countdown-next-demo-container',
  imports: [DemoContainer, InlineCountdownNextDemo],
  template: `
    <app-demo-container
      title="Inline"
      [code]="code"
      demoUrl="/demos/countdown-next/inline-countdown-next-demo"
    >
      <app-inline-countdown-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class InlineCountdownNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScCountdownNext, ScCountdownNextUnit, ScCountdownNextText } from '@semantic-components/ui-lab';

/** In a sentence: hours, minutes and seconds, with your separators. */
@Component({
  selector: 'app-inline-countdown-next-demo',
  imports: [ScCountdownNext, ScCountdownNextUnit, ScCountdownNextText],
  template: \`
    <p class="text-sm">
      Sale ends in
      <span
        scCountdownNext
        [until]="end"
        aria-label="Sale ends in"
        class="bg-muted rounded px-1.5 py-0.5 font-mono font-medium"
      >
        <span scCountdownNextUnit="hours"></span>:<span
          scCountdownNextUnit="minutes"
        ></span
        >:<span scCountdownNextUnit="seconds"></span>
        <span scCountdownNextText></span>
      </span>
    </p>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class InlineCountdownNextDemo {
  readonly end = Temporal.Now.instant().add({ hours: 2, minutes: 14, seconds: 5 });
}`;
}
