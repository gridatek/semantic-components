import {
  Component,
  ElementRef,
  ViewEncapsulation,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import { cn } from '../../utils';
import { ScToastPosition, ScToastVariant } from './toast.types';

/**
 * A toast's frame: slides in when shown and out when dismissed
 * (`animate.enter` / `animate.leave`); swiped sideways, it asks to go
 * (`swiped`).
 */
@Component({
  selector: 'div[scToast]',
  template: ` <ng-content /> `,
  host: {
    'data-slot': 'toast',
    '[attr.data-variant]': 'variant()',
    '[class]': 'class()',
    'animate.enter': 'animate-in',
    'animate.leave': 'animate-out',
    '(pointerenter)': 'onPointerEnter()',
    '(pointerleave)': 'onPointerLeave()',
    '(touchstart)': 'onTouchStart($event)',
    '(touchmove)': 'onTouchMove($event)',
    '(touchend)': 'onTouchEnd($event)',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScToast {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScToastVariant>('default');
  readonly position = input<ScToastPosition>('bottom-right');

  /** Emitted when pointer enters the toast (pause auto-dismiss) */
  readonly pointerEnter = output<void>();

  /** Emitted when pointer leaves the toast (resume auto-dismiss) */
  readonly pointerLeave = output<void>();
  /** Emitted when the toast is swiped far enough away (dismiss it). */
  readonly swiped = output<void>();

  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly swipeThreshold = 100;
  private swipeStartX = 0;

  protected readonly class = computed(() =>
    cn(
      'group pointer-events-auto relative flex w-full items-center justify-between gap-4 overflow-hidden rounded-2xl border p-4 pe-6 shadow-lg transition-all',
      // Where it slides from and to (read by the enter / leave animations)
      'fade-out-80 slide-out-to-right-full',
      this.position().startsWith('bottom')
        ? 'slide-in-from-bottom-full'
        : 'slide-in-from-top-full',
      this.variantClass(),
      this.classInput(),
    ),
  );

  private readonly variantClass = computed(() => {
    const variantClasses: Record<ScToastVariant, string> = {
      default: 'border-border bg-card text-card-foreground shadow-lg',
      destructive:
        'destructive border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200',
      success:
        'border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200',
      info: 'border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200',
      warning:
        'border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-200',
      error:
        'destructive border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200',
      loading: 'border-border bg-card text-card-foreground shadow-lg',
    };
    return variantClasses[this.variant()];
  });

  protected onPointerEnter(): void {
    this.pointerEnter.emit();
  }

  protected onPointerLeave(): void {
    this.pointerLeave.emit();
  }

  protected onTouchStart(event: TouchEvent): void {
    this.swipeStartX = event.touches[0].clientX;
    this.element.style.transition = 'none';
  }

  protected onTouchMove(event: TouchEvent): void {
    const deltaX = event.touches[0].clientX - this.swipeStartX;
    this.element.style.transform = `translateX(${deltaX}px)`;
    this.element.style.opacity = String(
      Math.max(0, 1 - Math.abs(deltaX) / this.swipeThreshold),
    );
  }

  protected onTouchEnd(event: TouchEvent): void {
    const deltaX = event.changedTouches[0].clientX - this.swipeStartX;
    if (Math.abs(deltaX) >= this.swipeThreshold) {
      this.swiped.emit();
      return;
    }
    // Not far enough: back in place.
    this.element.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
    this.element.style.transform = '';
    this.element.style.opacity = '';
  }
}
