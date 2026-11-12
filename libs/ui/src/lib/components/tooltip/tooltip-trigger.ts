import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { ScTooltipProvider } from './tooltip-provider';

/**
 * What the tooltip is about — your button, link… (name it: the tooltip is
 * not its label). The pointer's hover opens it after the delay, keyboard
 * focus at once; leaving, blur, a click and Escape close it. Not on touch.
 * Disabled but still to be explained: `scButton` with `disabled` and
 * `softDisabled` — a natively disabled button takes no focus and no hover.
 */
@Directive({
  selector: '[scTooltipTrigger]',
  hostDirectives: [CdkOverlayOrigin],
  host: {
    'data-slot': 'tooltip-trigger',
    '[attr.aria-describedby]': 'tooltip.open() ? tooltip.id : null',
    '[class]': 'class()',
    '(pointerenter)': 'onPointerEnter($event)',
    '(pointerleave)': 'onPointerLeave($event)',
    '(focus)': 'onFocus($event)',
    '(blur)': 'tooltip.hide()',
    '(click)': 'onClick()',
    '(keydown.escape)': 'tooltip.hide()',
  },
})
export class ScTooltipTrigger {
  protected readonly tooltip = inject(ScTooltipProvider);
  readonly overlayOrigin = inject(CdkOverlayOrigin);
  readonly classInput = input<string>('', { alias: 'class' });

  /** After a click, not again until the pointer leaves. */
  private clicked = false;

  protected readonly class = computed(() => cn(this.classInput()));

  protected onPointerEnter(event: PointerEvent): void {
    if (event.pointerType === 'touch' || this.clicked) return;
    this.tooltip.showSoon();
  }

  protected onPointerLeave(event: PointerEvent): void {
    if (event.pointerType === 'touch') return;
    this.clicked = false;
    this.tooltip.hideSoon();
  }

  protected onFocus(event: FocusEvent): void {
    // Keyboard focus only: a click's focus is the pointer's, already handled.
    const target = event.target as HTMLElement;
    if (target.matches(':focus-visible')) this.tooltip.show();
  }

  protected onClick(): void {
    this.clicked = true;
    this.tooltip.hide();
  }
}
