import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils/cn/cn';

@Directive({
  selector: 'div[scNativeDialogHeader]',
  host: {
    '[class]': 'class()',
  },
})
export class ScNativeDialogHeader {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('gap-2 flex flex-col', this.classInput()),
  );
}
