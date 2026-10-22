import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SecondsTimeInputDemo } from './seconds-time-input-demo';

@Component({
  selector: 'app-seconds-time-input-demo-container',
  imports: [DemoContainer, SecondsTimeInputDemo],
  template: `
    <app-demo-container
      title="Seconds"
      [code]="code"
      demoUrl="/demos/time-input/seconds-time-input-demo"
    >
      <app-seconds-time-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SecondsTimeInputDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScField, ScLabel, ScTimeInput } from '@semantic-components/ui';

/** granularity="second" adds the seconds; "hour" keeps only the hour. */
@Component({
  selector: 'app-seconds-time-input-demo',
  imports: [ScTimeInput, ScField, ScLabel],
  template: \`
    <div scField class="w-44">
      <label scLabel>Lap time</label>
      <div scTimeInput granularity="second" [(value)]="time"></div>
    </div>
    <p class="text-muted-foreground text-sm" data-testid="picked">
      {{ time()?.toString() ?? 'No time.' }}
    </p>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class SecondsTimeInputDemo {
  readonly time = signal<Temporal.PlainTime | null>(
    Temporal.PlainTime.from('09:05:30'),
  );
}`;
}
