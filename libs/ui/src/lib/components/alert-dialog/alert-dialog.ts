import { _IdGenerator } from '@angular/cdk/a11y';
import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils';
import { ScAlertDialogProvider } from './alert-dialog-provider';

/** The alert dialog's panel: animates in when shown and out when it goes (`animate.enter` / `animate.leave`). */
@Component({
  selector: 'div[scAlertDialog]',
  template: ` <ng-content /> `,
  host: {
    role: 'alertdialog',
    'aria-modal': 'true',
    '[attr.aria-labelledby]': 'titleId',
    '[attr.aria-describedby]': 'descriptionId',
    '[attr.data-size]': 'size()',
    '[class]': 'class()',
    '[tabindex]': '-1',
    'animate.enter': 'animate-in fade-in-0 zoom-in-95',
    'animate.leave': 'animate-out fade-out-0 zoom-out-95',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScAlertDialog {
  readonly alertDialogProvider = inject(ScAlertDialogProvider);
  readonly classInput = input<string>('', { alias: 'class' });
  readonly size = input<'default' | 'sm'>('default');

  readonly dialogId = inject(_IdGenerator).getId('sc-alert-dialog-');

  readonly titleId = `${this.dialogId}-title`;
  readonly descriptionId = `${this.dialogId}-description`;

  protected readonly class = computed(() =>
    cn(
      'relative bg-background ring-foreground/10 grid w-full max-w-[calc(100%-2rem)] gap-4 rounded-xl p-4 text-sm ring-1 duration-100 outline-none',
      'data-[size=default]:max-w-xs data-[size=sm]:max-w-xs data-[size=default]:sm:max-w-sm',
      'group/alert-dialog-content',
      this.classInput(),
    ),
  );
}
