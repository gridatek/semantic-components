import { Injectable, computed, signal } from '@angular/core';
import type { TourOptions, TourStep } from './tour-guide-types';

@Injectable({ providedIn: 'root' })
export class TourService {
  private readonly _isActive = signal(false);
  private readonly _currentStep = signal(0);
  private readonly _steps = signal<TourStep[]>([]);
  private readonly _options = signal<Partial<TourOptions>>({});

  readonly isActive = this._isActive.asReadonly();
  readonly currentStep = this._currentStep.asReadonly();
  readonly steps = this._steps.asReadonly();
  readonly options = this._options.asReadonly();

  readonly currentStepData = computed(() => {
    const steps = this._steps();
    const index = this._currentStep();
    return steps[index] ?? null;
  });

  readonly progress = computed(() => {
    const total = this._steps().length;
    if (total === 0) return 0;
    return ((this._currentStep() + 1) / total) * 100;
  });

  readonly isFirstStep = computed(() => this._currentStep() === 0);
  readonly isLastStep = computed(
    () => this._currentStep() === this._steps().length - 1,
  );

  start(options: TourOptions): void {
    this._steps.set(options.steps);
    this._options.set(options);
    this._currentStep.set(0);
    this._isActive.set(true);
  }

  stop(): void {
    this._isActive.set(false);
    this._currentStep.set(0);
  }

  next(): void {
    const current = this._currentStep();
    const total = this._steps().length;
    if (current < total - 1) {
      this._currentStep.set(current + 1);
    }
  }

  previous(): void {
    const current = this._currentStep();
    if (current > 0) {
      this._currentStep.set(current - 1);
    }
  }

  goTo(index: number): void {
    const total = this._steps().length;
    if (index >= 0 && index < total) {
      this._currentStep.set(index);
    }
  }
}
