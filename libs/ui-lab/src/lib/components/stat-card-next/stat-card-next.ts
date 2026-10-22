import { Directive, LOCALE_ID, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

/**
 * A stat card: one figure, its label, and how it changed — on your `<dl>`:
 * the label a `<dt>`, the value, change and description `<dd>`s. Numbers
 * are written in `locale` (the app's).
 */
@Directive({
  selector: '[scStatCardNext]',
  host: {
    'data-slot': 'stat-card',
    '[class]': 'class()',
  },
})
export class ScStatCardNext {
  readonly classInput = input<string>('', { alias: 'class' });
  /** The language its numbers are written in. */
  readonly locale = input(inject(LOCALE_ID));

  protected readonly class = computed(() =>
    cn(
      'ring-foreground/10 bg-card text-card-foreground flex flex-wrap items-baseline gap-x-2 gap-y-1 rounded-xl p-4 text-sm ring-1',
      this.classInput(),
    ),
  );
}
