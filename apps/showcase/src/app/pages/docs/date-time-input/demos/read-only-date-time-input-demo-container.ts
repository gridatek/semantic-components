import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ReadOnlyDateTimeInputDemo } from './read-only-date-time-input-demo';

@Component({
  selector: 'app-read-only-date-time-input-demo-container',
  imports: [DemoContainer, ReadOnlyDateTimeInputDemo],
  template: `
    <app-demo-container
      title="Read-only"
      [code]="code"
      demoUrl="/demos/date-time-input/read-only-date-time-input-demo"
    >
      <app-read-only-date-time-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ReadOnlyDateTimeInputDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScDateTimeInput, ScField, ScLabel } from '@semantic-components/ui';

/** Read-only: its parts can be focused and read, not changed. */
@Component({
  selector: 'app-read-only-date-time-input-demo',
  imports: [ScDateTimeInput, ScField, ScLabel],
  template: \`
    <div scField class="w-64">
      <label scLabel>Signed</label>
      <div scDateTimeInput readonly [(value)]="signed"></div>
    </div>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class ReadOnlyDateTimeInputDemo {
  private readonly signed = signal<Temporal.PlainDateTime | null>(
    Temporal.PlainDateTime.from('2026-10-14T16:05'),
  );
}`;
}
