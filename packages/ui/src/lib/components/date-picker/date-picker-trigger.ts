import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { ScInputGroup } from '../input-group';
import { ScPopoverProvider } from '../popover';
import { ScDatePicker } from './date-picker';

/**
 * Opens the calendar. Behaviour only: put it on your button, which brings
 * the look — `scInputButton` (a field's look; muted while
 * `data-placeholder`, set here while nothing is picked), or
 * `scInputGroupButton` beside a typed input. Write its icon and text:
 * `{{ formatDate(date()) || 'Pick a date' }}` (`injectFormatDate()`, or
 * your own format); icon only, name it.
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
    '[class]': 'class()',
    '(click)': 'popover.open.update((open) => !open)',
  },
})
export class ScDatePickerTrigger {
  private readonly popover = inject(ScPopoverProvider);
  private readonly picker = inject(ScDatePicker);
  private readonly group = inject(ScInputGroup, { optional: true });
  readonly overlayOrigin = inject(CdkOverlayOrigin);

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() => cn(this.classInput()));
}
