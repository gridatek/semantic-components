import {
  DestroyRef,
  Injectable,
  computed,
  inject,
  signal,
} from '@angular/core';

export interface TargetRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

let nextMaskId = 0;

@Injectable()
export class ScSpotlightState {
  private readonly destroyRef = inject(DestroyRef);

  readonly maskId = `spotlight-mask-${nextMaskId++}`;

  onOpened: (() => void) | undefined;
  onClosed: (() => void) | undefined;

  readonly isActive = signal(false);
  readonly targetRect = signal<TargetRect | null>(null);
  private targetElement: Element | null = null;
  private resizeObserver: ResizeObserver | null = null;

  readonly padding = signal(8);
  readonly borderRadius = signal(8);
  readonly overlayOpacity = signal(0.75);
  readonly animationDuration = signal(300);
  readonly showClose = signal(true);
  readonly closeOnOverlayClick = signal(true);
  readonly closeOnEscape = signal(true);
  readonly scrollIntoView = signal(true);
  readonly scrollBehavior = signal<ScrollBehavior>('smooth');
  readonly contentPlacement = signal<
    'top' | 'bottom' | 'left' | 'right' | 'auto'
  >('auto');

  readonly tooltipStyle = computed(() => {
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

    this.onOpened?.();
  }

  hide(): void {
    this.isActive.set(false);
    this.targetElement = null;
    this.targetRect.set(null);
    this.resizeObserver?.disconnect();
    this.resizeObserver = null;
    this.onClosed?.();
  }

  toggle(target: string | Element): void {
    if (this.isActive()) {
      this.hide();
    } else {
      this.show(target);
    }
  }

  close(): void {
    this.hide();
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
}
