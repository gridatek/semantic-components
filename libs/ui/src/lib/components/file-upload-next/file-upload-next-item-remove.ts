import { Directive, computed, inject, input } from '@angular/core';
import { cn, ɵwarnIfUnnamed } from '../../utils';
import { type ScButtonVariants, buttonVariants } from '../button/button';
import { ScFileUploadNext } from './file-upload-next';
import { ScFileUploadNextItem } from './file-upload-next-item';

/** Takes its file out of the value. Name it ("Remove photo.jpg"). */
@Directive({
  selector: 'button[scFileUploadNextItemRemove]',
  host: {
    'data-slot': 'file-upload-item-remove',
    type: 'button',
    '[disabled]': 'upload.disabled()',
    '[class]': 'class()',
    '(click)': 'upload.remove(item.file())',
  },
})
export class ScFileUploadNextItemRemove {
  protected readonly upload = inject(ScFileUploadNext);
  protected readonly item = inject(ScFileUploadNextItem);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-sm');

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      'text-muted-foreground shrink-0',
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scFileUploadNextItemRemove');
  }
}
