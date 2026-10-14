import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils';
import { ScHoverCardProvider } from './hover-card-provider';

/** The hover card's panel: animates in when shown and out when it goes (`animate.enter` / `animate.leave`). */
@Component({
  selector: 'div[scHoverCard]',
  template: ` <ng-content /> `,
  host: {
    '[class]': 'class()',
    '[attr.data-side]': 'hoverCardProvider.side()',
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
    'animate.enter': 'animate-in fade-in-0 zoom-in-95',
    'animate.leave': 'animate-out fade-out-0 zoom-out-95',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScHoverCard {
  readonly hoverCardProvider = inject(ScHoverCardProvider);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'z-50 w-64 rounded-lg ring-1 ring-foreground/10 bg-popover p-2.5 text-sm text-popover-foreground shadow-md outline-hidden duration-100',
      'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      this.classInput(),
    ),
  );

  private hideTimeout: ReturnType<typeof setTimeout> | null = null;

  onMouseEnter(): void {
    this.hoverCardProvider.cancelTriggerHide();
    this.cancelHide();
    this.hoverCardProvider.show();
  }

  onMouseLeave(): void {
    this.scheduleHide();
  }

  private scheduleHide(): void {
    this.cancelHide();
    this.hideTimeout = setTimeout(() => {
      this.hoverCardProvider.hide();
    }, this.hoverCardProvider.closeDelay());
  }

  private cancelHide(): void {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }
  }
}
