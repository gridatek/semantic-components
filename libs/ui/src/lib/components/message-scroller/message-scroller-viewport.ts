import {
  DestroyRef,
  Directive,
  ElementRef,
  afterNextRender,
  booleanAttribute,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils';
import { ScMessageScrollerState } from './message-scroller-state';

/**
 * What scrolls: a region the keyboard can reach and scroll — name it
 * (`aria-label`). Hidden until its opening position is applied.
 */
@Directive({
  selector: 'div[scMessageScrollerViewport]',
  host: {
    'data-slot': 'message-scroller-viewport',
    role: 'region',
    tabindex: '0',
    '[attr.data-autoscrolling]': 'state.autoscrolling() ? "" : null',
    '[attr.data-pending-scroll]': 'state.pendingDefaultScroll() ? "" : null',
    '[class]': 'class()',
    '(scroll)': 'state.onScroll()',
    '(wheel)': 'state.readerTookOver()',
    '(touchmove)': 'state.readerTookOver()',
    '(keydown)': 'state.onKeydown($event)',
  },
})
export class ScMessageScrollerViewport {
  protected readonly state = inject(ScMessageScrollerState);
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly classInput = input<string>('', { alias: 'class' });
  /** Keep the message being read in place when older ones load above. */
  readonly preserveScrollOnPrepend = input(true, {
    transform: booleanAttribute,
  });

  protected readonly class = computed(() =>
    cn(
      'scroll-fade-b scrollbar-thin scrollbar-gutter-stable data-autoscrolling:scrollbar-thumb-transparent data-autoscrolling:scrollbar-track-transparent data-pending-scroll:invisible size-full min-h-0 min-w-0 overflow-y-auto overscroll-contain contain-content',
      this.classInput(),
    ),
  );

  constructor() {
    effect(() => {
      this.state.preserveScrollOnPrepend = this.preserveScrollOnPrepend();
    });
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const viewport = this.element.nativeElement;
      this.state.setViewport(viewport);
      if (typeof ResizeObserver === 'undefined') return;
      let frame = 0;
      const observer = new ResizeObserver(() => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => this.state.handleResize());
      });
      observer.observe(viewport);
      destroyRef.onDestroy(() => {
        cancelAnimationFrame(frame);
        observer.disconnect();
        this.state.setViewport(null);
      });
    });
  }
}
