import { Directive, computed, input } from '@angular/core';
import type { ScItemMediaVariant } from '@semantic-components/presets';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';

/** Your icon, avatar or image, at the item's start. */
@Directive({
  selector: 'div[scItemMedia]',
  host: {
    'data-slot': 'item-media',
    '[attr.data-variant]': 'variant()',
    '[class]': 'class()',
  },
})
export class ScItemMedia {
  private readonly styles = injectPreset().item;
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScItemMediaVariant>('default');

  protected readonly class = computed(() =>
    cn(this.styles.media({ variant: this.variant() }), this.classInput()),
  );
}
