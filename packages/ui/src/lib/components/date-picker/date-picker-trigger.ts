import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { Directive, computed, inject, input } from '@angular/core';
import type { ScInputGroupButtonSize } from '@semantic-components/styles';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { type ScButtonVariants } from '../button';
import { ScInputGroup } from '../input-group';
import { ScPopoverProvider } from '../popover';
import { ScDatePicker } from './date-picker';

/**
 * Opens the calendar: the picker's value, as written — in the input look
 * (the select trigger's). Write its icon and text
 * (`{{ formatDate(date()) || 'Pick a date' }}`, `injectFormatDate()` or your
 * own); `data-placeholder` while empty.
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
  private readonly buttonStyles = injectStyle().button;
  private readonly groupButtonStyles = injectStyle().inputGroupButton;
  private readonly triggerStyles = injectStyle().select.trigger;

  private readonly popover = inject(ScPopoverProvider);
  private readonly picker = inject(ScDatePicker);
  private readonly group = inject(ScInputGroup, { optional: true });
  readonly overlayOrigin = inject(CdkOverlayOrigin);

  readonly classInput = input<string>('', { alias: 'class' });
  /** Alone: the trigger's height. */
  readonly size = input<'default' | 'sm'>('default');
  /** In an input group: the icon button's look. */
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly buttonSize = input<ScInputGroupButtonSize>('icon-xs');

  private readonly class = computed(() =>
    this.group
      ? cn(
          this.buttonStyles({ variant: this.variant() }),
          this.groupButtonStyles({ size: this.buttonSize() }),
          this.classInput(),
        )
      : cn(
          this.triggerStyles,
          'w-full',
          'justify-start disabled:cursor-not-allowed disabled:opacity-50 [&>span]:truncate',
          this.classInput(),
        ),
  );
}
