import { CdkScrollable } from '@angular/cdk/scrolling';
import {
  DestroyRef,
  Directive,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';
import { ScScrollArea } from './scroll-area';

/**
 * The element that scrolls: its own scrollbar hidden (the scroll area draws
 * them), in the tab order while it overflows, ringed when focused. Sets
 * `--sc-scroll-area-overflow-x-start` / `-end` and `-y-start` / `-end` — how far
 * from each edge it is scrolled, for a fade. A `CdkScrollable`: overlays
 * opened from inside it follow its scroll. As Base UI's ScrollArea.Viewport.
 */
@Directive({
  selector: 'div[scScrollAreaViewport]',
  hostDirectives: [CdkScrollable],
  host: {
    '[attr.tabindex]': 'overflows() ? 0 : null',
    '[style.--sc-scroll-area-overflow-x-start.px]': 'area.overflowXStart()',
    '[style.--sc-scroll-area-overflow-x-end.px]': 'area.overflowXEnd()',
    '[style.--sc-scroll-area-overflow-y-start.px]': 'area.overflowYStart()',
    '[style.--sc-scroll-area-overflow-y-end.px]': 'area.overflowYEnd()',
    '[class]': 'class()',
    '(scroll)': 'area.scrolled()',
  },
})
export class ScScrollAreaViewport {
  private readonly area = inject(ScScrollArea);
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly overflows = computed(
    () => this.area.hasOverflowX() || this.area.hasOverflowY(),
  );

  private readonly class = computed(() =>
    cn(
      'size-full overflow-auto rounded-[inherit] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
      'transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1',
      this.classInput(),
    ),
  );

  constructor() {
    const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    this.area.viewport.set(element);
    let resize: ResizeObserver | undefined;
    let mutation: MutationObserver | undefined;
    afterNextRender(() => {
      // Its size, and its content's: either changes what overflows.
      resize = new ResizeObserver(() => this.area.measure());
      const watch = () => {
        resize?.disconnect();
        resize?.observe(element);
        for (const child of Array.from(element.children))
          resize?.observe(child);
      };
      watch();
      // Content put in later (an @if, a lazy block) is watched too.
      mutation = new MutationObserver(() => {
        watch();
        this.area.measure();
      });
      mutation.observe(element, { childList: true });
      this.area.measure();
    });
    inject(DestroyRef).onDestroy(() => {
      resize?.disconnect();
      mutation?.disconnect();
      this.area.viewport.set(null);
    });
  }
}
