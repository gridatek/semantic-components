import {
  DestroyRef,
  Directive,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils';
import { ScScrollAreaNext } from './scroll-area-next';

/**
 * The element that scrolls: its own scrollbar hidden (the scroll area draws
 * them), in the tab order while it overflows, ringed when focused. Sets
 * `--scroll-area-overflow-x-start` / `-end` and `-y-start` / `-end` — how far
 * from each edge it is scrolled, for a fade. As Base UI's ScrollArea.Viewport.
 */
@Directive({
  selector: 'div[scScrollAreaNextViewport]',
  host: {
    '[attr.tabindex]': 'overflows() ? 0 : null',
    '[style.--scroll-area-overflow-x-start.px]': 'area.overflowXStart()',
    '[style.--scroll-area-overflow-x-end.px]': 'area.overflowXEnd()',
    '[style.--scroll-area-overflow-y-start.px]': 'area.overflowYStart()',
    '[style.--scroll-area-overflow-y-end.px]': 'area.overflowYEnd()',
    '[class]': 'class()',
    '(scroll)': 'area.scrolled()',
  },
})
export class ScScrollAreaNextViewport {
  protected readonly area = inject(ScScrollAreaNext);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly overflows = computed(
    () => this.area.hasOverflowX() || this.area.hasOverflowY(),
  );

  protected readonly class = computed(() =>
    cn(
      'size-full overflow-auto rounded-[inherit] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
      'transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1',
      this.classInput(),
    ),
  );

  constructor() {
    const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    this.area.viewport.set(element);
    let observer: ResizeObserver | undefined;
    afterNextRender(() => {
      this.area.measure();
      // Its size, and its content's: either changes what overflows.
      observer = new ResizeObserver(() => this.area.measure());
      observer.observe(element);
      for (const child of Array.from(element.children)) observer.observe(child);
    });
    inject(DestroyRef).onDestroy(() => {
      observer?.disconnect();
      this.area.viewport.set(null);
    });
  }
}
