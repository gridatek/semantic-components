import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { SC_FILE_UPLOAD_ITEM } from './file-upload-item';

@Directive({
  selector: '[scFileUploadItemProgress]',
  host: {
    'data-slot': 'file-upload-item-progress',
    '[class]': 'class()',
  },
})
export class ScFileUploadItemProgress {
  readonly item = inject(SC_FILE_UPLOAD_ITEM);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn('block', this.classInput()));
}
