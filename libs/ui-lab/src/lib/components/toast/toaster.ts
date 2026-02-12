import { inject, Injectable, signal } from '@angular/core';
import { ScToastConfig, ScToastData } from './toast.types';
import { _IdGenerator } from '@angular/cdk/a11y';

@Injectable({
  providedIn: 'root',
})
export class ScToaster {
  private readonly toastsSignal = signal<ScToastData[]>([]);
  readonly toasts = this.toastsSignal.asReadonly();

  private readonly defaultDuration = 5000;
  private timeouts = new Map<string, ReturnType<typeof setTimeout>>();

  private readonly idGenerator = inject(_IdGenerator);

  /**
   * Show a new toast notification
   */
  show(config: ScToastConfig): string {
    const id = this.idGenerator.getId('sc-toast-');

    const toast: ScToastData = {
      id,
      title: config.title,
      description: config.description,
      variant: config.variant ?? 'default',
      action: config.action,
      duration: config.duration ?? this.defaultDuration,
    };

    this.toastsSignal.update((toasts) => [...toasts, toast]);

    // Auto-dismiss after duration (if duration > 0)
    if (toast.duration && toast.duration > 0) {
      const timeout = setTimeout(() => {
        this.dismiss(id);
      }, toast.duration);
      this.timeouts.set(id, timeout);
    }

    return id;
  }

  /**
   * Dismiss a specific toast by ID
   */
  dismiss(id: string): void {
    // Clear timeout if exists
    const timeout = this.timeouts.get(id);
    if (timeout) {
      clearTimeout(timeout);
      this.timeouts.delete(id);
    }

    this.toastsSignal.update((toasts) => toasts.filter((t) => t.id !== id));
  }

  /**
   * Dismiss all toasts
   */
  dismissAll(): void {
    this.timeouts.forEach((timeout) => clearTimeout(timeout));
    this.timeouts.clear();
    this.toastsSignal.set([]);
  }
}
