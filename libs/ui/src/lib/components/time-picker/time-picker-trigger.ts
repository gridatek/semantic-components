import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { Directive, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import { type ScButtonVariants } from '../button';
import {
  ScInputGroup,
  type ScInputGroupButtonVariants,
  inputGroupButtonVariants,
} from '../input-group';
import { ScPopoverProvider } from '../popover';
import { ScTimePicker } from './time-picker';

/**
 * Opens the list of times: an icon button — in an input group, beside the
 * time input, its corners the group's. Write its icon and name it.
 */
@Directive({
  selector: 'button[scTimePickerTrigger]',
  exportAs: 'scTimePickerTrigger',
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
export class ScTimePickerTrigger {
  private readonly buttonStyles = injectPreset().button;

  protected readonly popover = inject(ScPopoverProvider);
  protected readonly picker = inject(ScTimePicker);
  private readonly group = inject(ScInputGroup, { optional: true });
  readonly overlayOrigin = inject(CdkOverlayOrigin);

  readonly classInput = input<string>('', { alias: 'class' });
  /** The button's look: ghost in an input group, outline alone. */
  readonly variant = input<ScButtonVariants['variant'] | undefined>(undefined);
  /** In an input group: its size there. */
  readonly buttonSize = input<ScInputGroupButtonVariants['size']>('icon-xs');

  protected readonly class = computed(() =>
    this.group
      ? cn(
          this.buttonStyles({ variant: this.variant() ?? 'ghost' }),
          inputGroupButtonVariants({ size: this.buttonSize() }),
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
