import { computed, Directive, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: 'optgroup[sc-native-select-optgroup]',
  host: {
    'data-slot': 'native-select-optgroup',
    '[class]': 'class()',
  },
})
export class ScNativeSelectOptGroup {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));
}
