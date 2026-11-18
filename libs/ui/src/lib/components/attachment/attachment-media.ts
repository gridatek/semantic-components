import { Directive, computed, input } from '@angular/core';
import type { ScAttachmentMediaVariant } from '@semantic-components/styles';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

@Directive({
  selector: 'div[scAttachmentMedia]',
  host: {
    'data-slot': 'attachment-media',
    '[attr.data-variant]': 'variant()',
    '[class]': 'class()',
  },
})
export class ScAttachmentMedia {
  private readonly styles = injectStyle().attachment;
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScAttachmentMediaVariant>('icon');

  private readonly class = computed(() =>
    cn(this.styles.media({ variant: this.variant() }), this.classInput()),
  );
}
