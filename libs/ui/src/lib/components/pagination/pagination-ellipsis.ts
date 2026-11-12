import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';

@Directive({
  selector: 'span[scPaginationEllipsis]',
  host: {
    'aria-hidden': 'true',
    '[class]': 'class()',
  },
})
export class ScPaginationEllipsis {
  private readonly styles = injectPreset().pagination;

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.ellipsis, this.classInput()),
  );
}
