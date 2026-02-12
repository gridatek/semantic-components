import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[sc-file-upload-list]',
  host: {
    'data-slot': 'file-upload-list',
    '[class]': 'class()',
  },
})
export class ScFileUploadList {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('mt-4 space-y-2', this.classInput()),
  );
}
