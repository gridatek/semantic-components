import { computed, Directive, inject, input } from '@angular/core';
import { buttonVariants } from '../button';
import { cn } from '../../utils';
import { SC_FILE_UPLOAD } from './file-upload';

@Directive({
  selector: 'button[scFileUploadItemDelete]',
  host: {
    'data-slot': 'file-upload-item-delete',
    type: 'button',
    '[class]': 'class()',
    '(click)': 'onClick()',
  },
})
export class ScFileUploadItemDelete {
  private readonly fileUpload = inject(SC_FILE_UPLOAD);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly fileId = input.required<string>();

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: 'ghost', size: 'icon' }),
      'text-muted-foreground',
      this.classInput(),
    ),
  );

  onClick(): void {
    this.fileUpload.removeFile(this.fileId());
  }
}
