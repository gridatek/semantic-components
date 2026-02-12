import { CdkTrapFocus } from '@angular/cdk/a11y';
import { Overlay, OverlayModule, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  input,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { ScNavbarProvider } from './navbar-provider';

@Component({
  selector: 'div[sc-navbar-mobile-portal]',
  imports: [OverlayModule, CdkTrapFocus],
  template: `
    <ng-template #mobileMenuTemplate>
      <div cdkTrapFocus [cdkTrapFocusAutoCapture]="true">
        <ng-content />
      </div>
    </ng-template>
  `,
  host: {
    'data-slot': 'navbar-mobile-portal',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScNavbarMobilePortal {
  private readonly provider = inject(ScNavbarProvider);
  private readonly overlay = inject(Overlay);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly destroyRef = inject(DestroyRef);

  readonly classInput = input<string>('', { alias: 'class' });

  @ViewChild('mobileMenuTemplate', { static: true })
  private mobileMenuTemplate!: TemplateRef<unknown>;

  protected readonly origin = computed(() => this.provider.origin());
  protected readonly class = computed(() => cn('md:hidden', this.classInput()));

  private overlayRef: OverlayRef = this.overlay.create({
    positionStrategy: this.overlay.position().global(),
    hasBackdrop: false,
    scrollStrategy: this.overlay.scrollStrategies.block(),
  });

  constructor() {
    // Cleanup memory when component is destroyed
    this.destroyRef.onDestroy(() => {
      this.overlayRef.dispose();
    });

    // Handle Keyboard Close
    this.overlayRef.keydownEvents().subscribe((event) => {
      if (event.key === 'Escape') this.closeMenu();
    });

    // Update Position Strategy when Origin becomes available
    effect(() => {
      const origin = this.origin();
      if (origin?.elementRef) {
        const positionStrategy = this.overlay
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
          .withPush(false);

        this.overlayRef.updatePositionStrategy(positionStrategy);
      }
    });

    // Use overlayOpen instead of open to delay DOM removal until animation completes
    effect(() => {
      if (this.provider.overlayOpen()) {
        this.attachMenu();
      } else {
        this.detachMenu();
      }
    });
  }

  private attachMenu(): void {
    if (!this.overlayRef.hasAttached()) {
      const portal = new TemplatePortal(
        this.mobileMenuTemplate,
        this.viewContainerRef,
      );
      this.overlayRef.attach(portal);
    }
  }

  private detachMenu(): void {
    if (this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    }
  }

  private closeMenu(): void {
    this.provider.open.set(false);
  }
}
