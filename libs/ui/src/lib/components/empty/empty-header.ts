import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

@Directive({
  selector: 'div[scEmptyHeader]',
  host: {
    '[class]': 'class()',
  },
})
export class ScEmptyHeader {
  private readonly styles = injectStyle().empty;
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.header, this.classInput()),
  );
}
