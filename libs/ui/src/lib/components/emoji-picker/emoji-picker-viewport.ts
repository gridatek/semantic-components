import {
  DestroyRef,
  Directive,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils/cn/cn';
import { ScEmojiPickerState } from './emoji-picker-state';

/**
 * The scrolling list's frame: holds `scEmojiPickerList`, and
 * `scEmojiPickerLoading` / `scEmojiPickerEmpty` over it. Focusable: the
 * arrow keys move through the emojis from it too.
 */
@Directive({
  selector: 'div[scEmojiPickerViewport]',
  host: {
    'data-slot': 'emoji-picker-viewport',
    tabindex: '0',
    '[class]': 'class()',
    '(scroll)': 'onScroll()',
  },
})
export class ScEmojiPickerViewport {
  protected readonly state = inject(ScEmojiPickerState);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'relative flex-1 overflow-y-auto overscroll-contain outline-hidden [contain:layout_paint] [scrollbar-gutter:stable]',
      this.classInput(),
    ),
  );

  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  protected onScroll(): void {
    this.state.scrollTop.set(this.element.scrollTop);
  }

  constructor() {
    const element = this.element;
    this.state.viewportElement = element;
    const destroyRef = inject(DestroyRef);
    destroyRef.onDestroy(() => {
      if (this.state.viewportElement === element) {
        this.state.viewportElement = null;
      }
    });

    // Its size: how many rows show, and the width a footer can take.
    afterNextRender(() => {
      const measure = () => {
        this.state.viewportHeight.set(element.clientHeight);
        this.state.viewportWidth.set(element.offsetWidth);
      };
      measure();
      const observer = new ResizeObserver(measure);
      observer.observe(element);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
