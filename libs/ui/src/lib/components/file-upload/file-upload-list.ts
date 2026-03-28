import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[scFileUploadList]',
  host: {
    '[class]': 'class()',
  },
})
export class ScFileUploadList {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('mt-4 space-y-2', this.classInput()),
  );
}
