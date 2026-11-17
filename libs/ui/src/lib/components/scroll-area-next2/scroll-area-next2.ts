import { CdkScrollable } from '@angular/cdk/scrolling';
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
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { cn } from 'cn';

/** How far it is scrolled from each edge (whole px). */
interface ScScrollAreaNext2Edges {
  top: number;
  bottom: number;
  start: number;
  end: number;
}

const sameEdges = (a: ScScrollAreaNext2Edges, b: ScScrollAreaNext2Edges) =>
  a.top === b.top &&
  a.bottom === b.bottom &&
  a.start === b.start &&
  a.end === b.end;

/**
 * A box that scrolls, with the browser's own scrollbar — in the preset's look
 * with ui's `scrollbars.css`, as every scrollbar of the page.
 * A tab stop while it overflows, ringed when focused: the arrow keys, Page
 * Up / Down, Home and End scroll it. It tells what overflows and where —
 * `data-has-overflow-x` / `-y`, `data-overflow-{x,y}-{start,end}` and
 * `--sc-scroll-area-overflow-{x,y}-{start,end}` (how far from each edge, for a
 * fade). A `CdkScrollable`: overlays opened from inside it follow its scroll.
 */
@Directive({
  selector: 'div[scScrollAreaNext2]',
  hostDirectives: [CdkScrollable],
  host: {
    '[attr.tabindex]': 'overflows() ? 0 : null',
    '[attr.data-has-overflow-x]': 'overflowsX() ? "" : null',
    '[attr.data-has-overflow-y]': 'overflowsY() ? "" : null',
    '[attr.data-overflow-x-start]': 'edges().start > 0 ? "" : null',
    '[attr.data-overflow-x-end]': 'edges().end > 0 ? "" : null',
    '[attr.data-overflow-y-start]': 'edges().top > 0 ? "" : null',
    '[attr.data-overflow-y-end]': 'edges().bottom > 0 ? "" : null',
    '[style.--sc-scroll-area-overflow-x-start.px]': 'edges().start',
    '[style.--sc-scroll-area-overflow-x-end.px]': 'edges().end',
    '[style.--sc-scroll-area-overflow-y-start.px]': 'edges().top',
    '[style.--sc-scroll-area-overflow-y-end.px]': 'edges().bottom',
    '[class]': 'class()',
  },
})
export class ScScrollAreaNext2 {
  private readonly scrollable = inject(CdkScrollable);
  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  readonly classInput = input<string>('', { alias: 'class' });

  /** Set only when an edge's distance changes: nothing to redraw otherwise. */
  private readonly edges = signal<ScScrollAreaNext2Edges>(
    { top: 0, bottom: 0, start: 0, end: 0 },
    { equal: sameEdges },
  );

  private readonly overflowsX = computed(
    () => this.edges().start + this.edges().end > 0,
  );
  private readonly overflowsY = computed(
    () => this.edges().top + this.edges().bottom > 0,
  );
  private readonly overflows = computed(
    () => this.overflowsX() || this.overflowsY(),
  );

  private readonly class = computed(() =>
    cn(
      'overflow-auto',
      'transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1',
      this.classInput(),
    ),
  );

  constructor() {
    this.scrollable
      .elementScrolled()
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.measure());
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
    });
  }

  private measure(): void {
    // The CDK's offsets: start and end follow the box's direction.
    const at = (from: 'top' | 'bottom' | 'start' | 'end') =>
      Math.max(0, Math.round(this.scrollable.measureScrollOffset(from)));
    this.edges.set({
      top: at('top'),
      bottom: at('bottom'),
      start: at('start'),
      end: at('end'),
    });
  }
}
