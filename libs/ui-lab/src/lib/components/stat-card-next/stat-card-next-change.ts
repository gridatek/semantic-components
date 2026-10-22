import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScStatCardNext } from './stat-card-next';

/** Which way a figure going is good news. */
export type ScStatCardNextGood = 'up' | 'down';

/**
 * How the figure changed, on a `<dd>`: `value` written with its sign, by
 * `Intl.NumberFormat` with `format`. Good news (the `good` way) in the
 * theme's success colour, bad in its destructive one. Your icon goes first;
 * your other text after it.
 */
@Component({
  selector: '[scStatCardNextChange]',
  template: `<ng-content select="svg" />{{ text() }}<ng-content />`,
  host: {
    'data-slot': 'stat-card-change',
    '[attr.data-trend]': 'trend()',
    '[attr.data-good]': 'isGood()',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScStatCardNextChange {
  private readonly card = inject(ScStatCardNext);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly value = input.required<number>();
  readonly format = input<Intl.NumberFormatOptions>({});
  /** The way that is good news: `up` (revenue), `down` (costs, errors). */
  readonly good = input<ScStatCardNextGood>('up');

  readonly trend = computed(() => {
    const value = this.value();
    return value > 0 ? 'up' : value < 0 ? 'down' : 'none';
  });
  /** Good news, bad news — or neither, unchanged. */
  readonly isGood = computed(() => {
    const trend = this.trend();
    return trend === 'none' ? null : trend === this.good();
  });

  protected readonly text = computed(() =>
    new Intl.NumberFormat(this.card.locale(), {
      ...this.format(),
      signDisplay: 'exceptZero',
    }).format(this.value()),
  );

  protected readonly class = computed(() =>
    cn(
      'text-muted-foreground inline-flex items-center gap-1 text-xs font-medium tabular-nums data-[good=false]:text-destructive data-[good=true]:text-success [&_svg]:size-3.5 [&_svg]:shrink-0',
      this.classInput(),
    ),
  );
}
