import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { LocaleDateInputDemo } from './locale-date-input-demo';

@Component({
  selector: 'app-locale-date-input-demo-container',
  imports: [DemoContainer, LocaleDateInputDemo],
  template: `
    <app-demo-container
      title="Locale"
      [code]="code"
      demoUrl="/demos/date-input/locale-date-input-demo"
    >
      <app-locale-date-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class LocaleDateInputDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScDateInput, ScField, ScLabel } from '@semantic-components/ui';

/** locale="fr-FR": typed day first (14/10/2026). */
@Component({
  selector: 'app-locale-date-input-demo',
  imports: [ScDateInput, ScField, ScLabel],
  template: \`
    <div scField class="w-48">
      <label scLabel>Date d’arrivée</label>
      <input
        scDateInput
        locale="fr-FR"
        placeholder="jj/mm/aaaa"
        [(value)]="date"
      />
    </div>
    <p class="text-muted-foreground text-sm" data-testid="picked">
      {{ date()?.toString() ?? 'No date.' }}
    </p>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class LocaleDateInputDemo {
  readonly date = signal<Temporal.PlainDate | null>(
    Temporal.PlainDate.from('2026-10-14'),
  );
}`;
}
