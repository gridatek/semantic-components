import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { LocaleTimeClockDemo } from './locale-time-clock-demo';

@Component({
  selector: 'app-locale-time-clock-demo-container',
  imports: [DemoContainer, LocaleTimeClockDemo],
  template: `
    <app-demo-container
      title="24 hours"
      [code]="code"
      demoUrl="/demos/time-clock/locale-time-clock-demo"
    >
      <app-locale-time-clock-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class LocaleTimeClockDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScTimeClock,
  ScTimeClockDial,
  ScTimeClockHeader,
} from '@semantic-components/ui-lab';

/** locale="fr-FR": 24 hours — 13 to 00 on an inner ring. hourCycle overrides the locale’s 12 or 24. */
@Component({
  selector: 'app-locale-time-clock-demo',
  imports: [ScTimeClock, ScTimeClockHeader, ScTimeClockDial],
  template: \`
    <div scTimeClock #clock="scTimeClock" locale="fr-FR" [(value)]="time">
      <div scTimeClockHeader></div>
      <div
        scTimeClockDial
        [attr.aria-label]="clock.view() === 'hours' ? 'Heures' : 'Minutes'"
      ></div>
    </div>
    <p class="text-muted-foreground text-sm" data-testid="picked">
      {{ time()?.toString() ?? 'No time.' }}
    </p>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class LocaleTimeClockDemo {
  readonly time = signal<Temporal.PlainTime | null>(
    Temporal.PlainTime.from('18:45'),
  );
}`;
}
