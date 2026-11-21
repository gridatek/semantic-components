import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ReadOnlyDateInputNextDemo } from './read-only-date-input-next-demo';

@Component({
  selector: 'app-read-only-date-input-next-demo-container',
  imports: [DemoContainer, ReadOnlyDateInputNextDemo],
  template: `
    <app-demo-container
      title="Read-only"
      [code]="code"
      demoUrl="/demos/date-input-next/read-only-date-input-next-demo"
    >
      <app-read-only-date-input-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ReadOnlyDateInputNextDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScDateInputNext, ScField, ScLabel } from '@semantic-components/ui';

/** Read-only: its parts can be focused and read, not changed. */
@Component({
  selector: 'app-read-only-date-input-next-demo',
  imports: [ScDateInputNext, ScField, ScLabel],
  template: \`
    <div scField class="w-44">
      <label scLabel>Signed on</label>
      <div scDateInputNext readonly [(value)]="signed"></div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ReadOnlyDateInputNextDemo {
  private readonly signed = signal<Temporal.PlainDate | null>(
    Temporal.PlainDate.from('2026-10-14'),
  );
}`;
}
