import { computed, Directive, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: 'option[sc-native-select-option]',
  host: {
    'data-slot': 'native-select-option',
    '[class]': 'class()',
  },
})
export class ScNativeSelectOption {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));
}
