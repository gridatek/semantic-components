import { ConnectedPosition, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  ComponentRef,
  ElementRef,
  Injector,
  Service,
  inject,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { SC_TOOLTIP_DATA, ScTooltip } from './tooltip';

export type ScTooltipPosition = 'top' | 'right' | 'bottom' | 'left';

const positionMap: Record<ScTooltipPosition, ConnectedPosition[]> = {
  top: [
    {
      originX: 'center',
      originY: 'top',
      overlayX: 'center',
      overlayY: 'bottom',
      offsetY: -8,
    },
    {
      originX: 'center',
      originY: 'bottom',
      overlayX: 'center',
      overlayY: 'top',
      offsetY: 8,
    },
  ],
  bottom: [
    {
      originX: 'center',
      originY: 'bottom',
      overlayX: 'center',
      overlayY: 'top',
      offsetY: 8,
    },
    {
      originX: 'center',
      originY: 'top',
      overlayX: 'center',
      overlayY: 'bottom',
      offsetY: -8,
    },
  ],
  left: [
    {
      originX: 'start',
      originY: 'center',
      overlayX: 'end',
      overlayY: 'center',
      offsetX: -8,
    },
    {
      originX: 'end',
      originY: 'center',
      overlayX: 'start',
      overlayY: 'center',
      offsetX: 8,
    },
  ],
  right: [
    {
      originX: 'end',
      originY: 'center',
      overlayX: 'start',
      overlayY: 'center',
      offsetX: 8,
    },
    {
      originX: 'start',
      originY: 'center',
      overlayX: 'end',
      overlayY: 'center',
      offsetX: -8,
    },
  ],
};

export interface ScTooltipConfig {
  content: string;
  position: ScTooltipPosition;
}

@Service()
export class ScTooltipManager {
  private readonly overlay = inject(Overlay);
  private readonly injector = inject(Injector);

  private overlayRef: OverlayRef | null = null;
  private tooltipRef: ComponentRef<ScTooltip> | null = null;
  private currentTooltipId: string | null = null;
  private positionSubscription: Subscription | null = null;
  /** The last hidden tooltip's overlay: its tooltip may still be animating out. */
  private leavingOverlayRef: OverlayRef | null = null;

  show(
    elementRef: ElementRef,
    config: ScTooltipConfig,
    tooltipId: string,
  ): void {
    // Any other tooltip goes at once (no leave animation, no overlap).
    this.disposeTooltip();
    this.leavingOverlayRef?.dispose();
    this.leavingOverlayRef = null;

    this.currentTooltipId = tooltipId;

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(elementRef)
      .withPositions(positionMap[config.position])
      .withPush(true);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      hasBackdrop: false,
    });

    const tooltipInjector = Injector.create({
      providers: [
        {
          provide: SC_TOOLTIP_DATA,
          useValue: {
            content: config.content,
            tooltipId,
          },
        },
      ],
      parent: this.injector,
    });

    const portal = new ComponentPortal(ScTooltip, null, tooltipInjector);

    this.tooltipRef = this.overlayRef.attach(portal);

    this.overlayRef.keydownEvents().subscribe((event) => {
      if (event.key === 'Escape') this.hide();
    });

    // Track actual position (CDK may flip if not enough space)
    this.positionSubscription = positionStrategy.positionChanges.subscribe(
      (change) => {
        const pair = change.connectionPair;
        let side: ScTooltipPosition;

        if (pair.overlayX === 'center') {
          side = pair.overlayY === 'bottom' ? 'top' : 'bottom';
        } else {
          side = pair.overlayX === 'end' ? 'left' : 'right';
        }

        this.tooltipRef?.instance.side.set(side);
      },
    );
  }

  /**
   * Detaches the tooltip: Angular plays its leave animation, then removes it.
   * The overlay is disposed when the next tooltip shows.
   */
  hide(): void {
    if (!this.overlayRef) {
      return;
    }
    const overlayRef = this.overlayRef;
    this.release();
    overlayRef.detach();
    this.leavingOverlayRef = overlayRef;
  }

  /** Removes the shown tooltip at once. */
  private disposeTooltip(): void {
    const overlayRef = this.overlayRef;
    this.release();
    overlayRef?.dispose();
  }

  private release(): void {
    this.positionSubscription?.unsubscribe();
    this.positionSubscription = null;
    this.overlayRef = null;
    this.tooltipRef = null;
    this.currentTooltipId = null;
  }

  isTooltipVisible(tooltipId: string): boolean {
    return this.currentTooltipId === tooltipId;
  }
}
