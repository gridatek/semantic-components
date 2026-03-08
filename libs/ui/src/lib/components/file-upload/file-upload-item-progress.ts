import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';
import { ScFileUploadFile } from './file-upload';

@Directive({
  selector: '[scFileUploadItemProgress]',
  host: {
    'data-slot': 'file-upload-item-progress',
    '[class]': 'class()',
  },
})
export class ScFileUploadItemProgress {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly file = input.required<ScFileUploadFile>();

  protected readonly class = computed(() => cn('block', this.classInput()));
}
