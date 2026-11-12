import { Directive, computed, input } from '@angular/core';
import type { ScEmptyMediaVariant } from '@semantic-components/presets';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';

/** Your icon, avatar or image above the title; `icon` frames an icon. */
@Directive({
  selector: 'div[scEmptyMedia]',
  host: {
    '[attr.data-variant]': 'variant()',
    '[class]': 'class()',
  },
})
export class ScEmptyMedia {
  private readonly styles = injectPreset().empty;
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScEmptyMediaVariant>('default');

  protected readonly class = computed(() =>
    cn(this.styles.media({ variant: this.variant() }), this.classInput()),
  );
}
