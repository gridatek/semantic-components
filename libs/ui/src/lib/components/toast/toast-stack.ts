import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { ScToastPosition } from './toast.types';
import {
  SiCircleCheckIcon,
  SiInfoIcon,
  SiLoaderCircleIcon,
  SiOctagonXIcon,
  SiTriangleAlertIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';
import { ScToast } from './toast';
import { ScToastAction } from './toast-action';
import { ScToastClose } from './toast-close';
import { ScToastDescription } from './toast-description';
import { ScToastTitle } from './toast-title';
import { ScToaster } from './toaster';

@Component({
  selector: 'sc-toast-stack',
  imports: [
    SiXIcon,
    SiCircleCheckIcon,
    SiInfoIcon,
    SiLoaderCircleIcon,
    SiOctagonXIcon,
    SiTriangleAlertIcon,
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
        [position]="toastService.position()"
        [attr.data-state]="toast.state ?? 'open'"
        (animationend)="onAnimationEnd($event, toast.id)"
        (pointerEnter)="toastService.pause(toast.id)"
        (pointerLeave)="toastService.resume(toast.id)"
      >
        @switch (toast.variant) {
          @case ('success') {
            <svg
              siCircleCheckIcon
              class="size-4 shrink-0 text-green-600 dark:text-green-400"
            ></svg>
          }
          @case ('info') {
            <svg
              siInfoIcon
              class="size-4 shrink-0 text-blue-600 dark:text-blue-400"
            ></svg>
          }
          @case ('warning') {
            <svg
              siTriangleAlertIcon
              class="size-4 shrink-0 text-yellow-600 dark:text-yellow-400"
            ></svg>
          }
          @case ('error') {
            <svg siOctagonXIcon class="size-4 shrink-0"></svg>
          }
          @case ('loading') {
            <svg siLoaderCircleIcon class="size-4 shrink-0 animate-spin"></svg>
          }
        }
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
          <svg siXIcon class="size-4"></svg>
        </button>
      </div>
    }
  `,
  host: {
    'data-slot': 'toast-stack',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScToastStack {
  protected readonly toastService = inject(ScToaster);

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

  protected dismiss(id: string): void {
    this.toastService.dismiss(id);
  }

  protected onAction(id: string, onClick: () => void): void {
    onClick();
    this.toastService.dismiss(id);
  }

  protected onAnimationEnd(event: AnimationEvent, id: string): void {
    if (event.target !== event.currentTarget) return;

    const toast = this.toastService.toasts().find((t) => t.id === id);
    if (toast?.state === 'closed') {
      this.toastService.remove(id);
    }
  }
}
