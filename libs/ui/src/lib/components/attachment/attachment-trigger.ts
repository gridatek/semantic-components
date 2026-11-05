import { Directive, ElementRef, computed, inject, input } from '@angular/core';
import { cn } from '../../utils/cn/cn';

/**
 * Stretches over the whole attachment so the entire card is the click target,
 * while the actions sit above it on a higher stacking layer.
 */
@Directive({
  selector: 'a[scAttachmentTrigger], button[scAttachmentTrigger]',
  host: {
    'data-slot': 'attachment-trigger',
    // On a button, not a submit; a link keeps none.
    '[attr.type]': "isButton ? 'button' : null",
    '[class]': 'class()',
  },
})
export class ScAttachmentTrigger {
  protected readonly isButton =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement.tagName ===
    'BUTTON';
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('absolute inset-0 z-10 outline-none', this.classInput()),
  );
}
