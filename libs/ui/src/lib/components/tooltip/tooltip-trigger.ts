import {
  DestroyRef,
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { _IdGenerator } from '@angular/cdk/a11y';
import { ScTooltipManager, ScTooltipPosition } from './tooltip-manager';

@Directive({
  selector: '[scTooltipTrigger]',
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
    '(focus)': 'onFocus()',
    '(blur)': 'onBlur()',
    '[attr.aria-describedby]': 'ariaDescribedBy()',
  },
})
export class ScTooltipTrigger {
  private readonly tooltipManager = inject(ScTooltipManager);
  private readonly elementRef = inject(ElementRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly idGenerator = inject(_IdGenerator);

  /** The tooltip text content */
  readonly content = input.required<string>({ alias: 'scTooltipTrigger' });

  /** Position of the tooltip relative to the trigger element */
  readonly position = input<ScTooltipPosition>('top', {
    alias: 'tooltipPosition',
  });

  /** Delay before showing the tooltip in milliseconds */
  readonly showDelay = input<number>(200, { alias: 'tooltipDelay' });

  /** Delay before hiding the tooltip in milliseconds */
  readonly hideDelay = input<number>(0, { alias: 'tooltipHideDelay' });

  /** Whether the tooltip is disabled */
  readonly disabled = input<boolean>(false, { alias: 'tooltipDisabled' });

  /** Custom CSS class for the tooltip */
  readonly tooltipClass = input<string>('', { alias: 'tooltipClass' });

  private readonly tooltipId = this.idGenerator.getId('sc-tooltip-');
  private showTimeout: ReturnType<typeof setTimeout> | null = null;
  private hideTimeout: ReturnType<typeof setTimeout> | null = null;
  private readonly isVisible = signal(false);

  protected readonly ariaDescribedBy = () =>
    this.isVisible() ? this.tooltipId : null;

  constructor() {
    // Effect to hide tooltip when content becomes empty
    effect(() => {
      if (!this.content() && this.isVisible()) {
        this.hide();
      }
    });

    // Cleanup on destroy
    this.destroyRef.onDestroy(() => {
      this.cancelTimers();
      this.hide();
    });
  }

  protected onMouseEnter(): void {
    this.scheduleShow();
  }

  protected onMouseLeave(): void {
    this.scheduleHide();
  }

  protected onFocus(): void {
    this.scheduleShow();
  }

  protected onBlur(): void {
    this.scheduleHide();
  }

  private scheduleShow(): void {
    if (this.disabled() || !this.content()) {
      return;
    }

    this.cancelTimers();

    const delay = this.showDelay();
    if (delay > 0) {
      this.showTimeout = setTimeout(() => this.show(), delay);
    } else {
      this.show();
    }
  }

  private scheduleHide(): void {
    this.cancelTimers();

    const delay = this.hideDelay();
    if (delay > 0) {
      this.hideTimeout = setTimeout(() => this.hide(), delay);
    } else {
      this.hide();
    }
  }

  private show(): void {
    if (this.disabled() || !this.content()) {
      return;
    }

    this.tooltipManager.show(
      this.elementRef,
      {
        content: this.content(),
        position: this.position(),
        tooltipClass: this.tooltipClass(),
      },
      this.tooltipId,
    );
    this.isVisible.set(true);
  }

  private hide(): void {
    if (this.tooltipManager.isTooltipVisible(this.tooltipId)) {
      this.tooltipManager.hide();
    }
    this.isVisible.set(false);
  }

  private cancelTimers(): void {
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
      this.showTimeout = null;
    }
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }
  }
}
