import {
  Directive,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import { SC_SELECT } from './select-tokens';

/**
 * The popup round the list: it scrolls, between its scroll buttons. It opens
 * below the trigger, above it without room.
 */
@Directive({
  selector: 'div[scSelectPopup]',
  exportAs: 'scSelectPopup',
  host: {
    '[attr.data-side]': 'select.side()',
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

  /** Whether there is more to scroll to, above or below. */
  readonly canScrollUp = signal(false);
  readonly canScrollDown = signal(false);

  protected readonly class = computed(() =>
    cn(
      this.styles.popup,
      // As wide as the trigger and as tall as the room in the viewport: the
      // CDK overlay's size.
      'w-full max-h-[inherit]',
      // No scrollbar, as Radix's Viewport: the scroll buttons stand in.
      '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
      // Below or above the trigger: Radix's popper position.
      this.styles.popupPopper,
      this.classInput(),
    ),
  );

  constructor() {
    afterNextRender(() => this.measureScroll());
  }

  measureScroll(): void {
    const { scrollTop, scrollHeight, clientHeight } = this.element;
    this.canScrollUp.set(scrollTop > 1);
    this.canScrollDown.set(scrollTop + clientHeight < scrollHeight - 1);
  }
}
