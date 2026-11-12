import { Directive, computed, input } from '@angular/core';
import type { ScAttachmentMediaVariant } from '@semantic-components/presets';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';

@Directive({
  selector: 'div[scAttachmentMedia]',
  host: {
    'data-slot': 'attachment-media',
    '[attr.data-variant]': 'variant()',
    '[class]': 'class()',
  },
})
export class ScAttachmentMedia {
  private readonly styles = injectPreset().attachment;
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScAttachmentMediaVariant>('icon');

  protected readonly class = computed(() =>
    cn(this.styles.media({ variant: this.variant() }), this.classInput()),
  );
}
