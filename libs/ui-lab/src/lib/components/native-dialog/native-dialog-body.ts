import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: 'div[scNativeDialogBody]',
  host: {
    'data-slot': 'native-dialog-body',
    '[class]': 'class()',
  },
})
export class ScNativeDialogBody {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn('py-4', this.classInput()));
}
