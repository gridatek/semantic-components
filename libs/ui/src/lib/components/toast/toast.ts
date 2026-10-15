import {
  Component,
  DestroyRef,
  ElementRef,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_TOAST_CONTEXT } from './toast-context';
import { SC_TOAST_LAYOUT, SC_TOAST_PEEK } from './toast-layout';
import type { ScToastVariant } from './toast.types';

/**
 * A toast, the root of your `scToastTemplate`: its variant's styles and its
 * place in the stack. It slides in when shown and out when dismissed, and
 * goes when swiped sideways.
 */
@Component({
  selector: 'div[scToast]',
  template: ` <ng-content /> `,
  host: {
    'data-slot': 'toast',
    '[attr.data-variant]': 'variant()',
    '[attr.data-front]': 'layout.index() === 0',
    '[attr.data-expanded]': 'layout.expanded()',
    '[attr.data-hidden]': 'hidden() || null',
    '[style.transform]': 'transform()',
    '[style.height.px]': 'stackedHeight()',
    '[class]': 'class()',
    'animate.enter': 'animate-in',
    'animate.leave': 'animate-out',
    '(touchstart)': 'onTouchStart($event)',
    '(touchmove)': 'onTouchMove($event)',
    '(touchend)': 'onTouchEnd($event)',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScToast {
  protected readonly context = inject(SC_TOAST_CONTEXT);
  protected readonly layout = inject(SC_TOAST_LAYOUT);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly variant = computed<ScToastVariant>(
    () => this.context.toast().variant ?? 'default',
  );

  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly swipeThreshold = 100;
  private swipeStartX = 0;

  /** Behind the front one, stacked: its height is the front one's. */
  private readonly behind = computed(
    () => !this.layout.expanded() && this.layout.index() > 0,
  );

  /** Too far back to show, stacked. */
  protected readonly hidden = computed(
    () => !this.layout.expanded() && this.layout.index() >= this.layout.visible,
  );

  protected readonly stackedHeight = computed(() =>
    this.behind() ? this.layout.frontHeight() : null,
  );

  protected readonly transform = computed(() => {
    const direction = this.layout.fromBottom ? -1 : 1;
    const index = this.layout.index();
    if (this.layout.expanded()) {
      return `translateY(${direction * this.layout.offset()}px)`;
    }
    if (!index) return null;
    const visible = Math.min(index, this.layout.visible - 1);
    return `translateY(${direction * visible * SC_TOAST_PEEK}px) scale(${1 - visible * 0.05})`;
  });

  protected readonly class = computed(() =>
    cn(
      'group pointer-events-auto absolute inset-x-0 flex items-center justify-between gap-4 overflow-hidden rounded-2xl border p-4 pe-6 shadow-lg',
      'bg-popover text-popover-foreground',
      'transition-[transform,height,opacity,translate] duration-300 ease-out',
      this.layout.fromBottom ? 'bottom-0 origin-top' : 'top-0 origin-bottom',
      // Behind the front one, stacked: only its edge shows.
      '*:transition-opacity data-[front=false]:data-[expanded=false]:*:opacity-0',
      'data-hidden:pointer-events-none data-hidden:opacity-0',
      // Where it slides from and to (read by the enter / leave animations)
      'fade-out-80 slide-out-to-right-full',
      this.layout.fromBottom
        ? 'slide-in-from-bottom-full'
        : 'slide-in-from-top-full',
      (this.variant() === 'destructive' || this.variant() === 'error') &&
        'text-destructive',
      this.classInput(),
    ),
  );

  constructor() {
    if (typeof ResizeObserver === 'undefined') return;
    // Its height, as it is spread out, places the toasts behind it.
    const observer = new ResizeObserver(() => {
      if (!this.behind()) this.layout.measure(this.element.offsetHeight);
    });
    observer.observe(this.element);
    inject(DestroyRef).onDestroy(() => observer.disconnect());
  }

  protected onTouchStart(event: TouchEvent): void {
    this.swipeStartX = event.touches[0].clientX;
    this.element.style.transition = 'none';
  }

  protected onTouchMove(event: TouchEvent): void {
    const deltaX = event.touches[0].clientX - this.swipeStartX;
    this.element.style.translate = `${deltaX}px 0`;
    this.element.style.opacity = String(
      Math.max(0, 1 - Math.abs(deltaX) / this.swipeThreshold),
    );
  }

  protected onTouchEnd(event: TouchEvent): void {
    const deltaX = event.changedTouches[0].clientX - this.swipeStartX;
    if (Math.abs(deltaX) >= this.swipeThreshold) {
      this.context.dismiss();
      return;
    }
    // Not far enough: back in place.
    this.element.style.transition = '';
    this.element.style.translate = '';
    this.element.style.opacity = '';
  }
}
