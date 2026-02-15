import { computed, Directive, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { ScDialogProvider } from './dialog-provider';

@Directive({
  selector: 'button[sc-dialog-trigger]',
  host: {
    'data-slot': 'dialog-trigger',
    type: 'button',
    '[class]': 'class()',
    '[attr.aria-haspopup]': '"dialog"',
    '[attr.aria-expanded]': 'dialogProvider.open()',
    '(click)': 'openDialog()',
  },
})
export class ScDialogTrigger {
  readonly dialogProvider = inject(ScDialogProvider);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn('', this.classInput()));

  openDialog(): void {
    this.dialogProvider.open.set(true);
  }
}
