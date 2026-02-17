import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { inject, Injectable, signal } from '@angular/core';
import { _IdGenerator } from '@angular/cdk/a11y';
import { ScToastConfig, ScToastData } from './toast.types';
import { ScToastStack } from './toast-stack';

@Injectable({
  providedIn: 'root',
})
export class ScToaster {
  private readonly toastsSignal = signal<ScToastData[]>([]);
  readonly toasts = this.toastsSignal.asReadonly();

  private readonly defaultDuration = 5000;
  private timeouts = new Map<string, ReturnType<typeof setTimeout>>();

  private readonly idGenerator = inject(_IdGenerator);
  private readonly overlay = inject(Overlay);

  private overlayRef: OverlayRef | null = null;

  /**
   * Show a new toast notification
   */
  show(config: ScToastConfig): string {
    this.ensureOverlay();

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
    // Clear auto-dismiss timeout if exists
    const timeout = this.timeouts.get(id);
    if (timeout) {
      clearTimeout(timeout);
      this.timeouts.delete(id);
    }

    // Set state to 'closed' to trigger exit animation.
    // Actual removal happens in toast-stack via (animationend).
    this.toastsSignal.update((toasts) =>
      toasts.map((t) => (t.id === id ? { ...t, state: 'closed' as const } : t)),
    );
  }

  /**
   * Called by toast-stack after the exit animation completes.
   */
  remove(id: string): void {
    this.toastsSignal.update((toasts) => toasts.filter((t) => t.id !== id));
  }

  /**
   * Dismiss all toasts
   */
  dismissAll(): void {
    this.timeouts.forEach((timeout) => clearTimeout(timeout));
    this.timeouts.clear();
    this.toastsSignal.update((toasts) =>
      toasts.map((t) => ({ ...t, state: 'closed' as const })),
    );
  }

  private ensureOverlay(): void {
    if (this.overlayRef) {
      return;
    }

    this.overlayRef = this.overlay.create({
      positionStrategy: this.overlay.position().global(),
      hasBackdrop: false,
      panelClass: 'sc-toast-overlay',
    });

    const portal = new ComponentPortal(ScToastStack);
    this.overlayRef.attach(portal);
  }
}
