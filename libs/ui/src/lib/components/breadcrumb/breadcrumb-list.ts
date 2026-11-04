import { Directive, computed, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

@Directive({
  selector: 'ol[scBreadcrumbList]',
  host: {
    '[class]': 'class()',
  },
})
export class ScBreadcrumbList {
  private readonly styles = injectPreset().breadcrumb;

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.list, this.classInput()),
  );
}
