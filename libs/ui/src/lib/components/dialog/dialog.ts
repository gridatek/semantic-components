import { _IdGenerator } from '@angular/cdk/a11y';
import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils';
import { ScDialogProvider } from './dialog-provider';

/** The dialog's panel: animates in when shown and out when it goes (`animate.enter` / `animate.leave`). */
@Component({
  selector: 'div[scDialog]',
  template: ` <ng-content /> `,
  host: {
    role: 'dialog',
    'aria-modal': 'true',
    '[attr.aria-labelledby]': 'titleId',
    '[attr.aria-describedby]': 'descriptionId',
    '[class]': 'class()',
    '[tabindex]': '-1',
    'animate.enter': 'animate-in fade-in-0 zoom-in-95',
    'animate.leave': 'animate-out fade-out-0 zoom-out-95',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScDialog {
  readonly dialogProvider = inject(ScDialogProvider);
  readonly classInput = input<string>('', { alias: 'class' });

  readonly dialogId = inject(_IdGenerator).getId('sc-dialog-');

  readonly titleId = `${this.dialogId}-title`;
  readonly descriptionId = `${this.dialogId}-description`;

  protected readonly class = computed(() =>
    cn(
      'mx-auto relative bg-popover text-popover-foreground ring-foreground/10 grid w-full max-w-[calc(100%-2rem)] gap-4 rounded-xl p-4 text-sm ring-1 duration-100 outline-none sm:max-w-sm',
      this.classInput(),
    ),
  );
}
