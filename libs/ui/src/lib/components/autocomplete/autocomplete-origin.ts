import { Directive, ElementRef, computed, inject, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[scAutocompleteOrigin]',
  host: {
    '[class]': 'class()',
  },
})
export class ScAutocompleteOrigin {
  readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn('', this.classInput()));
}
