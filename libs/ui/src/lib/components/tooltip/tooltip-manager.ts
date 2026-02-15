import { ConnectedPosition, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import {
  ComponentRef,
  DestroyRef,
  ElementRef,
  inject,
  Injectable,
  Injector,
  OutputRefSubscription,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ScTooltip, SC_TOOLTIP_DATA } from './tooltip';

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
  tooltipClass: string;
}

@Injectable({ providedIn: 'root' })
export class ScTooltipManager {
  private readonly overlay = inject(Overlay);
  private readonly injector = inject(Injector);
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

  private overlayRef: OverlayRef | null = null;
  private tooltipRef: ComponentRef<ScTooltip> | null = null;
  private currentTooltipId: string | null = null;
  private animationSubscription: OutputRefSubscription | null = null;

  constructor() {
    this.setupEscapeListener();
  }

  private setupEscapeListener(): void {
    fromEvent<KeyboardEvent>(this.document, 'keydown')
      .pipe(
        filter((event) => event.key === 'Escape'),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => this.hide());
  }

  show(
    elementRef: ElementRef,
    config: ScTooltipConfig,
    tooltipId: string,
  ): void {
    // Close any existing tooltip first (singleton behavior)
    if (this.overlayRef) {
      this.hide();
    }

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
            tooltipClass: config.tooltipClass,
            tooltipId,
          },
        },
      ],
      parent: this.injector,
    });

    const portal = new ComponentPortal(ScTooltip, null, tooltipInjector);

    this.tooltipRef = this.overlayRef.attach(portal);

    // Subscribe to animation completion
    this.animationSubscription =
      this.tooltipRef.instance.animationComplete.subscribe(() => {
        this.disposeTooltip();
      });
  }

  hide(): void {
    if (!this.tooltipRef) {
      return;
    }

    // Trigger close animation (will dispose via animationComplete)
    this.tooltipRef.instance.close();
  }

  private disposeTooltip(): void {
    if (this.animationSubscription) {
      this.animationSubscription.unsubscribe();
      this.animationSubscription = null;
    }

    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }

    this.tooltipRef = null;
    this.currentTooltipId = null;
  }

  isTooltipVisible(tooltipId: string): boolean {
    return this.currentTooltipId === tooltipId;
  }
}
