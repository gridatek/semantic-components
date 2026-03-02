import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'option[scNativeSelectOption]',
  host: {
    'data-slot': 'native-select-option',
    '[class]': 'class()',
  },
})
export class ScNativeSelectOption {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));
}
