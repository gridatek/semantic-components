import { Directive, computed, input } from '@angular/core';
import type { ScEmptyMediaVariant } from '@semantic-components/styles';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

/** Your icon, avatar or image above the title; `icon` frames an icon. */
@Directive({
  selector: 'div[scEmptyMedia]',
  host: {
    '[attr.data-variant]': 'variant()',
    '[class]': 'class()',
  },
})
export class ScEmptyMedia {
  private readonly styles = injectStyle().empty;
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScEmptyMediaVariant>('default');

  private readonly class = computed(() =>
    cn(this.styles.media({ variant: this.variant() }), this.classInput()),
  );
}
