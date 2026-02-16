import { computed, Directive, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: 'div[scNativeSelectContainer]',
  host: {
    'data-slot': 'native-select-container',
    '[class]': 'class()',
  },
})
export class ScNativeSelectContainer {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'group/native-select relative w-fit has-[select:disabled]:opacity-50',
      this.classInput(),
    ),
  );
}
