import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  input,
  output,
  signal,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';

export interface SpotlightOptions {
  target: string | Element;
  padding?: number;
  borderRadius?: number;
  overlayOpacity?: number;
  animationDuration?: number;
  showClose?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  scrollIntoView?: boolean;
  scrollBehavior?: ScrollBehavior;
}

interface TargetRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

@Component({
  selector: 'sc-spotlight',
  template: `
    @if (isActive()) {
      <div
        [class]="containerClass()"
        (click)="onOverlayClick($event)"
        (keydown)="onKeydown($event)"
        tabindex="-1"
        role="dialog"
        aria-modal="true"
        #container
      >
        <!-- SVG Overlay with spotlight cutout -->
        <svg class="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <mask id="spotlight-mask">
              <rect x="0" y="0" width="100%" height="100%" fill="white" />
              @if (targetRect()) {
                <rect
                  [attr.x]="targetRect()!.left - padding()"
                  [attr.y]="targetRect()!.top - padding()"
                  [attr.width]="targetRect()!.width + padding() * 2"
                  [attr.height]="targetRect()!.height + padding() * 2"
                  [attr.rx]="borderRadius()"
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
            mask="url(#spotlight-mask)"
            class="transition-opacity"
            [style.transition-duration.ms]="animationDuration()"
          />
        </svg>

        <!-- Spotlight border/glow effect -->
        @if (targetRect()) {
          <div
            class="absolute pointer-events-none transition-all"
            [class]="highlightClass()"
            [style.top.px]="targetRect()!.top - padding()"
            [style.left.px]="targetRect()!.left - padding()"
            [style.width.px]="targetRect()!.width + padding() * 2"
            [style.height.px]="targetRect()!.height + padding() * 2"
            [style.border-radius.px]="borderRadius()"
            [style.transition-duration.ms]="animationDuration()"
          >
            <!-- Pulse animation ring -->
            <div
              class="absolute inset-0 rounded-[inherit] animate-ping bg-primary/20"
              [style.animation-duration]="'1.5s'"
            ></div>
            <!-- Solid border -->
            <div
              class="absolute inset-0 rounded-[inherit] border-2 border-primary"
            ></div>
          </div>
        }

        <!-- Close button -->
        @if (showClose()) {
          <button
            type="button"
            (click)="close()"
            class="absolute top-4 right-4 p-2 rounded-full bg-background/90 hover:bg-background text-foreground shadow-lg z-10"
            aria-label="Close spotlight"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              class="size-5"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        }

        <!-- Content slot for tooltip/info -->
        @if (targetRect()) {
          <div
            [class]="contentClass()"
            [style]="contentStyle()"
            (click)="$event.stopPropagation()"
          >
            <ng-content></ng-content>
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
export class ScSpotlight {
  private readonly destroyRef = inject(DestroyRef);

  // Inputs
  readonly target = input<string | Element | null>(null);
  readonly padding = input(8);
  readonly borderRadius = input(8);
  readonly overlayOpacity = input(0.75);
  readonly animationDuration = input(300);
  readonly showClose = input(true);
  readonly closeOnOverlayClick = input(true);
  readonly closeOnEscape = input(true);
  readonly scrollIntoView = input(true);
  readonly scrollBehavior = input<ScrollBehavior>('smooth');
  readonly contentPlacement = input<
    'top' | 'bottom' | 'left' | 'right' | 'auto'
  >('auto');
  readonly class = input<string>('');

  // Outputs
  readonly opened = output<void>();
  readonly closed = output<void>();

  // Internal state
  readonly isActive = signal(false);
  readonly targetRect = signal<TargetRect | null>(null);
  private targetElement: Element | null = null;
  private resizeObserver: ResizeObserver | null = null;

  private readonly container =
    viewChild<ElementRef<HTMLDivElement>>('container');

  protected readonly containerClass = computed(() =>
    cn(
      'fixed inset-0 z-[9999]',
      'animate-in fade-in-0 duration-200',
      this.class(),
    ),
  );

  protected readonly highlightClass = computed(() =>
    cn('shadow-[0_0_0_4px_rgba(var(--primary),0.2)]'),
  );

  protected readonly contentClass = computed(() =>
    cn(
      'absolute z-10 max-w-sm p-4 bg-popover text-popover-foreground',
      'border rounded-lg shadow-lg',
      'animate-in fade-in-0 zoom-in-95 duration-200',
    ),
  );

  protected readonly contentStyle = computed(() => {
    const rect = this.targetRect();
    if (!rect) return {};

    const pad = this.padding();
    const contentWidth = 320;
    const contentHeight = 150;
    const margin = 16;

    let placement = this.contentPlacement();

    if (placement === 'auto') {
      const spaceBelow = window.innerHeight - (rect.top + rect.height + pad);
      const spaceAbove = rect.top - pad;
      const spaceRight = window.innerWidth - (rect.left + rect.width + pad);
      const spaceLeft = rect.left - pad;

      if (spaceBelow >= contentHeight + margin) {
        placement = 'bottom';
      } else if (spaceAbove >= contentHeight + margin) {
        placement = 'top';
      } else if (spaceRight >= contentWidth + margin) {
        placement = 'right';
      } else if (spaceLeft >= contentWidth + margin) {
        placement = 'left';
      } else {
        placement = 'bottom';
      }
    }

    let top: number;
    let left: number;

    switch (placement) {
      case 'top':
        top = rect.top - pad - contentHeight - margin;
        left = rect.left + rect.width / 2 - contentWidth / 2;
        break;
      case 'bottom':
        top = rect.top + rect.height + pad + margin;
        left = rect.left + rect.width / 2 - contentWidth / 2;
        break;
      case 'left':
        top = rect.top + rect.height / 2 - contentHeight / 2;
        left = rect.left - pad - contentWidth - margin;
        break;
      case 'right':
        top = rect.top + rect.height / 2 - contentHeight / 2;
        left = rect.left + rect.width + pad + margin;
        break;
      default:
        top = rect.top + rect.height + pad + margin;
        left = rect.left + rect.width / 2 - contentWidth / 2;
    }

    left = Math.max(
      margin,
      Math.min(left, window.innerWidth - contentWidth - margin),
    );
    top = Math.max(margin, top);

    return {
      top: `${top}px`,
      left: `${left}px`,
      maxWidth: `${contentWidth}px`,
    };
  });

  constructor() {
    effect(() => {
      const targetInput = this.target();
      if (targetInput) {
        this.show(targetInput);
      } else if (this.isActive()) {
        this.hide();
      }
    });

    this.destroyRef.onDestroy(() => {
      this.resizeObserver?.disconnect();
    });
  }

  show(target: string | Element): void {
    const element =
      typeof target === 'string' ? document.querySelector(target) : target;

    if (!element) {
      console.warn('Spotlight: Target element not found');
      return;
    }

    this.targetElement = element;
    this.isActive.set(true);
    this.updateTargetRect();
    this.setupResizeObserver();

    if (this.scrollIntoView()) {
      element.scrollIntoView({
        behavior: this.scrollBehavior(),
        block: 'center',
      });
    }

    this.opened.emit();

    // Focus the container for keyboard navigation
    setTimeout(() => {
      this.container()?.nativeElement?.focus();
    });
  }

  hide(): void {
    this.isActive.set(false);
    this.targetElement = null;
    this.targetRect.set(null);
    this.resizeObserver?.disconnect();
    this.resizeObserver = null;
    this.closed.emit();
  }

  toggle(target: string | Element): void {
    if (this.isActive()) {
      this.hide();
    } else {
      this.show(target);
    }
  }

  updateTargetRect(): void {
    if (!this.targetElement) {
      this.targetRect.set(null);
      return;
    }

    const rect = this.targetElement.getBoundingClientRect();
    this.targetRect.set({
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
      width: rect.width,
      height: rect.height,
    });
  }

  private setupResizeObserver(): void {
    if (!this.targetElement || this.resizeObserver) return;

    this.resizeObserver = new ResizeObserver(() => {
      this.updateTargetRect();
    });

    this.resizeObserver.observe(this.targetElement);
  }

  protected onOverlayClick(event: MouseEvent): void {
    if (event.target === event.currentTarget && this.closeOnOverlayClick()) {
      this.close();
    }
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.closeOnEscape()) {
      this.close();
      event.preventDefault();
    }
  }

  close(): void {
    this.hide();
  }
}
