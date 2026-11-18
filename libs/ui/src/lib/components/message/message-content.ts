import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

@Directive({
  selector: 'div[scMessageContent]',
  host: {
    'data-slot': 'message-content',
    '[class]': 'class()',
  },
})
export class ScMessageContent {
  private readonly styles = injectStyle().message;
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.content, this.classInput()),
  );
}
