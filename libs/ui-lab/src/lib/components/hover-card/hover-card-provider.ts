import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  effect,
  input,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { ScHoverCardTrigger } from './hover-card-trigger';

export type HoverCardSide = 'top' | 'right' | 'bottom' | 'left';
export type HoverCardAlign = 'start' | 'center' | 'end';

@Component({
  selector: 'div[sc-hover-card-provider]',
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'hover-card-provider',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScHoverCardProvider {
  readonly classInput = input<string>('', { alias: 'class' });

  /** Which side the hover card appears on */
  readonly side = input<HoverCardSide>('bottom');

  /** Alignment along the side */
  readonly align = input<HoverCardAlign>('center');

  /** Delay before showing hover card (ms) */
  readonly openDelay = input<number>(700);

  /** Delay before hiding hover card (ms) */
  readonly closeDelay = input<number>(300);

  /** Whether the hover card is logically open (controls animation state) */
  readonly open = signal<boolean>(false);

  /** Whether the overlay should be physically open (stays true during close animation) */
  readonly overlayOpen = signal<boolean>(false);

  private readonly triggerChild = contentChild(ScHoverCardTrigger);

  readonly origin = computed(() => this.triggerChild()?.overlayOrigin);

  protected readonly class = computed(() =>
    cn('relative inline-block', this.classInput()),
  );

  constructor() {
    // When opening, open overlay immediately
    effect(() => {
      if (this.open()) {
        this.overlayOpen.set(true);
      }
    });
  }

  show(): void {
    this.open.set(true);
  }

  hide(): void {
    this.open.set(false);
    // overlayOpen will be set to false by onAnimationComplete
  }

  /** Called by hover-card when close animation completes */
  onAnimationComplete(): void {
    this.overlayOpen.set(false);
  }

  /** Cancel pending hide timeout on the trigger */
  cancelTriggerHide(): void {
    this.triggerChild()?.cancelHide();
  }
}
