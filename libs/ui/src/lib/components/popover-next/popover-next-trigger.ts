import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import {
  Directive,
  booleanAttribute,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils';
import { ScPopoverNextProvider } from './popover-next-provider';

/**
 * Your button that opens and closes the popover. `openOnHover`: the pointer's
 * hover opens it too, after `delay` (Base UI's infotip) — a click still
 * toggles it, for touch and the keyboard.
 */
@Directive({
  selector: 'button[scPopoverNextTrigger]',
  hostDirectives: [CdkOverlayOrigin],
  host: {
    '[attr.aria-haspopup]': '"dialog"',
    '[attr.aria-expanded]': 'popover.open()',
    '[attr.aria-controls]': 'popover.open() ? popover.id : null',
    '[class]': 'class()',
    '(click)': 'toggle()',
    '(pointerenter)': 'onPointerEnter($event)',
    '(pointerleave)': 'onPointerLeave($event)',
  },
})
export class ScPopoverNextTrigger {
  protected readonly popover = inject(ScPopoverNextProvider);
  readonly overlayOrigin = inject(CdkOverlayOrigin);
  readonly classInput = input<string>('', { alias: 'class' });

  /** The pointer's hover opens it too. */
  readonly openOnHover = input(false, { transform: booleanAttribute });
  /** How long the pointer rests before it opens on hover (ms). */
  readonly delay = input(300);
  /** How long it stays once the pointer has left, opened on hover (ms). */
  readonly closeDelay = input(0);

  protected readonly class = computed(() => cn(this.classInput()));

  protected toggle(): void {
    this.popover.timing.cancel();
    // Opened by hover, a click keeps it open (it isn't the pointer's any more).
    if (this.popover.openedByHover && this.popover.open()) {
      this.popover.openedByHover = false;
      return;
    }
    this.popover.openedByHover = false;
    this.popover.open.update((open) => !open);
  }

  protected onPointerEnter(event: PointerEvent): void {
    if (!this.openOnHover() || event.pointerType === 'touch') return;
    if (this.popover.open()) {
      this.popover.timing.cancel();
      return;
    }
    this.popover.openedByHover = true;
    this.popover.timing.openSoon(this.delay());
  }

  protected onPointerLeave(event: PointerEvent): void {
    if (!this.openOnHover() || event.pointerType === 'touch') return;
    if (this.popover.openedByHover)
      this.popover.timing.closeSoon(this.closeDelay());
    else this.popover.timing.cancel();
  }
}
