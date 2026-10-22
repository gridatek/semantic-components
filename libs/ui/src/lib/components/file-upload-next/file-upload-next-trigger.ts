import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { type ScButtonVariants, buttonVariants } from '../button/button';
import { ScFileUploadNext } from './file-upload-next';

/** Opens the file picker: the way in by keyboard. */
@Directive({
  selector: 'button[scFileUploadNextTrigger]',
  host: {
    'data-slot': 'file-upload-trigger',
    type: 'button',
    '[disabled]': 'upload.disabled()',
    '[attr.aria-invalid]': 'upload.showInvalid() || null',
    '[class]': 'class()',
    '(click)': 'upload.browse()',
  },
})
export class ScFileUploadNextTrigger {
  protected readonly upload = inject(ScFileUploadNext);

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
