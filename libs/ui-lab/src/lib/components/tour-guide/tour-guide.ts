import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  Injectable,
  input,
  output,
  signal,
  DoCheck,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';

export interface TourStep {
  target: string; // CSS selector for the target element
  title: string;
  content: string;
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'auto';
  highlightPadding?: number;
  disableInteraction?: boolean;
  beforeShow?: () => void | Promise<void>;
  afterHide?: () => void | Promise<void>;
}

export interface TourOptions {
  steps: TourStep[];
  overlayOpacity?: number;
  animationDuration?: number;
  showProgress?: boolean;
  showStepNumbers?: boolean;
  allowClose?: boolean;
  allowKeyboardNavigation?: boolean;
  scrollBehavior?: ScrollBehavior;
  scrollPadding?: number;
}

interface TargetRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

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

@Component({
  selector: 'sc-tour-guide',
  template: `
    @if (tourService.isActive()) {
      <div
        [class]="overlayClass()"
        (click)="onOverlayClick($event)"
        (keydown)="onKeydown($event)"
        tabindex="-1"
        #overlay
      >
        <!-- SVG Overlay with cutout -->
        <svg class="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <mask id="tour-mask">
              <rect x="0" y="0" width="100%" height="100%" fill="white" />
              @if (targetRect()) {
                <rect
                  [attr.x]="targetRect()!.left - highlightPadding()"
                  [attr.y]="targetRect()!.top - highlightPadding()"
                  [attr.width]="targetRect()!.width + highlightPadding() * 2"
                  [attr.height]="targetRect()!.height + highlightPadding() * 2"
                  [attr.rx]="8"
                  fill="black"
                />
              }
            </mask>
          </defs>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            [attr.fill]="'rgba(0,0,0,' + overlayOpacity() + ')'"
            mask="url(#tour-mask)"
          />
        </svg>

        <!-- Highlight border -->
        @if (targetRect()) {
          <div
            class="absolute border-2 border-primary rounded-lg pointer-events-none transition-all duration-300"
            [style.top.px]="targetRect()!.top - highlightPadding()"
            [style.left.px]="targetRect()!.left - highlightPadding()"
            [style.width.px]="targetRect()!.width + highlightPadding() * 2"
            [style.height.px]="targetRect()!.height + highlightPadding() * 2"
          >
            <div
              class="absolute inset-0 rounded-lg animate-pulse bg-primary/10"
            ></div>
          </div>
        }

        <!-- Tooltip -->
        @if (currentStep()) {
          <div
            [class]="tooltipClass()"
            [style]="tooltipStyle()"
            role="dialog"
            aria-modal="true"
            [attr.aria-label]="currentStep()!.title"
          >
            <!-- Close button -->
            @if (allowClose()) {
              <button
                type="button"
                (click)="close()"
                class="absolute top-2 right-2 p-1 rounded hover:bg-accent"
                aria-label="Close tour"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  class="size-4"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            }

            <!-- Step number -->
            @if (showStepNumbers()) {
              <div
                class="absolute -top-3 -left-3 size-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium"
              >
                {{ tourService.currentStep() + 1 }}
              </div>
            }

            <!-- Content -->
            <div class="pr-6">
              <h3 class="font-semibold text-lg mb-2">
                {{ currentStep()!.title }}
              </h3>
              <p class="text-sm text-muted-foreground">
                {{ currentStep()!.content }}
              </p>
            </div>

            <!-- Progress bar -->
            @if (showProgress()) {
              <div class="mt-4 h-1 bg-muted rounded-full overflow-hidden">
                <div
                  class="h-full bg-primary transition-all duration-300"
                  [style.width.%]="tourService.progress()"
                ></div>
              </div>
            }

            <!-- Navigation -->
            <div class="flex items-center justify-between mt-4 pt-4 border-t">
              <div class="text-sm text-muted-foreground">
                {{ tourService.currentStep() + 1 }} of
                {{ tourService.steps().length }}
              </div>
              <div class="flex gap-2">
                @if (!tourService.isFirstStep()) {
                  <button
                    type="button"
                    (click)="previous()"
                    class="px-3 py-1.5 text-sm border rounded-md hover:bg-accent"
                  >
                    Previous
                  </button>
                }
                @if (tourService.isLastStep()) {
                  <button
                    type="button"
                    (click)="finish()"
                    class="px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                  >
                    Finish
                  </button>
                } @else {
                  <button
                    type="button"
                    (click)="next()"
                    class="px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                  >
                    Next
                  </button>
                }
              </div>
            </div>
          </div>
        }
      </div>
    }
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:resize)': 'updateTargetRect()',
    '(window:scroll)': 'updateTargetRect()',
  },
})
export class ScTourGuide implements DoCheck {
  readonly tourService = inject(TourService);
  private readonly destroyRef = inject(DestroyRef);

  // Outputs
  readonly stepChange = output<number>();
  readonly tourComplete = output<void>();
  readonly tourClosed = output<void>();

  // Internal state
  readonly targetRect = signal<TargetRect | null>(null);
  private resizeObserver: ResizeObserver | null = null;

  protected readonly currentStep = computed(() =>
    this.tourService.currentStepData(),
  );

  protected readonly overlayOpacity = computed(
    () => this.tourService.options().overlayOpacity ?? 0.5,
  );

  protected readonly highlightPadding = computed(
    () => this.currentStep()?.highlightPadding ?? 8,
  );

  protected readonly showProgress = computed(
    () => this.tourService.options().showProgress ?? true,
  );

  protected readonly showStepNumbers = computed(
    () => this.tourService.options().showStepNumbers ?? true,
  );

  protected readonly allowClose = computed(
    () => this.tourService.options().allowClose ?? true,
  );

  protected readonly overlayClass = computed(() =>
    cn('fixed inset-0 z-[9999]'),
  );

  protected readonly tooltipClass = computed(() =>
    cn(
      'absolute z-10 w-80 p-4 bg-popover text-popover-foreground',
      'border rounded-lg shadow-lg',
      'animate-in fade-in-0 zoom-in-95 duration-200',
    ),
  );

  protected readonly tooltipStyle = computed(() => {
    const rect = this.targetRect();
    const step = this.currentStep();
    if (!rect) return {};

    const padding = this.highlightPadding();
    const tooltipWidth = 320;
    const tooltipHeight = 200; // Approximate
    const margin = 12;

    let placement = step?.placement ?? 'auto';

    // Auto placement logic
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

    // Keep within viewport
    left = Math.max(
      margin,
      Math.min(left, window.innerWidth - tooltipWidth - margin),
    );
    top = Math.max(margin, top);

    return {
      top: `${top}px`,
      left: `${left}px`,
    };
  });

  constructor() {
    // Watch for step changes and update target
    this.destroyRef.onDestroy(() => {
      this.resizeObserver?.disconnect();
    });
  }

  ngDoCheck(): void {
    if (this.tourService.isActive()) {
      this.updateTargetRect();
    }
  }

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

    // Scroll element into view
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

  protected onOverlayClick(event: MouseEvent): void {
    // Only close if clicking on the overlay itself, not the tooltip
    if (event.target === event.currentTarget && this.allowClose()) {
      this.close();
    }
  }

  protected onKeydown(event: KeyboardEvent): void {
    const allowKeyboard =
      this.tourService.options().allowKeyboardNavigation ?? true;

    if (event.key === 'Escape' && this.allowClose()) {
      this.close();
      event.preventDefault();
    } else if (allowKeyboard) {
      if (event.key === 'ArrowRight' || event.key === 'Enter') {
        if (this.tourService.isLastStep()) {
          this.finish();
        } else {
          this.next();
        }
        event.preventDefault();
      } else if (event.key === 'ArrowLeft') {
        this.previous();
        event.preventDefault();
      }
    }
  }

  next(): void {
    this.tourService.next();
    this.stepChange.emit(this.tourService.currentStep());
  }

  previous(): void {
    this.tourService.previous();
    this.stepChange.emit(this.tourService.currentStep());
  }

  finish(): void {
    this.tourService.stop();
    this.tourComplete.emit();
  }

  close(): void {
    this.tourService.stop();
    this.tourClosed.emit();
  }
}
