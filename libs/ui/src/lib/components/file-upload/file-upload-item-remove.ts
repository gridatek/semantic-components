import { Directive, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn, ɵwarnIfUnnamed } from '../../utils';
import { type ScButtonVariants } from '../button/button';
import { ScFileUpload } from './file-upload';
import { ScFileUploadItem } from './file-upload-item';

/** Takes its file out of the value. Name it ("Remove photo.jpg"). */
@Directive({
  selector: 'button[scFileUploadItemRemove]',
  host: {
    'data-slot': 'file-upload-item-remove',
    type: 'button',
    '[disabled]': 'upload.disabled()',
    '[class]': 'class()',
    '(click)': 'upload.remove(item.file())',
  },
})
export class ScFileUploadItemRemove {
  private readonly buttonStyles = injectPreset().button;

  protected readonly upload = inject(ScFileUpload);
  protected readonly item = inject(ScFileUploadItem);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-sm');

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      'text-muted-foreground shrink-0',
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scFileUploadItemRemove');
  }
}
