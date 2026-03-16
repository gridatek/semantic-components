import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: 'div[scColorPickerAreaBrightness]',
  host: {
    'data-slot': 'color-picker-area-brightness',
    '[class]': 'class()',
  },
})
export class ScColorPickerAreaBrightness {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'absolute inset-0 rounded-md bg-linear-to-t from-black to-transparent',
      this.classInput(),
    ),
  );
}
