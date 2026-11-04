import { Directive, computed, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

@Directive({
  selector: 'li[scBreadcrumbItem]',
  host: {
    '[class]': 'class()',
  },
})
export class ScBreadcrumbItem {
  private readonly styles = injectPreset().breadcrumb;

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.item, this.classInput()),
  );
}
