import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { injectFormatNumber } from '@semantic-components/ui';
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
  /** Numbers as the library writes them: the user's digits, in order. */
  private readonly formatNumber = injectFormatNumber();

  readonly classInput = input<string>('', { alias: 'class' });
  readonly value = input<number | null>(null);
  readonly format = input<Intl.NumberFormatOptions>({});

  private readonly text = computed(() => {
    const value = this.value();
    return value === null ? '' : this.formatNumber(value, this.format());
  });

  private readonly class = computed(() =>
    cn(
      'basis-full text-2xl font-semibold tracking-tight tabular-nums',
      this.classInput(),
    ),
  );
}
