import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

@Directive({
  selector: 'div[scMessageGroup]',
  host: {
    'data-slot': 'message-group',
    '[class]': 'class()',
  },
})
export class ScMessageGroup {
  private readonly styles = injectStyle().message;
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.group, this.classInput()),
  );
}
