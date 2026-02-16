import { ConnectedPosition, OverlayModule } from '@angular/cdk/overlay';
import { NgTemplateOutlet } from '@angular/common';
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
import { cn } from '@semantic-components/ui';
import { ScHoverCardPortal } from './hover-card-portal';
import { ScHoverCardTrigger } from './hover-card-trigger';

export type HoverCardSide = 'top' | 'right' | 'bottom' | 'left';
export type HoverCardAlign = 'start' | 'center' | 'end';

type PositionKey = `${HoverCardSide}-${HoverCardAlign}`;

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
  selector: 'div[sc-hover-card-provider]',
  imports: [OverlayModule, NgTemplateOutlet],
  template: `
    <ng-content />

    @if (origin(); as origin) {
      <ng-template
        cdkConnectedOverlay
        [cdkConnectedOverlayOrigin]="origin"
        [cdkConnectedOverlayOpen]="overlayOpen()"
        [cdkConnectedOverlayPositions]="[position()]"
      >
        <ng-container [ngTemplateOutlet]="hoverCardPortal().templateRef" />
      </ng-template>
    }
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
  protected readonly hoverCardPortal = contentChild.required(ScHoverCardPortal);

  readonly origin = computed(() => this.triggerChild()?.overlayOrigin);

  protected readonly position = computed(() => {
    const side = this.side();
    const align = this.align();
    const key: PositionKey = `${side}-${align}`;
    return positionMap[key];
  });

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
