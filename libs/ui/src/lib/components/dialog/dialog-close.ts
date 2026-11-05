import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { ScDialogProvider } from './dialog-provider';

/**
 * Closes the dialog, on any button — the ✕ (`scButton variant="ghost"
 * size="icon-sm"`, straight in the dialog: in its corner), Cancel, Done.
 * Behaviour only: the look is the button's. Code to run before closing
 * (Save) closes through the provider's `[(open)]` instead.
 */
@Directive({
  selector: 'button[scDialogClose]',
  host: {
    'data-slot': 'dialog-close',
    type: 'button',
    '[class]': 'class()',
    '(click)': 'close()',
  },
})
export class ScDialogClose {
  private readonly dialogProvider = inject(ScDialogProvider);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));

  protected close(): void {
    this.dialogProvider.open.set(false);
  }
}
