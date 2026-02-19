import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { inject, Injectable, signal } from '@angular/core';
import { _IdGenerator } from '@angular/cdk/a11y';
import { ScToastConfig, ScToastData, ScToastPosition } from './toast.types';
import { ScToastStack } from './toast-stack';

@Injectable({
  providedIn: 'root',
})
export class ScToaster {
  private readonly toastsSignal = signal<ScToastData[]>([]);
  readonly toasts = this.toastsSignal.asReadonly();

  private readonly positionSignal = signal<ScToastPosition>('bottom-right');
  readonly position = this.positionSignal.asReadonly();

  private readonly defaultDuration = 5000;
  private readonly maxToasts = 5;
  private readonly timeouts = new Map<string, ReturnType<typeof setTimeout>>();
  private readonly timerStartTimes = new Map<string, number>();
  private readonly timerRemaining = new Map<string, number>();

  private readonly idGenerator = inject(_IdGenerator);
  private readonly overlay = inject(Overlay);

  private overlayRef: OverlayRef | null = null;

  /**
   * Show a new toast notification
   */
  setPosition(position: ScToastPosition): void {
    this.positionSignal.set(position);
  }

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

    // Dismiss the oldest toast if the limit is exceeded
    const current = this.toastsSignal();
    if (current.length >= this.maxToasts) {
      const oldest = current.find((t) => t.state !== 'closed');
      if (oldest) this.dismiss(oldest.id);
    }

    this.toastsSignal.update((toasts) => [...toasts, toast]);

    // Auto-dismiss after duration (if duration > 0)
    if (toast.duration && toast.duration > 0) {
      this.startTimer(id, toast.duration);
    }

    return id;
  }

  /**
   * Pause the auto-dismiss timer for a toast (e.g. on pointer hover).
   */
  pause(id: string): void {
    const timeout = this.timeouts.get(id);
    if (!timeout) return;

    clearTimeout(timeout);
    this.timeouts.delete(id);

    const startTime = this.timerStartTimes.get(id);
    if (startTime !== undefined) {
      const elapsed = Date.now() - startTime;
      const remaining = (this.timerRemaining.get(id) ?? 0) - elapsed;
      this.timerRemaining.set(id, Math.max(0, remaining));
    }
  }

  /**
   * Resume the auto-dismiss timer for a toast (e.g. on pointer leave).
   */
  resume(id: string): void {
    const remaining = this.timerRemaining.get(id);
    if (remaining === undefined || remaining <= 0) return;

    this.startTimer(id, remaining);
  }

  private startTimer(id: string, duration: number): void {
    this.timerRemaining.set(id, duration);
    this.timerStartTimes.set(id, Date.now());
    const timeout = setTimeout(() => this.dismiss(id), duration);
    this.timeouts.set(id, timeout);
  }

  success(config: Omit<ScToastConfig, 'variant'>): string {
    return this.show({ ...config, variant: 'success' });
  }

  info(config: Omit<ScToastConfig, 'variant'>): string {
    return this.show({ ...config, variant: 'info' });
  }

  warning(config: Omit<ScToastConfig, 'variant'>): string {
    return this.show({ ...config, variant: 'warning' });
  }

  error(config: Omit<ScToastConfig, 'variant'>): string {
    return this.show({ ...config, variant: 'error' });
  }

  loading(config: Omit<ScToastConfig, 'variant'>): string {
    return this.show({ ...config, variant: 'loading' });
  }

  /**
   * Dismiss a specific toast by ID
   */
  dismiss(id: string): void {
    // Clear auto-dismiss timeout and timer tracking
    const timeout = this.timeouts.get(id);
    if (timeout) {
      clearTimeout(timeout);
      this.timeouts.delete(id);
    }
    this.timerStartTimes.delete(id);
    this.timerRemaining.delete(id);

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
    this.timerStartTimes.clear();
    this.timerRemaining.clear();
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
    });

    const portal = new ComponentPortal(ScToastStack);
    this.overlayRef.attach(portal);
  }
}
