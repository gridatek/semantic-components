import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';

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
