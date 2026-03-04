import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: 'div[scNativeDialogHeader]',
  host: {
    'data-slot': 'native-dialog-header',
    '[class]': 'class()',
  },
})
export class ScNativeDialogHeader {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex flex-col gap-2', this.classInput()),
  );
}
