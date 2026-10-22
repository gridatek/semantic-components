import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SegmentedLocaleDateInputDemo } from './segmented-locale-date-input-demo';

@Component({
  selector: 'app-segmented-locale-date-input-demo-container',
  imports: [DemoContainer, SegmentedLocaleDateInputDemo],
  template: `
    <app-demo-container
      title="Segmented, French"
      [code]="code"
      demoUrl="/demos/date-input/segmented-locale-date-input-demo"
    >
      <app-segmented-locale-date-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SegmentedLocaleDateInputDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScField,
  ScLabel,
  ScSegmentedDateInput,
} from '@semantic-components/ui';

/** locale="fr-FR": day, month, year — the parts named in French. */
@Component({
  selector: 'app-segmented-locale-date-input-demo',
  imports: [ScSegmentedDateInput, ScField, ScLabel],
  template: \`
    <div scField class="w-40">
      <label scLabel>Date d’arrivée</label>
      <div scSegmentedDateInput locale="fr-FR" [(value)]="date"></div>
    </div>
    <p class="text-muted-foreground text-sm" data-testid="picked">
      {{ date()?.toString() ?? 'No date.' }}
    </p>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class SegmentedLocaleDateInputDemo {
  readonly date = signal<Temporal.PlainDate | null>(
    Temporal.PlainDate.from('2026-10-14'),
  );
}`;
}
