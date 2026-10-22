import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { LocaleTimeInputDemo } from './locale-time-input-demo';

@Component({
  selector: 'app-locale-time-input-demo-container',
  imports: [DemoContainer, LocaleTimeInputDemo],
  template: `
    <app-demo-container
      title="Locale"
      [code]="code"
      demoUrl="/demos/time-input/locale-time-input-demo"
    >
      <app-locale-time-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class LocaleTimeInputDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScField, ScLabel, ScTimeInput } from '@semantic-components/ui';

/** locale="fr-FR": 24 hours, the parts named in French. hourCycle overrides the locale’s 12 or 24 hours. */
@Component({
  selector: 'app-locale-time-input-demo',
  imports: [ScTimeInput, ScField, ScLabel],
  template: \`
    <div scField class="w-40">
      <label scLabel>Heure d’arrivée</label>
      <div scTimeInput locale="fr-FR" [(value)]="time"></div>
    </div>
    <p class="text-muted-foreground text-sm" data-testid="picked">
      {{ time()?.toString() ?? 'No time.' }}
    </p>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class LocaleTimeInputDemo {
  readonly time = signal<Temporal.PlainTime | null>(
    Temporal.PlainTime.from('14:30'),
  );
}`;
}
