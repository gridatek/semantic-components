import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  effect,
  input,
  model,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { ScPopoverTrigger } from './popover-trigger';

export type PopoverAlign = 'start' | 'center' | 'end';
export type PopoverSide = 'top' | 'right' | 'bottom' | 'left';

@Component({
  selector: 'div[sc-popover-provider]',
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'popover-provider',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScPopoverProvider {
  readonly classInput = input<string>('', { alias: 'class' });

  /** Which side the popover appears on */
  readonly side = input<PopoverSide>('bottom');

  /** Alignment along the side */
  readonly align = input<PopoverAlign>('center');

  /**
   * Logical state: Controls animation state (open/closed)
   * - When true: Triggers entry animation
   * - When false: Triggers exit animation
   */
  readonly open = model<boolean>(false);

  /**
   * Physical state: Controls DOM presence via cdkConnectedOverlayOpen
   * - When true: Content exists in DOM (can animate)
   * - When false: Content removed from DOM
   * - Stays true during close animation to allow it to complete
   */
  readonly overlayOpen = signal<boolean>(false);

  private readonly triggerChild = contentChild(ScPopoverTrigger);

  readonly origin = computed(() => this.triggerChild()?.overlayOrigin);

  protected readonly class = computed(() =>
    cn('relative inline-block', this.classInput()),
  );

  constructor() {
    // Synchronize overlay state with logical state for opening
    effect(() => {
      if (this.open()) {
        // Opening: Mount DOM immediately so animation can start
        this.overlayOpen.set(true);
      }
      // Note: When closing (open = false), overlayOpen stays true
      // until animation completes (handled by onPopoverAnimationComplete)
    });
  }

  /**
   * Called by popover when its close animation completes
   */
  onPopoverAnimationComplete(): void {
    if (!this.open()) {
      this.overlayOpen.set(false);
    }
  }
}
