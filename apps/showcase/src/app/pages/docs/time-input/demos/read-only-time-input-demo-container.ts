import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ReadOnlyTimeInputDemo } from './read-only-time-input-demo';

@Component({
  selector: 'app-read-only-time-input-demo-container',
  imports: [DemoContainer, ReadOnlyTimeInputDemo],
  template: `
    <app-demo-container
      title="Read-only"
      [code]="code"
      demoUrl="/demos/time-input/read-only-time-input-demo"
    >
      <app-read-only-time-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ReadOnlyTimeInputDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScField, ScLabel, ScTimeInput } from '@semantic-components/ui';

/** Read-only: its parts can be focused and read, not changed. */
@Component({
  selector: 'app-read-only-time-input-demo',
  imports: [ScField, ScLabel, ScTimeInput],
  template: \`
    <div scField class="w-44">
      <label scLabel>Signed at</label>
      <div scTimeInput readonly [(value)]="time"></div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ReadOnlyTimeInputDemo {
  private readonly time = signal<Temporal.PlainTime | null>(
    Temporal.PlainTime.from('14:05'),
  );
}`;
}
