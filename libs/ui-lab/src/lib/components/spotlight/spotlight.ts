import {
  Directive,
  ElementRef,
  computed,
  effect,
  inject,
  input,
  output,
  untracked,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScSpotlightState } from './spotlight-state';

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

@Directive({
  selector: 'div[scSpotlight]',
  exportAs: 'scSpotlight',
  providers: [ScSpotlightState],
  host: {
    'data-slot': 'spotlight',
    '[class]': 'class()',
    tabindex: '-1',
    role: 'dialog',
    'aria-modal': 'true',
    '(click)': 'onOverlayClick($event)',
    '(keydown)': 'onKeydown($event)',
    '(window:resize)': 'state.updateTargetRect()',
    '(window:scroll)': 'state.updateTargetRect()',
  },
})
export class ScSpotlight {
  readonly classInput = input<string>('', { alias: 'class' });

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

  readonly opened = output<void>();
  readonly closed = output<void>();

  readonly state = inject(ScSpotlightState);
  private readonly elementRef = inject(ElementRef<HTMLDivElement>);

  readonly isActive = this.state.isActive;
  readonly targetRect = this.state.targetRect;

  protected readonly class = computed(() => {
    if (this.state.isActive()) {
      return cn(
        'fixed inset-0 z-9999',
        'animate-in fade-in-0 duration-200',
        this.classInput(),
      );
    }
    return cn('hidden', this.classInput());
  });

  constructor() {
    effect(() => this.state.padding.set(this.padding()));
    effect(() => this.state.borderRadius.set(this.borderRadius()));
    effect(() => this.state.overlayOpacity.set(this.overlayOpacity()));
    effect(() => this.state.animationDuration.set(this.animationDuration()));
    effect(() => this.state.showClose.set(this.showClose()));
    effect(() =>
      this.state.closeOnOverlayClick.set(this.closeOnOverlayClick()),
    );
    effect(() => this.state.closeOnEscape.set(this.closeOnEscape()));
    effect(() => this.state.scrollIntoView.set(this.scrollIntoView()));
    effect(() => this.state.scrollBehavior.set(this.scrollBehavior()));
    effect(() => this.state.contentPlacement.set(this.contentPlacement()));

    effect(() => {
      const targetInput = this.target();
      untracked(() => {
        if (targetInput) {
          this.state.show(targetInput);
        } else if (this.state.isActive()) {
          this.state.hide();
        }
      });
    });

    this.state.onOpened = () => {
      this.opened.emit();
      setTimeout(() => {
        this.elementRef.nativeElement.focus();
      });
    };
    this.state.onClosed = () => this.closed.emit();
  }

  show(target: string | Element): void {
    this.state.show(target);
  }

  hide(): void {
    this.state.hide();
  }

  toggle(target: string | Element): void {
    this.state.toggle(target);
  }

  close(): void {
    this.state.close();
  }

  protected onOverlayClick(event: MouseEvent): void {
    if (
      event.target === event.currentTarget &&
      this.state.closeOnOverlayClick()
    ) {
      this.state.close();
    }
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.state.closeOnEscape()) {
      this.state.close();
      event.preventDefault();
    }
  }
}
