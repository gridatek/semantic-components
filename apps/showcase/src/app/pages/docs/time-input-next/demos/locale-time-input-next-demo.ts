import {
  Component,
  HostAttributeToken,
  LOCALE_ID,
  ViewEncapsulation,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import { ScField, ScLabel, ScTimeInputNext } from '@semantic-components/ui';

/** A field in the locale of its lang attribute. */
@Component({
  selector: 'app-locale-time',
  imports: [ScField, ScLabel, ScTimeInputNext],
  template: `
    <div scField>
      <label scLabel>{{ label() }}</label>
      <div scTimeInputNext [(value)]="value"></div>
    </div>
  `,
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
  selector: 'app-locale-time-input-next-demo',
  imports: [LocaleTime],
  template: `
    <div class="grid w-full max-w-md gap-4 sm:grid-cols-3">
      <app-locale-time lang="en-GB" label="Arrival time" [(value)]="time" />
      <app-locale-time lang="de-DE" label="Ankunftszeit" [(value)]="time" />
      <app-locale-time lang="ko-KR" label="도착 시간" [(value)]="time" />
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class LocaleTimeInputNextDemo {
  private readonly time = signal<Temporal.PlainTime | null>(
    Temporal.PlainTime.from('14:30'),
  );
}
