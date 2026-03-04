import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScNativeDialogProvider } from './native-dialog-provider';

@Directive({
  selector: 'button[scNativeDialogTrigger]',
  host: {
    'data-slot': 'native-dialog-trigger',
    type: 'button',
    '[class]': 'class()',
    '[attr.aria-haspopup]': '"dialog"',
    '[attr.aria-expanded]': 'dialogProvider.open()',
    '(click)': 'openDialog()',
  },
})
export class ScNativeDialogTrigger {
  readonly dialogProvider = inject(ScNativeDialogProvider);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn('', this.classInput()));

  openDialog(): void {
    this.dialogProvider.open.set(true);
  }
}
