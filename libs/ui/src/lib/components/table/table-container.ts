import { Directive, booleanAttribute, computed, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

/**
 * Wraps a table so it can scroll horizontally instead of forcing its parent
 * wider. Upstream's Table renders this automatically; ScTable is an attribute
 * directive on the `table` element and cannot introduce a wrapper, so it is
 * applied by the consumer.
 */
@Directive({
  selector: 'div[scTableContainer]',
  host: {
    '[class]': 'class()',
  },
})
export class ScTableContainer {
  private readonly styles = injectPreset().table;

  readonly classInput = input<string>('', { alias: 'class' });
  /** A frame round the table, in the preset's look (its card's radius and ring). */
  readonly bordered = input<boolean, unknown>(false, {
    transform: booleanAttribute,
  });

  protected readonly class = computed(() =>
    cn(
      'relative w-full overflow-x-auto',
      this.bordered() && this.styles.bordered,
      this.classInput(),
    ),
  );
}
