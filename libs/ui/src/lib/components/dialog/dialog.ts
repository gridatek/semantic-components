import { _IdGenerator } from '@angular/cdk/a11y';
import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import { ScDialogProvider } from './dialog-provider';

/**
 * The dialog's panel: animates in when shown and out when it goes
 * (`animate.enter` / `animate.leave`). A close straight in it (the ✕) goes
 * in its corner, from the preset.
 */
@Component({
  selector: 'div[scDialog]',
  template: ` <ng-content /> `,
  host: {
    role: 'dialog',
    'aria-modal': 'true',
    '[attr.aria-labelledby]': 'titleId',
    '[attr.aria-describedby]': 'descriptionId',
    '[class]': 'class()',
    '[attr.dir]': 'direction',
    '[attr.lang]': 'lang',
    '[tabindex]': '-1',
    'animate.enter': 'animate-in fade-in-0 zoom-in-95',
    'animate.leave': 'animate-out fade-out-0 zoom-out-95',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScDialog {
  private readonly styles = injectPreset().dialog;
  readonly dialogProvider = inject(ScDialogProvider);
  // Created as it opens: its provider's direction and language then.
  protected readonly direction = this.dialogProvider.direction();
  protected readonly lang = this.dialogProvider.lang();
  readonly classInput = input<string>('', { alias: 'class' });

  readonly dialogId = inject(_IdGenerator).getId('sc-dialog-');

  readonly titleId = `${this.dialogId}-title`;
  readonly descriptionId = `${this.dialogId}-description`;

  protected readonly class = computed(() =>
    cn(
      'relative mx-auto',
      this.styles.content,
      // The ✕: a close straight in the panel, in its corner.
      this.styles.close,
      this.classInput(),
    ),
  );
}
