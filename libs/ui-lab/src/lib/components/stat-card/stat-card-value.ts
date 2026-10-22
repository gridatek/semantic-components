import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScStatCard } from './stat-card';

/**
 * The figure, on a `<dd>`: `value` written by `Intl.NumberFormat` with
 * `format` (currency, percent, compact…) — or, without one, your text.
 */
@Component({
  selector: '[scStatCardValue]',
  template: `{{ text() }}<ng-content />`,
  host: {
    'data-slot': 'stat-card-value',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScStatCardValue {
  private readonly card = inject(ScStatCard);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly value = input<number | null>(null);
  readonly format = input<Intl.NumberFormatOptions>({});

  protected readonly text = computed(() => {
    const value = this.value();
    return value === null
      ? ''
      : new Intl.NumberFormat(this.card.locale(), this.format()).format(value);
  });

  protected readonly class = computed(() =>
    cn(
      'basis-full text-2xl font-semibold tracking-tight tabular-nums',
      this.classInput(),
    ),
  );
}
