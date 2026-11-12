import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';

@Directive({
  selector: 'span[scBreadcrumbEllipsis]',
  host: {
    role: 'presentation',
    'aria-hidden': 'true',
    '[class]': 'class()',
  },
})
export class ScBreadcrumbEllipsis {
  private readonly styles = injectPreset().breadcrumb;

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.ellipsis, this.classInput()),
  );
}
