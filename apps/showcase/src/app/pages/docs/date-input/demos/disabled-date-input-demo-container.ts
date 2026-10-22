import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledDateInputDemo } from './disabled-date-input-demo';

@Component({
  selector: 'app-disabled-date-input-demo-container',
  imports: [DemoContainer, DisabledDateInputDemo],
  template: `
    <app-demo-container
      title="Disabled"
      [code]="code"
      demoUrl="/demos/date-input/disabled-date-input-demo"
    >
      <app-disabled-date-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledDateInputDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScDateInput, ScField, ScLabel } from '@semantic-components/ui';

/** disabled: shown, not edited. */
@Component({
  selector: 'app-disabled-date-input-demo',
  imports: [ScDateInput, ScField, ScLabel],
  template: \`
    <div scField class="w-48">
      <label scLabel>Issued</label>
      <input scDateInput disabled [(value)]="date" />
    </div>
    <p class="text-muted-foreground text-sm" data-testid="picked">
      {{ date()?.toString() ?? 'No date.' }}
    </p>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledDateInputDemo {
  readonly date = signal<Temporal.PlainDate | null>(
    Temporal.PlainDate.from('2024-03-01'),
  );
}`;
}
