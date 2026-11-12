import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';

@Directive({
  selector: 'ul[scPaginationList]',
  host: {
    '[class]': 'class()',
  },
})
export class ScPaginationList {
  private readonly styles = injectPreset().pagination;

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.list, this.classInput()),
  );
}
