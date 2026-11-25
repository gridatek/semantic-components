import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

@Directive({
  selector: 'span[scBreadcrumbEllipsis]',
  host: {
    role: 'presentation',
    'aria-hidden': 'true',
    '[class]': 'class()',
  },
})
export class ScBreadcrumbEllipsis {
  private readonly styles = injectStyle().breadcrumb;

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.ellipsis, this.classInput()),
  );
}
