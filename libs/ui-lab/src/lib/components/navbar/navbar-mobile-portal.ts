import { Overlay } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  DestroyRef,
  Directive,
  TemplateRef,
  ViewContainerRef,
  effect,
  inject,
} from '@angular/core';
import { ScNavbarProvider } from './navbar-provider';

/**
 * The mobile menu's template, shown in an overlay under the navbar while the
 * menu is open. Detached on close: Angular keeps the menu until it has
 * animated out (`animate.leave`).
 */
@Directive({ selector: 'ng-template[scNavbarMobilePortal]' })
export class ScNavbarMobilePortal {
  private readonly provider = inject(ScNavbarProvider);
  private readonly overlay = inject(Overlay);
  private readonly templateRef = inject(TemplateRef);
  private readonly viewContainerRef = inject(ViewContainerRef);

  private readonly overlayRef = this.overlay.create({
    positionStrategy: this.overlay.position().global(),
    hasBackdrop: false,
    scrollStrategy: this.overlay.scrollStrategies.block(),
  });

  constructor() {
    inject(DestroyRef).onDestroy(() => this.overlayRef.dispose());

    this.overlayRef.keydownEvents().subscribe((event) => {
      if (event.key === 'Escape') this.provider.closeAndRestoreFocus();
    });

    // Under the navbar, once it is there.
    effect(() => {
      const origin = this.provider.origin();
      if (origin?.elementRef) {
        this.overlayRef.updatePositionStrategy(
          this.overlay
            .position()
            .flexibleConnectedTo(origin.elementRef)
            .withPositions([
              {
                originX: 'start',
                originY: 'bottom',
                overlayX: 'start',
                overlayY: 'top',
              },
            ])
            .withPush(false),
        );
      }
    });

    effect(() => {
      if (this.provider.open()) {
        if (!this.overlayRef.hasAttached()) {
          this.overlayRef.attach(
            new TemplatePortal(this.templateRef, this.viewContainerRef),
          );
        }
      } else if (this.overlayRef.hasAttached()) {
        this.overlayRef.detach();
      }
    });
  }
}
