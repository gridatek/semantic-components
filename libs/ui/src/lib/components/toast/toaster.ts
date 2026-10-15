import { _IdGenerator } from '@angular/cdk/a11y';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Service, type TemplateRef, inject, signal } from '@angular/core';
import { ScToastStack } from './toast-stack';
import { ScToastConfig, ScToastData, ScToastPosition } from './toast.types';

@Service()
export class ScToaster {
  private readonly toastsSignal = signal<ScToastData[]>([]);
  readonly toasts = this.toastsSignal.asReadonly();

  private readonly positionSignal = signal<ScToastPosition>('bottom-end');
  readonly position = this.positionSignal.asReadonly();

  /** How a toast looks: set by your `scToastTemplate`. */
  readonly ɵtemplate = signal<TemplateRef<{ $implicit: ScToastData }> | null>(
    null,
  );

  private readonly defaultDuration = 5000;
  private readonly maxToasts = 5;
  private readonly timeouts = new Map<string, ReturnType<typeof setTimeout>>();
  private readonly timerStartTimes = new Map<string, number>();
  private readonly timerRemaining = new Map<string, number>();

  private readonly idGenerator = inject(_IdGenerator);
  private readonly overlay = inject(Overlay);

  private overlayRef: OverlayRef | null = null;

  /** Where toasts show when `show` gives no `position`. */
  setPosition(position: ScToastPosition): void {
    this.positionSignal.set(position);
  }

  /** Shows a toast — as your `scToastTemplate` writes it. */
  show(config: ScToastConfig): string {
    if (typeof ngDevMode !== 'undefined' && ngDevMode && !this.ɵtemplate()) {
      console.warn(
        'ScToaster: write how a toast looks once, in your app: <ng-template scToastTemplate let-toast>.',
      );
    }
    this.ensureOverlay();

    const id = this.idGenerator.getId('sc-toast-');

    const toast: ScToastData = {
      id,
      position: config.position ?? this.position(),
      title: config.title,
      description: config.description,
      variant: config.variant ?? 'default',
      action: config.action,
      duration: config.duration ?? this.defaultDuration,
    };

    // Dismiss the oldest toast if the limit is exceeded
    const current = this.toastsSignal();
    if (current.length >= this.maxToasts) {
      this.dismiss(current[0].id);
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

    // Out of the list: Angular plays its exit animation, then removes it.
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
    this.toastsSignal.set([]);
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
