import { Directive, ElementRef, computed, inject, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[scSelectOrigin]',
  host: {
    'data-slot': 'select-origin',
    '[class]': 'class()',
  },
})
export class ScSelectOrigin {
  readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn('', this.classInput()));
}
