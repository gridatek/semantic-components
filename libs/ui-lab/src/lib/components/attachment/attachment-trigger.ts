import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

/**
 * Stretches over the whole attachment so the entire card is the click target,
 * while the actions sit above it on a higher stacking layer.
 */
@Directive({
  selector: 'a[scAttachmentTrigger], button[scAttachmentTrigger]',
  host: {
    'data-slot': 'attachment-trigger',
    '[class]': 'class()',
  },
})
export class ScAttachmentTrigger {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('absolute inset-0 z-10 outline-none', this.classInput()),
  );
}
