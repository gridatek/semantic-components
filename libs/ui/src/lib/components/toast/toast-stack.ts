import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  Injector,
  ViewEncapsulation,
  computed,
  inject,
} from '@angular/core';
import { cn } from '../../utils';
import { ScToast } from './toast';
import { SC_TOAST_CONTEXT } from './toast-context';
import type { ScToastData, ScToastPosition } from './toast.types';
import { ScToaster } from './toaster';

/**
 * The toasts, in an overlay the toaster creates: each in its frame
 * (`scToast`: swipe, pause on hover), written by your `scToastTemplate`. One
 * polite live region, so each new toast is announced.
 */
@Component({
  selector: 'sc-toast-stack',
  imports: [NgTemplateOutlet, ScToast],
  template: `
    @if (toastTemplate(); as template) {
      @for (toast of toastService.toasts(); track toast.id) {
        <div
          scToast
          [variant]="toast.variant ?? 'default'"
          [position]="toastService.position()"
          (pointerEnter)="toastService.pause(toast.id)"
          (pointerLeave)="toastService.resume(toast.id)"
          (touchstart)="onTouchStart($event)"
          (touchmove)="onTouchMove($event)"
          (touchend)="onTouchEnd($event, toast.id)"
        >
          <ng-container
            *ngTemplateOutlet="
              template;
              context: { $implicit: toast };
              injector: injectorFor(toast)
            "
          />
        </div>
      }
    }
  `,
  host: {
    'aria-live': 'polite',
    'aria-relevant': 'additions',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScToastStack {
  protected readonly toastService = inject(ScToaster);
  /** How a toast looks: your `scToastTemplate`. */
  protected readonly toastTemplate = computed(() =>
    this.toastService.ɵtemplate(),
  );
  private readonly injector = inject(Injector);
  private readonly injectors = new Map<string, Injector>();

  private readonly swipeThreshold = 100;

  private readonly positionClasses: Record<ScToastPosition, string> = {
    'top-left': 'fixed top-0 left-0 flex-col-reverse',
    'top-center': 'fixed top-0 left-1/2 -translate-x-1/2 flex-col-reverse',
    'top-right': 'fixed top-0 right-0 flex-col-reverse',
    'bottom-left': 'fixed bottom-0 left-0 flex-col',
    'bottom-center': 'fixed bottom-0 left-1/2 -translate-x-1/2 flex-col',
    'bottom-right': 'fixed bottom-0 right-0 flex-col',
  };

  protected readonly class = computed(() =>
    cn(
      'z-100 flex max-h-screen w-full gap-2 p-4 md:max-w-[420px]',
      this.positionClasses[this.toastService.position()],
    ),
  );

  /** The context of a toast's parts: the toast, and dismissing it. */
  protected injectorFor(toast: ScToastData): Injector {
    // Those of toasts gone (dismissed, timed out) are dropped.
    const shown = new Set(this.toastService.toasts().map((t) => t.id));
    for (const id of this.injectors.keys()) {
      if (!shown.has(id)) this.injectors.delete(id);
    }
    let injector = this.injectors.get(toast.id);
    if (!injector) {
      injector = Injector.create({
        parent: this.injector,
        providers: [
          {
            provide: SC_TOAST_CONTEXT,
            useValue: {
              toast,
              dismiss: () => {
                this.injectors.delete(toast.id);
                this.toastService.dismiss(toast.id);
              },
            },
          },
        ],
      });
      this.injectors.set(toast.id, injector);
    }
    return injector;
  }

  protected onTouchStart(event: TouchEvent): void {
    const el = event.currentTarget as HTMLElement;
    el.dataset['swipeStartX'] = String(event.touches[0].clientX);
    el.style.transition = 'none';
  }

  protected onTouchMove(event: TouchEvent): void {
    const el = event.currentTarget as HTMLElement;
    const startX = Number(el.dataset['swipeStartX'] ?? 0);
    const deltaX = event.touches[0].clientX - startX;

    el.style.transform = `translateX(${deltaX}px)`;
    el.style.opacity = String(
      Math.max(0, 1 - Math.abs(deltaX) / this.swipeThreshold),
    );
  }

  protected onTouchEnd(event: TouchEvent, id: string): void {
    const el = event.currentTarget as HTMLElement;
    const startX = Number(el.dataset['swipeStartX'] ?? 0);
    const deltaX = event.changedTouches[0].clientX - startX;

    if (Math.abs(deltaX) >= this.swipeThreshold) {
      this.injectors.delete(id);
      this.toastService.dismiss(id);
    } else {
      // Snap back
      el.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
      el.style.transform = '';
      el.style.opacity = '';
    }
  }
}
