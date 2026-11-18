import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

@Directive({
  selector: 'div[scMessageFooter]',
  host: {
    'data-slot': 'message-footer',
    '[class]': 'class()',
  },
})
export class ScMessageFooter {
  private readonly styles = injectStyle().message;
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.footer, this.classInput()),
  );
}
