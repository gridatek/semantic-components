import { Injectable, computed, inject, signal } from '@angular/core';
import type { TargetRect } from './tour-guide-types';
import { TourService } from './tour-service';

@Injectable()
export class ScTourGuideState {
  private readonly tourService = inject(TourService);

  onStepChange: ((step: number) => void) | undefined;
  onTourComplete: (() => void) | undefined;
  onTourClosed: (() => void) | undefined;

  readonly targetRect = signal<TargetRect | null>(null);

  readonly isActive = this.tourService.isActive;
  readonly currentStep = computed(() => this.tourService.currentStepData());
  readonly currentStepIndex = this.tourService.currentStep;
  readonly totalSteps = computed(() => this.tourService.steps().length);
  readonly progress = this.tourService.progress;
  readonly isFirstStep = this.tourService.isFirstStep;
  readonly isLastStep = this.tourService.isLastStep;

  readonly overlayOpacity = computed(
    () => this.tourService.options().overlayOpacity ?? 0.5,
  );

  readonly highlightPadding = computed(
    () => this.currentStep()?.highlightPadding ?? 8,
  );

  readonly showProgress = computed(
    () => this.tourService.options().showProgress ?? true,
  );

  readonly showStepNumbers = computed(
    () => this.tourService.options().showStepNumbers ?? true,
  );

  readonly allowClose = computed(
    () => this.tourService.options().allowClose ?? true,
  );

  readonly allowKeyboard = computed(
    () => this.tourService.options().allowKeyboardNavigation ?? true,
  );

  readonly tooltipStyle = computed(() => {
    const rect = this.targetRect();
    const step = this.currentStep();
    if (!rect) return {};

    const padding = this.highlightPadding();
    const tooltipWidth = 320;
    const tooltipHeight = 200;
    const margin = 12;

    let placement = step?.placement ?? 'auto';

    if (placement === 'auto') {
      const spaceBelow =
        window.innerHeight - (rect.top + rect.height + padding);
      const spaceAbove = rect.top - padding;
      const spaceRight = window.innerWidth - (rect.left + rect.width + padding);
      const spaceLeft = rect.left - padding;

      if (spaceBelow >= tooltipHeight + margin) {
        placement = 'bottom';
      } else if (spaceAbove >= tooltipHeight + margin) {
        placement = 'top';
      } else if (spaceRight >= tooltipWidth + margin) {
        placement = 'right';
      } else if (spaceLeft >= tooltipWidth + margin) {
        placement = 'left';
      } else {
        placement = 'bottom';
      }
    }

    let top: number;
    let left: number;

    switch (placement) {
      case 'top':
        top = rect.top - padding - tooltipHeight - margin;
        left = rect.left + rect.width / 2 - tooltipWidth / 2;
        break;
      case 'bottom':
        top = rect.top + rect.height + padding + margin;
        left = rect.left + rect.width / 2 - tooltipWidth / 2;
        break;
      case 'left':
        top = rect.top + rect.height / 2 - tooltipHeight / 2;
        left = rect.left - padding - tooltipWidth - margin;
        break;
      case 'right':
        top = rect.top + rect.height / 2 - tooltipHeight / 2;
        left = rect.left + rect.width + padding + margin;
        break;
      default:
        top = rect.top + rect.height + padding + margin;
        left = rect.left + rect.width / 2 - tooltipWidth / 2;
    }

    left = Math.max(
      margin,
      Math.min(left, window.innerWidth - tooltipWidth - margin),
    );
    top = Math.max(margin, top);

    return { top: `${top}px`, left: `${left}px` };
  });

  updateTargetRect(): void {
    const step = this.currentStep();
    if (!step) {
      this.targetRect.set(null);
      return;
    }

    const element = document.querySelector(step.target);
    if (!element) {
      this.targetRect.set(null);
      return;
    }

    const rect = element.getBoundingClientRect();
    this.targetRect.set({
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
      width: rect.width,
      height: rect.height,
    });

    const scrollPadding = this.tourService.options().scrollPadding ?? 100;
    const scrollBehavior =
      this.tourService.options().scrollBehavior ?? 'smooth';

    const elementTop = rect.top;
    const elementBottom = rect.bottom;
    const viewportHeight = window.innerHeight;

    if (
      elementTop < scrollPadding ||
      elementBottom > viewportHeight - scrollPadding
    ) {
      element.scrollIntoView({
        behavior: scrollBehavior,
        block: 'center',
      });
    }
  }

  next(): void {
    this.tourService.next();
    this.onStepChange?.(this.tourService.currentStep());
  }

  previous(): void {
    this.tourService.previous();
    this.onStepChange?.(this.tourService.currentStep());
  }

  finish(): void {
    this.tourService.stop();
    this.onTourComplete?.();
  }

  close(): void {
    this.tourService.stop();
    this.onTourClosed?.();
  }
}
