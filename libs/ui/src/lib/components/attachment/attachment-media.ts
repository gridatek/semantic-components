import { Directive, computed, input } from '@angular/core';
import type { ScAttachmentMediaVariant } from '@semantic-components/presets';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

@Directive({
  selector: 'div[scAttachmentMedia]',
  host: {
    'data-slot': 'attachment-media',
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
