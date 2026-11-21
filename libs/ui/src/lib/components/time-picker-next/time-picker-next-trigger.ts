import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { Directive, computed, inject, input } from '@angular/core';
import type { ScInputGroupButtonSize } from '@semantic-components/styles';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { type ScButtonVariants } from '../button';
import { ScInputGroup } from '../input-group';
import { ScPopoverProvider } from '../popover';
import { ScTimePickerNext } from './time-picker-next';

/**
 * Opens the columns: an icon button — in an input group, beside the time
 * input, its corners the group's. Write its icon and name it.
 */
@Directive({
  selector: 'button[scTimePickerNextTrigger]',
  exportAs: 'scTimePickerNextTrigger',
  hostDirectives: [CdkOverlayOrigin],
  host: {
    'data-slot': 'time-picker-trigger',
    type: 'button',
    'aria-haspopup': 'dialog',
    '[attr.aria-expanded]': 'popover.open()',
    '[disabled]': 'picker.timeInput().disabled()',
    '[class]': 'class()',
    '(click)': 'popover.open.update((open) => !open)',
  },
})
export class ScTimePickerNextTrigger {
  private readonly buttonStyles = injectStyle().button;
  private readonly groupButtonStyles = injectStyle().inputGroupButton;

  private readonly popover = inject(ScPopoverProvider);
  private readonly picker = inject(ScTimePickerNext);
  private readonly group = inject(ScInputGroup, { optional: true });
  readonly overlayOrigin = inject(CdkOverlayOrigin);

  readonly classInput = input<string>('', { alias: 'class' });
  /** The button's look: ghost in an input group, outline alone. */
  readonly variant = input<ScButtonVariants['variant'] | undefined>(undefined);
  /** In an input group: its size there. */
  readonly buttonSize = input<ScInputGroupButtonSize>('icon-xs');

  private readonly class = computed(() =>
    this.group
      ? cn(
          this.buttonStyles({ variant: this.variant() ?? 'ghost' }),
          this.groupButtonStyles({ size: this.buttonSize() }),
          this.classInput(),
        )
      : cn(
          this.buttonStyles({
            variant: this.variant() ?? 'outline',
            size: 'icon',
          }),
          this.classInput(),
        ),
  );
}
