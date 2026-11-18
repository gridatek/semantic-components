import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

@Directive({
  selector: 'span[scPaginationEllipsis]',
  host: {
    'aria-hidden': 'true',
    '[class]': 'class()',
  },
})
export class ScPaginationEllipsis {
  private readonly styles = injectStyle().pagination;

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.ellipsis, this.classInput()),
  );
}
