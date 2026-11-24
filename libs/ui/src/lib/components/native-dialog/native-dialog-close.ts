import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ScButtonVariants } from '../button/button';
import { ScNativeDialogProvider } from './native-dialog-provider';

/**
 * Closes the dialog, on any button: the ✕ straight in the panel (the style
 * puts it in its corner), Cancel or Done in the footer. The style's button —
 * ghost, icon-sm: the ✕; in the footer `variant="outline" size="default"`.
 */
@Directive({
  selector: 'button[scNativeDialogClose]',
  host: {
    'data-slot': 'dialog-close',
    '[attr.type]': 'type()',
    '[class]': 'class()',
    '(click)': 'provider.open.set(false)',
  },
})
export class ScNativeDialogClose {
  private readonly provider = inject(ScNativeDialogProvider);
  private readonly buttonStyles = injectStyle().button;

  readonly classInput = input<string>('', { alias: 'class' });
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-sm');

  private readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );
}
