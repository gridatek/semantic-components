import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

@Directive({
  selector: 'ul[scPaginationList]',
  host: {
    '[class]': 'class()',
  },
})
export class ScPaginationList {
  private readonly styles = injectStyle().pagination;

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.list, this.classInput()),
  );
}
