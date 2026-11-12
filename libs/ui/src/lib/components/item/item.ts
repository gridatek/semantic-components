import { Directive, computed, input } from '@angular/core';
import type { ScItemSize, ScItemVariant } from '@semantic-components/presets';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';

/**
 * A row of content — media, a title and description, actions — in the
 * preset's look. On a link or a button the whole item does what it says,
 * named by its text.
 */
@Directive({
  selector: 'div[scItem], a[scItem], button[scItem]',
  host: {
    'data-slot': 'item',
    '[attr.data-variant]': 'variant()',
    '[attr.data-size]': 'size()',
    '[class]': 'class()',
  },
})
export class ScItem {
  private readonly styles = injectPreset().item;
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScItemVariant>('default');
  readonly size = input<ScItemSize>('default');

  protected readonly class = computed(() =>
    cn(
      this.styles.root({ variant: this.variant(), size: this.size() }),
      '[button]:cursor-pointer [button]:text-start [button]:transition-colors [button]:hover:bg-muted',
      this.classInput(),
    ),
  );
}
