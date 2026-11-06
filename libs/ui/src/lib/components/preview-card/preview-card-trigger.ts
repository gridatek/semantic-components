import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { ScPreviewCardProvider } from './preview-card-provider';

/**
 * Your link (or button) whose destination the card previews. The pointer's
 * hover opens it after `delay`, keyboard focus at once; leaving (after
 * `closeDelay`), blur, Escape and a press outside close it. A touch only
 * follows the link. As Base UI's PreviewCard.Trigger.
 */
@Directive({
  selector: 'a[scPreviewCardTrigger], button[scPreviewCardTrigger]',
  hostDirectives: [CdkOverlayOrigin],
  host: {
    '[attr.data-popup-open]': 'card.open() ? "" : null',
    '[class]': 'class()',
    '(pointerenter)': 'onPointerEnter($event)',
    '(pointerleave)': 'onPointerLeave($event)',
    '(focus)': 'onFocus($event)',
    '(blur)': 'card.hide()',
    '(keydown.escape)': 'card.hide()',
  },
})
export class ScPreviewCardTrigger {
  protected readonly card = inject(ScPreviewCardProvider);
  readonly overlayOrigin = inject(CdkOverlayOrigin);
  readonly classInput = input<string>('', { alias: 'class' });

  /** How long the pointer rests on it before the card opens (ms). */
  readonly delay = input(600);
  /** How long the card stays once the pointer has left (ms). */
  readonly closeDelay = input(300);

  protected readonly class = computed(() => cn(this.classInput()));

  protected onPointerEnter(event: Event): void {
    if ((event as PointerEvent).pointerType === 'touch') return;
    this.card.timing.openSoon(this.delay());
  }

  protected onPointerLeave(event: Event): void {
    if ((event as PointerEvent).pointerType === 'touch') return;
    this.card.hideSoon();
  }

  protected onFocus(event: Event): void {
    // Keyboard focus only: a click's focus is the pointer's.
    const target = event.target as HTMLElement;
    if (!target.matches(':focus-visible')) return;
    this.card.timing.cancel();
    this.card.open.set(true);
  }
}
