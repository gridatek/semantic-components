import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

@Directive({
  selector: 'li[scBreadcrumbItem]',
  host: {
    '[class]': 'class()',
  },
})
export class ScBreadcrumbItem {
  private readonly styles = injectStyle().breadcrumb;

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.item, this.classInput()),
  );
}
