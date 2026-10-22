import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

/** The chosen files: a list of `scFileUploadItem`. */
@Directive({
  selector: 'ul[scFileUploadList]',
  host: {
    'data-slot': 'file-upload-list',
    '[class]': 'class()',
  },
})
export class ScFileUploadList {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('grid gap-2', this.classInput()),
  );
}
