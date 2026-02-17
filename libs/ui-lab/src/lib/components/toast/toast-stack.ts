import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { ScToast } from './toast';
import { ScToastAction } from './toast-action';
import { ScToastClose } from './toast-close';
import { ScToastDescription } from './toast-description';
import { ScToastTitle } from './toast-title';
import { ScToaster } from './toaster';

@Component({
  selector: 'sc-toast-stack',
  imports: [
    ScToast,
    ScToastTitle,
    ScToastDescription,
    ScToastClose,
    ScToastAction,
  ],
  template: `
    @for (toast of toastService.toasts(); track toast.id) {
      <div
        scToast
        [variant]="toast.variant ?? 'default'"
        [attr.data-state]="toast.state ?? 'open'"
        (animationend)="onAnimationEnd($event, toast.id)"
        (pointerEnter)="toastService.pause(toast.id)"
        (pointerLeave)="toastService.resume(toast.id)"
      >
        <div class="grid gap-1">
          @if (toast.title) {
            <div scToastTitle>{{ toast.title }}</div>
          }
          @if (toast.description) {
            <div scToastDescription>{{ toast.description }}</div>
          }
        </div>
        @if (toast.action) {
          <button
            scToastAction
            (click)="onAction(toast.id, toast.action.onClick)"
          >
            {{ toast.action.label }}
          </button>
        }
        <button scToastClose (close)="dismiss(toast.id)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>
    }
  `,
  host: {
    'data-slot': 'toast-stack',
    class:
      'fixed top-0 z-100 flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScToastStack {
  protected readonly toastService = inject(ScToaster);

  protected dismiss(id: string): void {
    this.toastService.dismiss(id);
  }

  protected onAction(id: string, onClick: () => void): void {
    onClick();
    this.toastService.dismiss(id);
  }

  protected onAnimationEnd(event: AnimationEvent, id: string): void {
    // Ignore events bubbling up from child elements
    if (event.target !== event.currentTarget) return;

    const toast = this.toastService.toasts().find((t) => t.id === id);
    if (toast?.state === 'closed') {
      this.toastService.remove(id);
    }
  }
}
