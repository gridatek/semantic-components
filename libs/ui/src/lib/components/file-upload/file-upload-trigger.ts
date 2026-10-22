import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { type ScButtonVariants, buttonVariants } from '../button/button';
import { ScFileUpload } from './file-upload';

/** Opens the file picker: the way in by keyboard. */
@Directive({
  selector: 'button[scFileUploadTrigger]',
  host: {
    'data-slot': 'file-upload-trigger',
    type: 'button',
    '[disabled]': 'upload.disabled()',
    '[attr.aria-invalid]': 'upload.showInvalid() || null',
    '[class]': 'class()',
    '(click)': 'upload.browse()',
  },
})
export class ScFileUploadTrigger {
  protected readonly upload = inject(ScFileUpload);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('outline');
  readonly size = input<ScButtonVariants['size']>('default');

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );
}
