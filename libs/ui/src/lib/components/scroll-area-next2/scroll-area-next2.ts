import {
  DestroyRef,
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

interface ScScrollAreaNext2Metrics {
  /** Scrolled from the start (px; positive in either direction). */
  x: number;
  y: number;
  maxX: number;
  maxY: number;
}

/** How long `data-scrolling` stays after the last scroll (ms). */
const SCROLLING = 500;

/**
 * A box that scrolls, with the browser's own scrollbar in the preset's look
 * (`::-webkit-scrollbar`: Chromium, Safari; Firefox's thin bar, themed).
 * A tab stop while it overflows, ringed when focused: the arrow keys, Page
 * Up / Down, Home and End scroll it. It tells what overflows and where —
 * `data-has-overflow-x` / `-y`, `data-overflow-{x,y}-{start,end}`,
 * `data-scrolling`, and `--scroll-area-overflow-{x,y}-{start,end}` (how far
 * from each edge, for a fade).
 */
@Directive({
  selector: 'div[scScrollAreaNext2]',
  host: {
    '[attr.tabindex]': 'overflows() ? 0 : null',
    '[attr.data-has-overflow-x]': 'metrics().maxX > 0 ? "" : null',
    '[attr.data-has-overflow-y]': 'metrics().maxY > 0 ? "" : null',
    '[attr.data-overflow-x-start]': 'metrics().x > 0 ? "" : null',
    '[attr.data-overflow-x-end]': 'xEnd() > 0 ? "" : null',
    '[attr.data-overflow-y-start]': 'metrics().y > 0 ? "" : null',
    '[attr.data-overflow-y-end]': 'yEnd() > 0 ? "" : null',
    '[attr.data-scrolling]': 'scrolling() ? "" : null',
    '[style.--scroll-area-overflow-x-start.px]': 'metrics().x',
    '[style.--scroll-area-overflow-x-end.px]': 'xEnd()',
    '[style.--scroll-area-overflow-y-start.px]': 'metrics().y',
    '[style.--scroll-area-overflow-y-end.px]': 'yEnd()',
    '[class]': 'class()',
    '(scroll)': 'scrolled()',
  },
})
export class ScScrollAreaNext2 {
  private readonly styles = injectPreset().scrollArea;
  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly metrics = signal<ScScrollAreaNext2Metrics>({
    x: 0,
    y: 0,
    maxX: 0,
    maxY: 0,
  });
  protected readonly scrolling = signal(false);

  protected readonly overflows = computed(
    () => this.metrics().maxX > 0 || this.metrics().maxY > 0,
  );
  protected readonly xEnd = computed(() =>
    Math.max(0, this.metrics().maxX - this.metrics().x),
  );
  protected readonly yEnd = computed(() =>
    Math.max(0, this.metrics().maxY - this.metrics().y),
  );

  protected readonly class = computed(() =>
    cn(
      'overflow-auto',
      // The browser's scrollbar in the preset's look (Chromium, Safari): 10px,
      // no track, the thumb inset by 1px. Setting scrollbar-width or -color
      // would make Chromium ignore these.
      '[&::-webkit-scrollbar]:size-2.5 [&::-webkit-scrollbar-corner]:bg-transparent [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:border [&::-webkit-scrollbar-thumb]:border-transparent [&::-webkit-scrollbar-thumb]:bg-clip-padding',
      this.styles.nativeThumb,
      // Firefox has no ::-webkit-scrollbar: its thin bar, themed.
      '[@supports_not_selector(::-webkit-scrollbar)]:scrollbar-thin [@supports_not_selector(::-webkit-scrollbar)]:scrollbar-thumb-border [@supports_not_selector(::-webkit-scrollbar)]:scrollbar-track-transparent',
      'transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1',
      this.classInput(),
    ),
  );

  private timer: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    let resize: ResizeObserver | undefined;
    let mutation: MutationObserver | undefined;
    afterNextRender(() => {
      // Its size and its content's: either changes what overflows.
      resize = new ResizeObserver(() => this.measure());
      const watch = () => {
        resize?.disconnect();
        resize?.observe(this.element);
        for (const child of Array.from(this.element.children))
          resize?.observe(child);
      };
      watch();
      mutation = new MutationObserver(() => {
        watch();
        this.measure();
      });
      mutation.observe(this.element, { childList: true });
      this.measure();
    });
    inject(DestroyRef).onDestroy(() => {
      resize?.disconnect();
      mutation?.disconnect();
      clearTimeout(this.timer);
    });
  }

  protected scrolled(): void {
    this.measure();
    this.scrolling.set(true);
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.scrolling.set(false), SCROLLING);
  }

  private measure(): void {
    const e = this.element;
    // Whole pixels: a fractional remainder isn't overflow.
    this.metrics.set({
      // A right-to-left box scrolls from 0 down to negative values.
      x: Math.round(Math.abs(e.scrollLeft)),
      y: Math.round(e.scrollTop),
      maxX: Math.max(0, Math.round(e.scrollWidth - e.clientWidth)),
      maxY: Math.max(0, Math.round(e.scrollHeight - e.clientHeight)),
    });
  }
}
