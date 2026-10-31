import {
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
    '[attr.data-side]': 'select.side()',
    '[attr.data-align-trigger]': 'select.aligned()',
    // Opening and closing, the preset's classes, played by Angular.
    '[animate.enter]': 'styles.popupEnter',
    '[animate.leave]': 'styles.popupLeave',
    '[class]': 'class()',
    '(scroll)': 'measureScroll()',
  },
})
export class ScSelectPopup {
  protected readonly select = inject(SC_SELECT);
  protected readonly styles = injectPreset().select;
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

  private readonly trigger = this.select.trigger()?.elementRef.nativeElement;

  protected readonly class = computed(() =>
    cn(
      this.styles.popup,
      // As wide as the trigger and as tall as the room in the viewport: the
      // CDK overlay's size.
      'w-full max-h-[inherit]',
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
}
