import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { buttonVariants } from '../button';
import { SC_FILE_UPLOAD } from './file-upload';

@Directive({
  selector: 'label[scFileUploadTrigger]',
  host: {
    'data-slot': 'file-upload-trigger',
    '[class]': 'class()',
    '[attr.data-disabled]': 'fileUpload.disabled() || null',
  },
})
export class ScFileUploadTrigger {
  readonly fileUpload = inject(SC_FILE_UPLOAD);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'relative',
      // <label> is not interactive, so we add cursor-pointer manually
      'cursor-pointer',
      buttonVariants({ variant: 'default', size: 'lg' }),
      // aria-disabled is not valid on <label>, use data-disabled for styling
      'data-disabled:pointer-events-none data-disabled:opacity-50',
      this.classInput(),
    ),
  );
}
