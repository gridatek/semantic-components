import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';

@Directive({
  selector: 'li[scPaginationItem]',
  host: {
    '[class]': 'class()',
  },
})
export class ScPaginationItem {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() => cn('', this.classInput()));
}
