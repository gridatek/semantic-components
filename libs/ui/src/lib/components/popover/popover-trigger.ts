import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import {
  Directive,
  ElementRef,
  booleanAttribute,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';
import { ɵfocusOnPress } from '../../utils';
import { ScPopoverProvider } from './popover-provider';

/**
 * Your button that opens and closes the popover. `openOnHover`: the pointer's
 * hover opens it too, after `delay` (Base UI's infotip) — a click still
 * toggles it, for touch and the keyboard.
 */
@Directive({
  selector: 'button[scPopoverTrigger]',
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
export class ScPopoverTrigger {
  private readonly popover = inject(ScPopoverProvider);
  readonly overlayOrigin = inject(CdkOverlayOrigin);
  private readonly element =
    inject<ElementRef<HTMLButtonElement>>(ElementRef).nativeElement;
  readonly classInput = input<string>('', { alias: 'class' });

  /** The pointer's hover opens it too. */
  readonly openOnHover = input(false, { transform: booleanAttribute });
  /** How long the pointer rests before it opens on hover (ms). */
  readonly delay = input(300);
  /** How long it stays once the pointer has left, opened on hover (ms). */
  readonly closeDelay = input(0);

  private readonly class = computed(() => cn(this.classInput()));

  private toggle(): void {
    ɵfocusOnPress(this.element);
    this.popover.timing.cancel();
    // Opened by hover, a click keeps it open (it isn't the pointer's any more).
    if (this.popover.openedByHover && this.popover.open()) {
      this.popover.openedByHover = false;
      return;
    }
    this.popover.openedByHover = false;
    this.popover.open.update((open) => !open);
  }

  private onPointerEnter(event: PointerEvent): void {
    if (!this.openOnHover() || event.pointerType === 'touch') return;
    if (this.popover.open()) {
      this.popover.timing.cancel();
      return;
    }
    this.popover.openedByHover = true;
    this.popover.timing.openSoon(this.delay());
  }

  private onPointerLeave(event: PointerEvent): void {
    if (!this.openOnHover() || event.pointerType === 'touch') return;
    if (this.popover.openedByHover)
      this.popover.timing.closeSoon(this.closeDelay());
    else this.popover.timing.cancel();
  }
}
