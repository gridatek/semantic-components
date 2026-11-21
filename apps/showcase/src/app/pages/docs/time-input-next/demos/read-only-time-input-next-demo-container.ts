import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ReadOnlyTimeInputNextDemo } from './read-only-time-input-next-demo';

@Component({
  selector: 'app-read-only-time-input-next-demo-container',
  imports: [DemoContainer, ReadOnlyTimeInputNextDemo],
  template: `
    <app-demo-container
      title="Read-only"
      [code]="code"
      demoUrl="/demos/time-input-next/read-only-time-input-next-demo"
    >
      <app-read-only-time-input-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ReadOnlyTimeInputNextDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScField, ScLabel, ScTimeInputNext } from '@semantic-components/ui';

/** Read-only: its parts can be focused and read, not changed. */
@Component({
  selector: 'app-read-only-time-input-next-demo',
  imports: [ScField, ScLabel, ScTimeInputNext],
  template: \`
    <div scField class="w-44">
      <label scLabel>Signed at</label>
      <div scTimeInputNext readonly [(value)]="time"></div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ReadOnlyTimeInputNextDemo {
  private readonly time = signal<Temporal.PlainTime | null>(
    Temporal.PlainTime.from('14:05'),
  );
}`;
}
