import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: 'h2[scNativeDialogTitle]',
  host: {
    'data-slot': 'native-dialog-title',
    '[class]': 'class()',
  },
})
export class ScNativeDialogTitle {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('text-lg font-semibold leading-none', this.classInput()),
  );
}
