import {
  DestroyRef,
  Directive,
  ElementRef,
  afterNextRender,
  afterRenderEffect,
  computed,
  inject,
  input,
  signal,
  untracked,
} from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ScSegmentedControl } from './segmented-control';

interface ScIndicatorBox {
  readonly left: number;
  readonly top: number;
  readonly width: number;
  readonly height: number;
}

/**
 * The checked item's background, sliding to it: measured from the item —
 * `--sc-segmented-control-indicator-left`, `-top`, `-width`, `-height` (and
 * `-right`, `-bottom`). `data-activation-direction`: `none` at first (it
 * doesn't slide into place), then `left`, `right`, `up` or `down`. Hidden
 * from screen readers; no box while nothing is checked.
 */
@Directive({
  selector: '[scSegmentedControlIndicator]',
  host: {
    'data-slot': 'segmented-control-indicator',
    'aria-hidden': 'true',
    '[attr.data-orientation]': 'control.orientation()',
    '[attr.data-activation-direction]': 'direction()',
    '[style.--sc-segmented-control-indicator-left.px]': 'box()?.left',
    '[style.--sc-segmented-control-indicator-top.px]': 'box()?.top',
    '[style.--sc-segmented-control-indicator-width.px]': 'box()?.width',
    '[style.--sc-segmented-control-indicator-height.px]': 'box()?.height',
    '[style.--sc-segmented-control-indicator-right.px]': 'right()',
    '[style.--sc-segmented-control-indicator-bottom.px]': 'bottom()',
    '[class]': 'class()',
  },
})
export class ScSegmentedControlIndicator {
  private readonly styles = injectStyle().segmentedControl;
  private readonly control = inject(ScSegmentedControl);
  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });

  /** The checked item's box, in the control. */
  private readonly box = signal<ScIndicatorBox | null>(null);
  /** The control's size: for right and bottom. */
  private readonly size = signal({ width: 0, height: 0 });
  /** Which way it last moved. */
  private readonly direction = signal<
    'none' | 'left' | 'right' | 'up' | 'down'
  >('none');
  /** Measures again (a resize). */
  private readonly resized = signal(0);

  private readonly right = computed(() => {
    const box = this.box();
    return box ? this.size().width - box.left - box.width : null;
  });
  private readonly bottom = computed(() => {
    const box = this.box();
    return box ? this.size().height - box.top - box.height : null;
  });

  private readonly class = computed(() =>
    cn(
      'pointer-events-none absolute',
      'left-(--sc-segmented-control-indicator-left) top-(--sc-segmented-control-indicator-top) h-(--sc-segmented-control-indicator-height) w-(--sc-segmented-control-indicator-width)',
      // Into place at first; then it slides.
      this.direction() === 'none'
        ? 'transition-none'
        : 'transition-[left,top,width,height] duration-200 ease-out motion-reduce:transition-none',
      !this.box() && 'invisible',
      this.styles.indicator,
      this.classInput(),
    ),
  );

  constructor() {
    afterRenderEffect(() => {
      this.resized();
      const item = this.control.checkedItem();
      const element = item?.element;
      const host = element?.offsetParent as HTMLElement | null;
      if (!element || !host) {
        if (untracked(() => this.box())) this.box.set(null);
        return;
      }
      const next = {
        left: element.offsetLeft,
        top: element.offsetTop,
        width: element.offsetWidth,
        height: element.offsetHeight,
      };
      // Its own last box, read untracked: written below, it mustn't run it again.
      const previous = untracked(() => this.box());
      const size = untracked(() => this.size());
      if (size.width !== host.clientWidth || size.height !== host.clientHeight)
        this.size.set({ width: host.clientWidth, height: host.clientHeight });
      if (
        previous &&
        (previous.left !== next.left || previous.top !== next.top)
      ) {
        this.direction.set(
          next.left !== previous.left
            ? next.left > previous.left
              ? 'right'
              : 'left'
            : next.top > previous.top
              ? 'down'
              : 'up',
        );
      }
      if (
        !previous ||
        previous.left !== next.left ||
        previous.top !== next.top ||
        previous.width !== next.width ||
        previous.height !== next.height
      )
        this.box.set(next);
    });

    // The items or the control resized (a font loaded, a window): again.
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const observer = new ResizeObserver(() =>
        this.resized.update((n) => n + 1),
      );
      const control = this.element.parentElement;
      if (control) {
        observer.observe(control);
        for (const child of Array.from(control.children))
          observer.observe(child);
      }
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
