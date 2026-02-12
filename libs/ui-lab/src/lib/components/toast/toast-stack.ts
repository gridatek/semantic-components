import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
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
        sc-toast
        [variant]="toast.variant ?? 'default'"
        [attr.data-state]="'open'"
      >
        <div class="grid gap-1">
          @if (toast.title) {
            <div sc-toast-title>{{ toast.title }}</div>
          }
          @if (toast.description) {
            <div sc-toast-description>{{ toast.description }}</div>
          }
        </div>
        @if (toast.action) {
          <button
            sc-toast-action
            (click)="onAction(toast.id, toast.action.onClick)"
          >
            {{ toast.action.label }}
          </button>
        }
        <button sc-toast-close (close)="dismiss(toast.id)">
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
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScToastStack {
  readonly toastService = inject(ScToaster);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'fixed top-0 z-100 flex max-h-screen w-full flex-col-reverse gap-2 p-4',
      'sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]',
      this.classInput(),
    ),
  );

  protected dismiss(id: string): void {
    this.toastService.dismiss(id);
  }

  protected onAction(id: string, onClick: () => void): void {
    onClick();
    this.toastService.dismiss(id);
  }
}
