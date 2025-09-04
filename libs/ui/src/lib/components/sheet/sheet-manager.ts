import { Overlay, OverlayConfig, OverlayContainer, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  ComponentRef,
  Injectable,
  TemplateRef,
  effect,
  inject,
  linkedSignal,
  signal,
} from '@angular/core';

import { ScSheetConfig } from './sheet-config';
import { ScSheetContainer } from './sheet-container';

@Injectable({
  providedIn: 'root',
})
export class ScSheetManager {
  private readonly overlayContainer = inject(OverlayContainer);
  private readonly overlay = inject(Overlay);
  private overlayRef!: OverlayRef;

  readonly isOpen = signal(false);

  readonly state = linkedSignal(() => (this.isOpen() ? 'open' : 'closed'));

  readonly side = signal<'top' | 'bottom' | 'left' | 'right'>('right');

  constructor() {
    effect(() => {
      const overlayDarkBackdrop = this.overlayContainer
        .getContainerElement()
        .querySelector('.cdk-overlay-dark-backdrop');
      if (overlayDarkBackdrop) {
        overlayDarkBackdrop.setAttribute('data-state', this.state());
      }
    });
  }

  open(templateRef: TemplateRef<unknown>, config: ScSheetConfig) {
    this.isOpen.set(true);
    this.side.set(config.side);

    const overlayConfig = this.getOverlayConfig(config);

    // Set block scroll strategy
    overlayConfig.scrollStrategy = this.overlay.scrollStrategies.block();

    this.overlayRef = this.overlay.create(overlayConfig);

    const scSheetPortal = new ComponentPortal(ScSheetContainer);
    const scSheetRef: ComponentRef<ScSheetContainer> = this.overlayRef.attach(scSheetPortal);

    scSheetRef.instance.templateRef.set(templateRef);

    this.overlayRef.backdropClick().subscribe(() => this.close());
  }

  close() {
    if (this.overlayRef?.hasAttached()) {
      this.overlayRef?.detach();
      this.isOpen.set(false);
    }
  }

  private getOverlayConfig(config: ScSheetConfig): OverlayConfig {
    switch (config.side) {
      case 'top': {
        return new OverlayConfig({
          positionStrategy: this.overlay.position().global().top(),
          width: config.width,
          height: config.height,
          hasBackdrop: true,
        });
      }
      case 'bottom': {
        return new OverlayConfig({
          positionStrategy: this.overlay.position().global().bottom(),
          width: config.width,
          height: config.height,
          hasBackdrop: true,
        });
      }
      case 'left': {
        return new OverlayConfig({
          positionStrategy: this.overlay.position().global().left(),
          width: config.width,
          height: config.height,
          hasBackdrop: true,
        });
      }
      case 'right': {
        return new OverlayConfig({
          positionStrategy: this.overlay.position().global().right(),
          width: config.width,
          height: config.height,
          hasBackdrop: true,
        });
      }

      default: {
        throw new Error('Error in switch case');
      }
    }
  }
}
