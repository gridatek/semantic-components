import {
  type AnimationCallbackEvent,
  Directive,
  ElementRef,
  afterNextRender,
  booleanAttribute,
  computed,
  effect,
  inject,
  input,
  signal,
  untracked,
} from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import { SC_SELECT } from './select-tokens';

/** Room kept between the popup and the viewport's edge. */
const MARGIN = 8;

/**
 * The popup round the list: it scrolls, between its scroll buttons. It opens
 * below the trigger (above without room); with `alignItemWithTrigger`, over
 * it, the selected item where the value is — below when opened by touch or
 * without room.
 */
@Directive({
  selector: 'div[scSelectPopup]',
  exportAs: 'scSelectPopup',
  host: {
    'data-open': '',
    '[attr.data-side]': 'select.side()',
    '[attr.data-align-trigger]': 'select.aligned()',
    // At least as wide as the trigger, as Radix sets it.
    '[style.min-width.px]': 'trigger?.offsetWidth',
    // The variables Radix's Select sets, which the preset's classes read —
    // not the trigger's height: Radix's Viewport grows from it in a flex
    // box; ours is a plain block, which the popup scrolls.
    '[style.--radix-select-trigger-width.px]': 'trigger?.offsetWidth',
    '[style.--radix-select-content-available-height.px]': 'availableHeight',
    '[style.--radix-select-content-transform-origin]': 'transformOrigin()',
    '[class]': 'class()',
    '(scroll)': 'measureScroll()',
    '(animate.leave)': 'leave($event)',
  },
})
export class ScSelectPopup {
  protected readonly select = inject(SC_SELECT);
  private readonly styles = injectPreset().select;
  readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });
  /**
   * Opens over the trigger, the selected item where the value is (Radix's
   * `item-aligned`). Off by default: the list opens below the trigger, which
   * stays in sight (Radix's `popper`).
   */
  readonly alignItemWithTrigger = input(false, {
    transform: booleanAttribute,
  });

  /** Whether there is more to scroll to, above or below. */
  readonly canScrollUp = signal(false);
  readonly canScrollDown = signal(false);

  protected readonly trigger = this.select.trigger()?.elementRef.nativeElement;
  /** As tall as the viewport allows, beside or over the trigger. */
  protected readonly availableHeight = this.roomFor(this.trigger);

  protected readonly transformOrigin = computed(() => {
    const side = this.select.side();
    return side === 'none' ? 'center' : side === 'bottom' ? 'top' : 'bottom';
  });

  protected readonly class = computed(() =>
    cn(
      this.styles.popup,
      // No scrollbar, as Radix's Viewport: the scroll buttons stand in.
      '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
      // Below or above the trigger: Radix's popper position.
      this.select.side() !== 'none' && this.styles.popupPopper,
      this.classInput(),
    ),
  );

  constructor() {
    effect(() => {
      const align = this.alignItemWithTrigger();
      untracked(() => this.select.alignItemWithTrigger.set(align));
    });
    afterNextRender(() => {
      this.align();
      this.measureScroll();
    });
  }

  measureScroll(): void {
    const { scrollTop, scrollHeight, clientHeight } = this.element;
    this.canScrollUp.set(scrollTop > 1);
    this.canScrollDown.set(scrollTop + clientHeight < scrollHeight - 1);
  }

  /**
   * Over the trigger: scrolls the selected item (or the first) into view,
   * then offsets the popup so that item sits where the trigger's value is.
   */
  private align(): void {
    if (!this.select.aligned() || !this.trigger) return;
    const item =
      this.element.querySelector<HTMLElement>(
        '[role=option][aria-selected=true]',
      ) ?? this.element.querySelector<HTMLElement>('[role=option]');
    if (!item) return;
    const popup = this.element;
    const below = item.offsetTop + item.offsetHeight - popup.clientHeight;
    if (item.offsetTop < popup.scrollTop) popup.scrollTop = item.offsetTop;
    else if (below > popup.scrollTop) popup.scrollTop = below;
    const offset =
      item.getBoundingClientRect().top - popup.getBoundingClientRect().top;
    const trigger = this.trigger.getBoundingClientRect();
    this.select.alignOffset.set(
      Math.round((trigger.height - item.offsetHeight) / 2 - offset),
    );
  }

  /** The most room above or below the trigger; the viewport's, over it. */
  private roomFor(trigger: HTMLElement | undefined): number | null {
    if (!trigger || typeof window === 'undefined') return null;
    if (this.select.aligned()) return window.innerHeight - 2 * MARGIN;
    const { top, bottom } = trigger.getBoundingClientRect();
    return Math.max(window.innerHeight - bottom, top) - 2 * MARGIN;
  }

  /** Closing: `data-closed` plays the preset's exit, then the popup goes. */
  protected leave(event: AnimationCallbackEvent): void {
    const element = event.target as HTMLElement;
    element.removeAttribute('data-open');
    element.setAttribute('data-closed', '');
    const done = () => event.animationComplete();
    const animations = element.getAnimations();
    if (!animations.length) return done();
    Promise.all(animations.map((animation) => animation.finished)).then(
      done,
      done,
    );
  }
}
