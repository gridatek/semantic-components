import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { buttonVariants } from '../button';
import { SC_FILE_UPLOAD } from './file-upload';
import { SC_FILE_UPLOAD_ITEM } from './file-upload-item';

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
  private readonly item = inject(SC_FILE_UPLOAD_ITEM);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: 'ghost', size: 'icon' }),
      'text-muted-foreground',
      this.classInput(),
    ),
  );

  onClick(): void {
    this.fileUpload.removeFile(this.item.file().id);
  }
}
