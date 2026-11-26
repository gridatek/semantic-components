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
import { ScDateInput, ScField, ScLabel } from '@semantic-components/ui';

/** A field in the locale of its lang attribute. */
@Component({
  selector: 'app-locale-date',
  imports: [ScDateInput, ScField, ScLabel],
  template: \`
    <div scField>
      <label scLabel>{{ label() }}</label>
      <div scDateInput [(value)]="value"></div>
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
class LocaleDate {
  readonly label = input.required<string>();
  readonly value = model<Temporal.PlainDate | null>(null);
}

/** The same day in three locales: the parts' order, the separators and the names are the locale's (LOCALE_ID). */
@Component({
  selector: 'app-locale-date-input-demo',
  imports: [LocaleDate],
  template: \`
    <div class="grid w-full max-w-lg grid-cols-1 gap-4 sm:grid-cols-3">
      <app-locale-date lang="en-GB" label="Date" [(value)]="day" />
      <app-locale-date lang="de-DE" label="Datum" [(value)]="day" />
      <app-locale-date lang="ja-JP" label="日付" [(value)]="day" />
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class LocaleDateInputDemo {
  private readonly day = signal<Temporal.PlainDate | null>(
    Temporal.PlainDate.from('2026-11-02'),
  );
}`;
}
