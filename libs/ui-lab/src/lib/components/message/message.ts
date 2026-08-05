import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

/**
 * A row in a conversation: an avatar beside a column of bubbles. `align="end"`
 * reverses the row and is read by ScBubble, which pushes itself to the inline
 * end in response.
 */
@Directive({
  selector: 'div[scMessage]',
  host: {
    'data-slot': 'message',
    '[attr.data-align]': 'align()',
    '[class]': 'class()',
  },
})
export class ScMessage {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly align = input<'start' | 'end'>('start');

  protected readonly class = computed(() =>
    cn(
      'group/message relative flex w-full min-w-0 gap-2 text-sm data-[align=end]:flex-row-reverse',
      this.classInput(),
    ),
  );
}
