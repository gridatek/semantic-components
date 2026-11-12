import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';
import { ScPopoverProvider } from './popover-provider';

/**
 * The popover, in the preset's look: a dialog (`role="dialog"`) named by its
 * title and described by its description. Focus moves into it as it opens
 * and back to the trigger as it closes; it animates in and out.
 */
@Directive({
  selector: 'div[scPopover]',
  host: {
    // Read by the parts inside that blend in (a calendar: no background).
    'data-slot': 'popover',
    role: 'dialog',
    '[id]': 'popover.id',
    '[attr.aria-labelledby]': 'popover.titleId()',
    '[attr.aria-describedby]': 'popover.descriptionId()',
    '[attr.data-side]': 'popover.placedSide()',
    '[class]': 'class()',
    '(pointerenter)': 'popover.timing.cancel()',
    '(pointerleave)': 'onPointerLeave()',
    'animate.enter': 'animate-in fade-in-0 zoom-in-95',
    'animate.leave': 'animate-out fade-out-0 zoom-out-95',
  },
})
export class ScPopover {
  private readonly styles = injectPreset().popover;
  protected readonly popover = inject(ScPopoverProvider);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.popup, this.classInput()),
  );

  /** Opened by the pointer's hover: leaving it closes it. */
  protected onPointerLeave(): void {
    if (this.popover.openedByHover)
      this.popover.timing.closeSoon(this.popover.trigger()?.closeDelay() ?? 0);
  }
}
