import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

/** The chosen files: a list of `scFileUploadNextItem`. */
@Directive({
  selector: 'ul[scFileUploadNextList]',
  host: {
    'data-slot': 'file-upload-list',
    '[class]': 'class()',
  },
})
export class ScFileUploadNextList {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('grid gap-2', this.classInput()),
  );
}
