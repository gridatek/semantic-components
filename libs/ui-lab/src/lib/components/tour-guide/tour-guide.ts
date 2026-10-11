import { FocusTrap, FocusTrapFactory } from '@angular/cdk/a11y';
import {
  DestroyRef,
  Directive,
  DoCheck,
  ElementRef,
  Injector,
  afterNextRender,
  computed,
  effect,
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
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly injector = inject(Injector);

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

    // Modal while it runs: trap Tab inside, move focus to each step's dialog
    // (so it is announced), and give focus back when the tour ends.
    const host = this.elementRef.nativeElement;
    const returnFocus = document.activeElement as HTMLElement | null;
    // The trap's anchors go next to the host, so create it once it is attached.
    const focusTrapFactory = inject(FocusTrapFactory);
    let focusTrap: FocusTrap | undefined;
    afterNextRender(() => (focusTrap = focusTrapFactory.create(host)));
    effect(() => {
      this.state.currentStep();
      afterNextRender(
        () =>
          (host.querySelector<HTMLElement>('[role=dialog]') ?? host).focus(),
        { injector: this.injector },
      );
    });
    inject(DestroyRef).onDestroy(() => {
      focusTrap?.destroy();
      const active = document.activeElement;
      if (
        !active ||
        active === document.body ||
        !active.isConnected ||
        host.contains(active)
      ) {
        returnFocus?.focus();
      }
    });
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
      // Enter is the step's own when focus is on one of its buttons.
      const onControl = (event.target as HTMLElement).closest(
        'button, a, input, select, textarea',
      );
      if (event.key === 'ArrowRight' || (event.key === 'Enter' && !onControl)) {
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
