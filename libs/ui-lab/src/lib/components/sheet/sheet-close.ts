import { computed, Directive, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { ScSheetProvider } from './sheet-provider';
import { buttonVariants, ScButtonVariants } from '../button';

@Directive({
  selector: 'button[sc-sheet-close]',
  host: {
    'data-slot': 'sheet-close',
    '[class]': 'class()',
    '(click)': 'closeSheet()',
  },
})
export class ScSheetClose {
  private readonly sheetProvider = inject(ScSheetProvider);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-sm');

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      'absolute top-3 right-3 z-10',
      this.classInput(),
    ),
  );

  protected closeSheet(): void {
    this.sheetProvider.open.set(false);
  }
}
