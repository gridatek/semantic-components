import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';

@Directive({
  selector: 'div[scNativeDialogBody]',
  host: {
    '[class]': 'class()',
  },
})
export class ScNativeDialogBody {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() => cn('py-4', this.classInput()));
}
