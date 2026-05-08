import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: 'div[scColorPickerAreaSaturation]',
  host: {
    '[class]': 'class()',
  },
})
export class ScColorPickerAreaSaturation {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'absolute inset-0 rounded-md bg-linear-to-r from-white to-transparent',
      this.classInput(),
    ),
  );
}
