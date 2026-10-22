import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledTimeInputDemo } from './disabled-time-input-demo';

@Component({
  selector: 'app-disabled-time-input-demo-container',
  imports: [DemoContainer, DisabledTimeInputDemo],
  template: `
    <app-demo-container
      title="Disabled"
      [code]="code"
      demoUrl="/demos/time-input/disabled-time-input-demo"
    >
      <app-disabled-time-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledTimeInputDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScField, ScLabel, ScTimeInput } from '@semantic-components/ui';

/** disabled: shown, not edited — out of the tab order. */
@Component({
  selector: 'app-disabled-time-input-demo',
  imports: [ScTimeInput, ScField, ScLabel],
  template: \`
    <div scField class="w-40">
      <label scLabel>Check-out</label>
      <div scTimeInput disabled [(value)]="time"></div>
    </div>
    <p class="text-muted-foreground text-sm" data-testid="picked">
      {{ time()?.toString() ?? 'No time.' }}
    </p>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledTimeInputDemo {
  readonly time = signal<Temporal.PlainTime | null>(
    Temporal.PlainTime.from('11:00'),
  );
}`;
}
