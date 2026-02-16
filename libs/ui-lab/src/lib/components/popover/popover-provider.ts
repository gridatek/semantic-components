import { ConnectedPosition, OverlayModule } from '@angular/cdk/overlay';
import { NgTemplateOutlet } from '@angular/common';
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
import { cn } from '@semantic-components/ui';
import { ScPopoverPortal } from './popover-portal';
import { ScPopoverTrigger } from './popover-trigger';

export type ScPopoverSide = 'top' | 'right' | 'bottom' | 'left';
export type ScPopoverAlign = 'start' | 'center' | 'end';

type PositionKey = `${ScPopoverSide}-${ScPopoverAlign}`;

const positionMap: Record<PositionKey, ConnectedPosition> = {
  'top-start': {
    originX: 'start',
    originY: 'top',
    overlayX: 'start',
    overlayY: 'bottom',
    offsetY: -4,
  },
  'top-center': {
    originX: 'center',
    originY: 'top',
    overlayX: 'center',
    overlayY: 'bottom',
    offsetY: -4,
  },
  'top-end': {
    originX: 'end',
    originY: 'top',
    overlayX: 'end',
    overlayY: 'bottom',
    offsetY: -4,
  },
  'bottom-start': {
    originX: 'start',
    originY: 'bottom',
    overlayX: 'start',
    overlayY: 'top',
    offsetY: 4,
  },
  'bottom-center': {
    originX: 'center',
    originY: 'bottom',
    overlayX: 'center',
    overlayY: 'top',
    offsetY: 4,
  },
  'bottom-end': {
    originX: 'end',
    originY: 'bottom',
    overlayX: 'end',
    overlayY: 'top',
    offsetY: 4,
  },
  'left-start': {
    originX: 'start',
    originY: 'top',
    overlayX: 'end',
    overlayY: 'top',
    offsetX: -4,
  },
  'left-center': {
    originX: 'start',
    originY: 'center',
    overlayX: 'end',
    overlayY: 'center',
    offsetX: -4,
  },
  'left-end': {
    originX: 'start',
    originY: 'bottom',
    overlayX: 'end',
    overlayY: 'bottom',
    offsetX: -4,
  },
  'right-start': {
    originX: 'end',
    originY: 'top',
    overlayX: 'start',
    overlayY: 'top',
    offsetX: 4,
  },
  'right-center': {
    originX: 'end',
    originY: 'center',
    overlayX: 'start',
    overlayY: 'center',
    offsetX: 4,
  },
  'right-end': {
    originX: 'end',
    originY: 'bottom',
    overlayX: 'start',
    overlayY: 'bottom',
    offsetX: 4,
  },
};

@Component({
  selector: 'div[sc-popover-provider]',
  imports: [OverlayModule, NgTemplateOutlet],
  template: `
    <ng-content />

    @if (origin(); as origin) {
      <ng-template
        cdkConnectedOverlay
        [cdkConnectedOverlayOrigin]="origin"
        [cdkConnectedOverlayOpen]="overlayOpen()"
        [cdkConnectedOverlayPositions]="[position()]"
        (overlayOutsideClick)="close()"
        (overlayKeydown)="onKeydown($event)"
      >
        <ng-container [ngTemplateOutlet]="popoverPortal().templateRef" />
      </ng-template>
    }
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
  readonly side = input<ScPopoverSide>('bottom');

  /** Alignment along the side */
  readonly align = input<ScPopoverAlign>('center');

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
  protected readonly popoverPortal = contentChild.required(ScPopoverPortal);

  readonly origin = computed(() => this.triggerChild()?.overlayOrigin);

  protected readonly position = computed(() => {
    const side = this.side();
    const align = this.align();
    const key: PositionKey = `${side}-${align}`;
    return positionMap[key];
  });

  protected readonly class = computed(() => cn('contents', this.classInput()));

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

  close(): void {
    this.open.set(false);
  }

  /**
   * Called by popover when its close animation completes
   */
  onPopoverAnimationComplete(): void {
    if (!this.open()) {
      this.overlayOpen.set(false);
    }
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.open.set(false);
    }
  }
}
