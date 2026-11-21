import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ReadOnlyDateInputDemo } from './read-only-date-input-demo';

@Component({
  selector: 'app-read-only-date-input-demo-container',
  imports: [DemoContainer, ReadOnlyDateInputDemo],
  template: `
    <app-demo-container
      title="Read-only"
      [code]="code"
      demoUrl="/demos/date-input/read-only-date-input-demo"
    >
      <app-read-only-date-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ReadOnlyDateInputDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScDateInput, ScField, ScLabel } from '@semantic-components/ui';

/** Read-only: its parts can be focused and read, not changed. */
@Component({
  selector: 'app-read-only-date-input-demo',
  imports: [ScDateInput, ScField, ScLabel],
  template: \`
    <div scField class="w-44">
      <label scLabel>Signed on</label>
      <div scDateInput readonly [(value)]="signed"></div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ReadOnlyDateInputDemo {
  private readonly signed = signal<Temporal.PlainDate | null>(
    Temporal.PlainDate.from('2026-10-14'),
  );
}`;
}
