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
  private readonly code = `import {
  Component,
  HostAttributeToken,
  LOCALE_ID,
  ViewEncapsulation,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import { ScField, ScLabel, ScTimeInput } from '@semantic-components/ui';

/** A field in the locale of its lang attribute. */
@Component({
  selector: 'app-locale-time',
  imports: [ScField, ScLabel, ScTimeInput],
  template: \`
    <div scField>
      <label scLabel>{{ label() }}</label>
      <div scTimeInput [(value)]="value"></div>
    </div>
  \`,
  providers: [
    {
      provide: LOCALE_ID,
      useFactory: () => inject(new HostAttributeToken('lang')),
    },
  ],
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
class LocaleTime {
  readonly label = input.required<string>();
  readonly value = model<Temporal.PlainTime | null>(null);
}

/** The same time in three locales: the parts' order, separators, clock and names are the locale's (LOCALE_ID). */
@Component({
  selector: 'app-locale-time-input-demo',
  imports: [LocaleTime],
  template: \`
    <div class="grid grid-cols-1 w-full max-w-md gap-4 sm:grid-cols-3">
      <app-locale-time lang="en-GB" label="Arrival time" [(value)]="time" />
      <app-locale-time lang="de-DE" label="Ankunftszeit" [(value)]="time" />
      <app-locale-time lang="ko-KR" label="도착 시간" [(value)]="time" />
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class LocaleTimeInputDemo {
  private readonly time = signal<Temporal.PlainTime | null>(
    Temporal.PlainTime.from('14:30'),
  );
}`;
}
