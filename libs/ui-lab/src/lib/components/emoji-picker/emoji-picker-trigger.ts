import { Directive, computed, input } from '@angular/core';
import { buttonVariants, cn } from '@semantic-components/ui';

@Directive({
  selector: 'button[scEmojiPickerTrigger]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '[attr.aria-label]': 'ariaLabel()',
  },
})
export class ScEmojiPickerTrigger {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly ariaLabelInput = input('', { alias: 'aria-label' });

  protected readonly class = computed(() =>
    cn(buttonVariants({ variant: 'ghost', size: 'icon' }), this.classInput()),
  );

  protected readonly ariaLabel = computed(
    () => this.ariaLabelInput() || 'Open emoji picker',
  );
}
