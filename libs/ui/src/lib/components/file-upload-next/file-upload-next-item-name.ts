import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

/** The file's name, as you write it: cut short when long. */
@Directive({
  selector: '[scFileUploadNextItemName]',
  host: {
    'data-slot': 'file-upload-item-name',
    '[class]': 'class()',
  },
})
export class ScFileUploadNextItemName {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('min-w-0 flex-1 truncate font-medium', this.classInput()),
  );
}
