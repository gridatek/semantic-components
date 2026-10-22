import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { type ScButtonVariants, buttonVariants } from '../button';
import {
  ScInputGroup,
  type ScInputGroupButtonVariants,
  inputGroupButtonVariants,
} from '../input-group';
import { ScPopoverProvider } from '../popover';
import { ScTimePickerNext } from './time-picker-next';

/**
 * Opens the list of times: an icon button — in an input group, beside the
 * time input, its corners the group's. Write its icon and name it.
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
  protected readonly popover = inject(ScPopoverProvider);
  protected readonly picker = inject(ScTimePickerNext);
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
          buttonVariants({ variant: this.variant() ?? 'ghost' }),
          inputGroupButtonVariants({ size: this.buttonSize() }),
          this.classInput(),
        )
      : cn(
          buttonVariants({
            variant: this.variant() ?? 'outline',
            size: 'icon',
          }),
          this.classInput(),
        ),
  );
}
