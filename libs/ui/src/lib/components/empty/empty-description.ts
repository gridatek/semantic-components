import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

@Directive({
  selector: 'div[scEmptyDescription]',
  host: {
    '[class]': 'class()',
  },
})
export class ScEmptyDescription {
  private readonly styles = injectStyle().empty;
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.description, this.classInput()),
  );
}
