import { Directive, computed, input } from '@angular/core';
import type { ScItemMediaVariant } from '@semantic-components/styles';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

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
  private readonly styles = injectStyle().item;
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScItemMediaVariant>('default');

  private readonly class = computed(() =>
    cn(this.styles.media({ variant: this.variant() }), this.classInput()),
  );
}
