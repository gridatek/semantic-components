import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

@Directive({
  selector: 'ol[scBreadcrumbList]',
  host: {
    '[class]': 'class()',
  },
})
export class ScBreadcrumbList {
  private readonly styles = injectStyle().breadcrumb;

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.list, this.classInput()),
  );
}
