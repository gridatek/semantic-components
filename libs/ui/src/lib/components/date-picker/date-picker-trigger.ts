import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { Directive, computed, inject, input } from '@angular/core';
import type { ScInputGroupButtonSize } from '@semantic-components/presets';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import { type ScButtonVariants } from '../button';
import { ScInputGroup } from '../input-group';
import { ScPopoverProvider } from '../popover';
import { selectTriggerStyles } from '../select/select-trigger';
import { ScDatePicker } from './date-picker';

/**
 * Opens the calendar: the picker's value, as written — in the input look
 * (the select trigger's). Write its icon and text
 * (`{{ dp.text() || 'Pick a date' }}`); `data-placeholder` while empty.
 * In an input group, with a typed input: an icon button (`variant`,
 * `size`) — name it.
 */
@Directive({
  selector: 'button[scDatePickerTrigger]',
  exportAs: 'scDatePickerTrigger',
  hostDirectives: [CdkOverlayOrigin],
  host: {
    'data-slot': 'date-picker-trigger',
    type: 'button',
    'aria-haspopup': 'dialog',
    '[attr.aria-expanded]': 'popover.open()',
    '[attr.data-placeholder]': '!picker.hasValue() || null',
    '[attr.aria-invalid]': '(!group && picker.showInvalid()) || null',
    '[disabled]': 'picker.disabled()',
    '[attr.data-size]': 'group ? null : size()',
    '[class]': 'class()',
    '(click)': 'popover.open.update((open) => !open)',
  },
})
export class ScDatePickerTrigger {
  private readonly buttonStyles = injectPreset().button;
  private readonly groupButtonStyles = injectPreset().inputGroupButton;

  protected readonly popover = inject(ScPopoverProvider);
  protected readonly picker = inject(ScDatePicker);
  protected readonly group = inject(ScInputGroup, { optional: true });
  readonly overlayOrigin = inject(CdkOverlayOrigin);

  readonly classInput = input<string>('', { alias: 'class' });
  /** Alone: the trigger's height. */
  readonly size = input<'default' | 'sm'>('default');
  /** In an input group: the icon button's look. */
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly buttonSize = input<ScInputGroupButtonSize>('icon-xs');

  protected readonly class = computed(() =>
    this.group
      ? cn(
          this.buttonStyles({ variant: this.variant() }),
          this.groupButtonStyles({ size: this.buttonSize() }),
          this.classInput(),
        )
      : cn(
          selectTriggerStyles,
          'justify-start disabled:cursor-not-allowed disabled:opacity-50 [&>span]:truncate',
          this.classInput(),
        ),
  );
}
