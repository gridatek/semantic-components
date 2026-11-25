import {
  DOCUMENT,
  DestroyRef,
  Directive,
  ElementRef,
  afterNextRender,
  afterRenderEffect,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';

/**
 * Keeps its content to a ratio of width to height. The ratio goes through a
 * CSS variable (`--ratio`, read by `aspect-(--ratio)`), not an inline
 * `aspect-ratio`: a class can still change it (`max-sm:aspect-square`). Its
 * width is yours. It clips what overflows its box (a framed photo is cut to the
 * frame's corners).
 */
@Directive({
  selector: '[scAspectRatio]',
  host: {
    '[class]': 'class()',
    '[style.--ratio]': 'ratio()',
  },
})
export class ScAspectRatio {
  readonly classInput = input<string>('', { alias: 'class' });
  /** Width over height: `16 / 9`, `1`, `9 / 16`. */
  readonly ratio = input<number>(1);

  private readonly class = computed(() =>
    cn('relative aspect-(--ratio) overflow-hidden', this.classInput()),
  );

  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  constructor() {
    const view = inject(DOCUMENT).defaultView;
    const destroyRef = inject(DestroyRef);
    // Checked once drawn, when the ratio changes, when its size changes (a
    // breakpoint), and once the page's stylesheets have loaded.
    afterRenderEffect(() => {
      this.ratio();
      this.fixWebKitLayout();
    });
    afterNextRender(() => {
      const observer = new ResizeObserver(() => this.fixWebKitLayout());
      observer.observe(this.element);
      const loaded = () => this.fixWebKitLayout();
      view?.addEventListener('load', loaded, { once: true });
      destroyRef.onDestroy(() => {
        observer.disconnect();
        view?.removeEventListener('load', loaded);
      });
    });
  }

  /**
   * Lays it out again when its height isn't its ratio's.
   *
   * FIXME(webkit): a workaround. WebKit ignores an `aspect-ratio` that comes
   * after a flex item stretched in a row (`align-items: stretch`) was first
   * laid out — a stylesheet that loads late, a breakpoint, a new ratio: its
   * style has the ratio, its box hasn't. Chrome and Firefox apply it. Only a
   * new box fixes it (`display: none`, then back). Check again with each
   * WebKit release; drop it once WebKit applies it (specs: the aspect ratio
   * and frame demos). See docs/testing/webkit-workarounds.md.
   */
  private fixWebKitLayout(): void {
    const element = this.element;
    const ratio = /([\d.]+)\s*\/\s*([\d.]+)/.exec(
      getComputedStyle(element).aspectRatio,
    );
    const { offsetWidth: width, offsetHeight: height } = element;
    if (!ratio || !width) return;
    const expected = width / (Number(ratio[1]) / Number(ratio[2]));
    if (Math.abs(expected - height) <= 1.5) return;
    const display = element.style.display;
    element.style.display = 'none';
    void element.offsetHeight;
    element.style.display = display;
  }
}
