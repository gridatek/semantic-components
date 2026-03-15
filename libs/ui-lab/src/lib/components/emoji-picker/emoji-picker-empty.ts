import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: '[scEmojiPickerEmpty]',
  host: {
    'data-slot': 'emoji-picker-empty',
    '[class]': 'class()',
  },
})
export class ScEmojiPickerEmpty {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'block text-muted-foreground p-4 text-center text-sm',
      this.classInput(),
    ),
  );
}
