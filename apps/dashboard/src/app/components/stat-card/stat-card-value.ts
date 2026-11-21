import {
  Component,
  LOCALE_ID,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';
import { AppStatCard } from './stat-card';

/**
 * The figure, on a `<dd>`: `value` written by `Intl.NumberFormat` with
 * `format` (currency, percent, compact…) — or, without one, your text.
 */
@Component({
  // On your dd, as the library's parts were (from its Stat Card).
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[appStatCardValue]',
  template: `{{ text() }}<ng-content />`,
  host: {
    'data-slot': 'stat-card-value',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class AppStatCardValue {
  private readonly card = inject(AppStatCard);
  private readonly locale = inject(LOCALE_ID);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly value = input<number | null>(null);
  readonly format = input<Intl.NumberFormatOptions>({});

  private readonly text = computed(() => {
    const value = this.value();
    return value === null
      ? ''
      : new Intl.NumberFormat(this.locale, this.format()).format(value);
  });

  private readonly class = computed(() =>
    cn(
      'basis-full text-2xl font-semibold tracking-tight tabular-nums',
      this.classInput(),
    ),
  );
}
