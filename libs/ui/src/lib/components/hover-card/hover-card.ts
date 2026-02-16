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
    '[attr.data-open]': 'state() === "open" ? true : null',
    '[attr.data-closed]': 'state() === "closed" ? true : null',
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
      'z-50 w-64 rounded-lg ring-1 ring-foreground/10 bg-popover p-2.5 text-sm text-popover-foreground shadow-md outline-hidden',
      'data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 duration-100',
      'data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
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
