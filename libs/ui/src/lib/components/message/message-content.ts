import { Directive, computed, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils/cn/cn';

@Directive({
  selector: 'div[scMessageContent]',
  host: {
    'data-slot': 'message-content',
    '[class]': 'class()',
  },
})
export class ScMessageContent {
  private readonly styles = injectPreset().message;
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.content, this.classInput()),
  );
}
