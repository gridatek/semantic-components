import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { computed, Directive, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { ScHoverCardProvider } from './hover-card-provider';

@Directive({
  selector: '[sc-hover-card-trigger]',
  hostDirectives: [CdkOverlayOrigin],
  host: {
    'data-slot': 'hover-card-trigger',
    '[class]': 'class()',
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
    '(focus)': 'onFocus()',
    '(blur)': 'onBlur()',
  },
})
export class ScHoverCardTrigger {
  readonly hoverCardProvider = inject(ScHoverCardProvider);
  readonly overlayOrigin = inject(CdkOverlayOrigin);
  readonly classInput = input<string>('', { alias: 'class' });

  private showTimeout: ReturnType<typeof setTimeout> | null = null;
  private hideTimeout: ReturnType<typeof setTimeout> | null = null;

  protected readonly class = computed(() => cn('', this.classInput()));

  onMouseEnter(): void {
    this.cancelHide();
    this.scheduleShow();
  }

  onMouseLeave(): void {
    this.cancelShow();
    this.scheduleHide();
  }

  onFocus(): void {
    this.cancelHide();
    this.scheduleShow();
  }

  onBlur(): void {
    this.cancelShow();
    this.scheduleHide();
  }

  private scheduleShow(): void {
    this.cancelShow();
    this.showTimeout = setTimeout(() => {
      this.hoverCardProvider.show();
    }, this.hoverCardProvider.openDelay());
  }

  private cancelShow(): void {
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
      this.showTimeout = null;
    }
  }

  private scheduleHide(): void {
    this.cancelHide();
    this.hideTimeout = setTimeout(() => {
      this.hoverCardProvider.hide();
    }, this.hoverCardProvider.closeDelay());
  }

  cancelHide(): void {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }
  }
}
