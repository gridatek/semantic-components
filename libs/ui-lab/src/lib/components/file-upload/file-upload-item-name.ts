import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[sc-file-upload-item-name]',
  host: {
    'data-slot': 'file-upload-item-name',
    '[class]': 'class()',
  },
})
export class ScFileUploadItemName {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex-1 truncate text-sm font-medium', this.classInput()),
  );
}
