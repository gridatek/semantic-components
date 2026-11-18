import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

@Directive({
  selector: 'div[scEmpty]',
  host: {
    '[class]': 'class()',
  },
})
export class ScEmpty {
  private readonly styles = injectStyle().empty;
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.root, this.classInput()),
  );
}
