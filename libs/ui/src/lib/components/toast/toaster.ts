import { _IdGenerator } from '@angular/cdk/a11y';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Service, inject, signal } from '@angular/core';
import { SC_CONFIG } from '../../config/config';
import { ScToastStack } from './toast-stack';
import type { ScToastTemplate } from './toast-template';
import {
  ScToastConfig,
  ScToastData,
  ScToastPosition,
  ScToastPromiseConfig,
  ScToasterConfig,
} from './toast-types';

interface ScToastTimer {
  remaining: number;
  startedAt: number;
  timeout?: ReturnType<typeof setTimeout>;
}

@Service()
export class ScToaster {
  private readonly toastsSignal = signal<ScToastData[]>([]);
  readonly toasts = this.toastsSignal.asReadonly();

  /** Its settings: `provideScConfig({ toaster })`, then the defaults. */
  readonly ɵconfig: Required<ScToasterConfig> = {
    position: 'bottom-end',
    duration: 5000,
    visibleToasts: 3,
    maxToasts: 5,
    layout: 'stacked',
    hotkey: [],
    ...inject(SC_CONFIG).toaster,
  };

  /** How a toast looks: your `scToastTemplate`. */
  readonly ɵtemplate = signal<ScToastTemplate | null>(null);

  private readonly heldSignal = signal<ReadonlySet<ScToastPosition>>(new Set());
  /** The positions whose toasts are hovered or focused: expanded, their timers paused. */
  readonly ɵheld = this.heldSignal.asReadonly();

  private readonly timers = new Map<string, ScToastTimer>();

  private readonly idGenerator = inject(_IdGenerator);
  private readonly overlay = inject(Overlay);

  private overlayRef: OverlayRef | null = null;

  /** Shows a toast — as your `scToastTemplate` writes it. */
  show(config: ScToastConfig): string {
    if (typeof ngDevMode !== 'undefined' && ngDevMode && !this.ɵtemplate()) {
      console.warn(
        'ScToaster: write how a toast looks once, in your app: <ng-template scToastTemplate let-toast>.',
      );
    }
    this.ensureOverlay();

    const toast = this.toastFrom(this.idGenerator.getId('sc-toast-'), config);

    // Dismiss the oldest toast if the limit is exceeded
    const current = this.toastsSignal();
    if (current.length >= this.ɵconfig.maxToasts) {
      this.dismiss(current[0].id);
    }

    this.toastsSignal.update((toasts) => [...toasts, toast]);
    this.schedule(toast);
    return toast.id;
  }

  /**
   * Changes a toast in place: the fields `config` gives replace its own, and
   * its timer starts again, as if just shown. Nothing happens once it is gone.
   */
  update(id: string, config: ScToastConfig): void {
    const current = this.toastsSignal().find((toast) => toast.id === id);
    if (!current) return;

    const toast = this.toastFrom(id, {
      ...current,
      ...config,
      // A new variant without a duration takes that variant's own.
      duration:
        config.duration ??
        (config.variant === undefined ? current.duration : undefined),
    });
    this.toastsSignal.update((toasts) =>
      toasts.map((t) => (t.id === id ? toast : t)),
    );
    this.schedule(toast);
  }

  /**
   * A loading toast while `promise` runs, which becomes a success or an error
   * toast when it settles. Returns `promise`.
   */
  promise<T>(promise: Promise<T>, config: ScToastPromiseConfig<T>): Promise<T> {
    const id = this.show({ ...config.loading, variant: 'loading' });
    promise.then(
      (value) => {
        const success =
          typeof config.success === 'function'
            ? config.success(value)
            : config.success;
        this.update(id, { ...success, variant: 'success' });
      },
      (error: unknown) => {
        const failure =
          typeof config.error === 'function'
            ? config.error(error)
            : config.error;
        this.update(id, { ...failure, variant: 'error' });
      },
    );
    return promise;
  }

  /**
   * Holds a position's toasts while they are hovered or focused: their timers
   * pause, and new ones there wait too.
   */
  ɵhold(position: ScToastPosition): void {
    if (this.heldSignal().has(position)) return;
    this.heldSignal.update((held) => new Set([...held, position]));
    for (const toast of this.toastsAt(position)) {
      const timer = this.timers.get(toast.id);
      if (timer) this.stop(timer);
    }
  }

  /** Lets a position's toasts go again: their timers resume. */
  ɵrelease(position: ScToastPosition): void {
    if (!this.heldSignal().has(position)) return;
    this.heldSignal.update(
      (held) => new Set([...held].filter((p) => p !== position)),
    );
    for (const toast of this.toastsAt(position)) {
      const timer = this.timers.get(toast.id);
      if (timer) this.run(toast.id, timer);
    }
  }

  /**
   * Dismiss a specific toast by ID
   */
  dismiss(id: string): void {
    this.clearTimer(id);
    const toast = this.toastsSignal().find((t) => t.id === id);

    // Out of the list: Angular plays its exit animation, then removes it.
    this.toastsSignal.update((toasts) => toasts.filter((t) => t.id !== id));

    // Its position is empty: nothing is hovered or focused there any more.
    if (toast && !this.toastsAt(toast.position).length) {
      this.ɵrelease(toast.position);
    }
  }

  /**
   * Dismiss all toasts
   */
  dismissAll(): void {
    for (const id of [...this.timers.keys()]) this.clearTimer(id);
    this.toastsSignal.set([]);
    this.heldSignal.set(new Set());
  }

  private toastFrom(id: string, config: ScToastConfig): ScToastData {
    const variant = config.variant ?? 'default';
    return {
      id,
      position: config.position ?? this.ɵconfig.position,
      title: config.title,
      description: config.description,
      variant,
      action: config.action,
      duration:
        config.duration ?? (variant === 'loading' ? 0 : this.ɵconfig.duration),
    };
  }

  private toastsAt(position: ScToastPosition): ScToastData[] {
    return this.toastsSignal().filter((toast) => toast.position === position);
  }

  /** A new timer for the toast — waiting while its position is held. */
  private schedule(toast: ScToastData): void {
    this.clearTimer(toast.id);
    if (!toast.duration || toast.duration <= 0) return;

    const timer: ScToastTimer = { remaining: toast.duration, startedAt: 0 };
    this.timers.set(toast.id, timer);
    if (!this.heldSignal().has(toast.position)) this.run(toast.id, timer);
  }

  private run(id: string, timer: ScToastTimer): void {
    if (timer.timeout) return;
    timer.startedAt = performance.now();
    timer.timeout = setTimeout(() => this.dismiss(id), timer.remaining);
  }

  private stop(timer: ScToastTimer): void {
    if (!timer.timeout) return;
    clearTimeout(timer.timeout);
    timer.timeout = undefined;
    timer.remaining = Math.max(
      0,
      timer.remaining - (performance.now() - timer.startedAt),
    );
  }

  private clearTimer(id: string): void {
    const timer = this.timers.get(id);
    if (timer?.timeout) clearTimeout(timer.timeout);
    this.timers.delete(id);
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
