import { Directive, computed, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils/cn/cn';

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
  private readonly styles = injectPreset().message;
  readonly classInput = input<string>('', { alias: 'class' });
  readonly align = input<'start' | 'end'>('start');

  protected readonly class = computed(() =>
    cn(this.styles.root, this.classInput()),
  );
}
