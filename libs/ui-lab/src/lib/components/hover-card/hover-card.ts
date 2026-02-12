import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  output,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { ScHoverCardProvider } from './hover-card-provider';

type ScHoverCardState = 'open' | 'closed';

@Component({
  selector: 'div[sc-hover-card]',
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'hover-card',
    '[class]': 'class()',
    '[attr.data-state]': 'state()',
    '[attr.data-side]': 'hoverCardProvider.side()',
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
    '(animationend)': 'onAnimationEnd($event)',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScHoverCard {
  private readonly elementRef = inject(ElementRef);

  readonly hoverCardProvider = inject(ScHoverCardProvider);
  readonly classInput = input<string>('', { alias: 'class' });
  readonly state = signal<ScHoverCardState>('closed');
  readonly animationComplete = output<void>();

  protected readonly class = computed(() =>
    cn(
      'z-50 w-64 rounded-lg border bg-popover p-2.5 text-sm text-popover-foreground shadow-md outline-none',
      'animate-in fade-in-0 zoom-in-95 duration-100',
      'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
      'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      this.classInput(),
    ),
  );

  private hideTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    // Sync state with provider's open signal
    effect(() => {
      const isOpen = this.hoverCardProvider.open();
      this.state.set(isOpen ? 'open' : 'closed');
    });
  }

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

  protected onAnimationEnd(event: AnimationEvent): void {
    // Only emit when close animation completes
    if (
      this.state() === 'closed' &&
      event.target === this.elementRef.nativeElement
    ) {
      this.animationComplete.emit();
      this.hoverCardProvider.onAnimationComplete();
    }
  }
}
