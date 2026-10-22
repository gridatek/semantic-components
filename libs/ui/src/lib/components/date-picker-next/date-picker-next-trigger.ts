import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { ScPopoverProvider } from '../popover';
import { selectTriggerStyles } from '../select/select-trigger';
import { ScDatePickerNext } from './date-picker-next';

/**
 * Opens the calendar: the picker's value, as written — in the input look
 * (the select trigger's). Write its icon and text
 * (`{{ dp.text() || 'Pick a date' }}`); `data-placeholder` while empty.
 * Beside a typed input, an icon button: name it.
 */
@Directive({
  selector: 'button[scDatePickerNextTrigger]',
  exportAs: 'scDatePickerNextTrigger',
  hostDirectives: [CdkOverlayOrigin],
  host: {
    'data-slot': 'date-picker-trigger',
    type: 'button',
    'aria-haspopup': 'dialog',
    '[attr.aria-expanded]': 'popover.open()',
    '[attr.data-placeholder]': '!picker.hasValue() || null',
    '[attr.aria-invalid]': 'picker.showInvalid() || null',
    '[disabled]': 'picker.disabled()',
    '[attr.data-size]': 'size()',
    '[class]': 'class()',
    '(click)': 'popover.open.update((open) => !open)',
  },
})
export class ScDatePickerNextTrigger {
  protected readonly popover = inject(ScPopoverProvider);
  protected readonly picker = inject(ScDatePickerNext);
  readonly overlayOrigin = inject(CdkOverlayOrigin);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly size = input<'default' | 'sm'>('default');

  protected readonly class = computed(() =>
    cn(
      selectTriggerStyles,
      'justify-start disabled:cursor-not-allowed disabled:opacity-50 [&>span]:truncate',
      this.classInput(),
    ),
  );
}
