import { Directive, ElementRef, computed, inject, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[scMultiselectOrigin]',
  host: {
    'data-slot': 'multiselect-origin',
    '[class]': 'class()',
  },
})
export class ScMultiselectOrigin {
  readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn('', this.classInput()));
}
