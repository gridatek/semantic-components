import { FocusTrap, FocusTrapFactory } from '@angular/cdk/a11y';
import {
  Directive,
  ElementRef,
  computed,
  contentChild,
  effect,
  inject,
  input,
  output,
  untracked,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScSpotlightDescription } from './spotlight-description';
import { ScSpotlightState } from './spotlight-state';
import { ScSpotlightTitle } from './spotlight-title';

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
    '[class]': 'class()',
    tabindex: '-1',
    role: 'dialog',
    'aria-modal': 'true',
    '[attr.aria-labelledby]': 'title() ? state.titleId : null',
    '[attr.aria-describedby]': 'description() ? state.descriptionId : null',
    '[attr.aria-label]': 'title() ? null : ariaLabel()',
    '(click)': 'onOverlayClick($event)',
    '(keydown)': 'onKeydown($event)',
    '(window:resize)': 'state.updateTargetRect()',
    '(window:scroll)': 'state.updateTargetRect()',
  },
})
export class ScSpotlight {
  readonly classInput = input<string>('', { alias: 'class' });
  /** Name of the dialog when it has no `scSpotlightTitle`. */
  readonly ariaLabel = input<string>('Spotlight', { alias: 'aria-label' });

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
  private readonly focusTrapFactory = inject(FocusTrapFactory);
  private focusTrap: FocusTrap | null = null;
  /** Element focused before opening; focus returns to it on close. */
  private returnFocus: HTMLElement | null = null;

  protected readonly title = contentChild(ScSpotlightTitle, {
    descendants: true,
  });
  protected readonly description = contentChild(ScSpotlightDescription, {
    descendants: true,
  });

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
      this.returnFocus = document.activeElement as HTMLElement | null;
      this.opened.emit();
      setTimeout(() => {
        // Keep Tab inside the spotlight while it is open (it is modal).
        this.focusTrap ??= this.focusTrapFactory.create(
          this.elementRef.nativeElement,
        );
        this.elementRef.nativeElement.focus();
      });
    };
    this.state.onClosed = () => {
      this.focusTrap?.destroy();
      this.focusTrap = null;
      const host = this.elementRef.nativeElement;
      const active = document.activeElement;
      if (!active || active === document.body || host.contains(active)) {
        this.returnFocus?.focus();
      }
      this.returnFocus = null;
      this.closed.emit();
    };
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
