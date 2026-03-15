import {
  Directive,
  DoCheck,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScTourGuideState } from './tour-guide-state';
import { TourService } from './tour-service';

@Directive({
  selector: 'div[scTourGuide]',
  exportAs: 'scTourGuide',
  providers: [ScTourGuideState],
  host: {
    'data-slot': 'tour-guide',
    '[class]': 'class()',
    tabindex: '-1',
    '(click)': 'onOverlayClick($event)',
    '(keydown)': 'onKeydown($event)',
    '(window:resize)': 'state.updateTargetRect()',
    '(window:scroll)': 'state.updateTargetRect()',
  },
})
export class ScTourGuide implements DoCheck {
  readonly classInput = input<string>('', { alias: 'class' });

  readonly state = inject(ScTourGuideState);
  private readonly tourService = inject(TourService);

  readonly stepChange = output<number>();
  readonly tourComplete = output<void>();
  readonly tourClosed = output<void>();

  readonly targetRect = this.state.targetRect;
  readonly currentStep = this.state.currentStep;
  readonly allowClose = this.state.allowClose;
  readonly showStepNumbers = this.state.showStepNumbers;
  readonly showProgress = this.state.showProgress;
  readonly isFirstStep = this.state.isFirstStep;
  readonly isLastStep = this.state.isLastStep;

  protected readonly class = computed(() =>
    cn('fixed inset-0 z-9999', this.classInput()),
  );

  constructor() {
    this.state.onStepChange = (step) => this.stepChange.emit(step);
    this.state.onTourComplete = () => this.tourComplete.emit();
    this.state.onTourClosed = () => this.tourClosed.emit();
  }

  ngDoCheck(): void {
    if (this.tourService.isActive()) {
      this.state.updateTargetRect();
    }
  }

  protected onOverlayClick(event: MouseEvent): void {
    if (event.target === event.currentTarget && this.allowClose()) {
      this.state.close();
    }
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.allowClose()) {
      this.state.close();
      event.preventDefault();
    } else if (this.state.allowKeyboard()) {
      if (event.key === 'ArrowRight' || event.key === 'Enter') {
        if (this.state.isLastStep()) {
          this.state.finish();
        } else {
          this.state.next();
        }
        event.preventDefault();
      } else if (event.key === 'ArrowLeft') {
        this.state.previous();
        event.preventDefault();
      }
    }
  }
}
