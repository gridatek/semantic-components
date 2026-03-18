import { Directive, computed, input } from '@angular/core';
import { buttonVariants, cn } from '@semantic-components/ui';

@Directive({
  selector: 'button[scEmojiPickerTrigger]',
  host: {
    'data-slot': 'emoji-picker-trigger',
    type: 'button',
    '[class]': 'class()',
  },
})
export class ScEmojiPickerTrigger {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(buttonVariants({ variant: 'ghost', size: 'icon' }), this.classInput()),
  );
}
