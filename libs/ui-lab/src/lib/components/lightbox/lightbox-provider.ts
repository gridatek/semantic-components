import { CdkTrapFocus } from '@angular/cdk/a11y';
import { Overlay, OverlayModule, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  InjectionToken,
  TemplateRef,
  ViewContainerRef,
  ViewEncapsulation,
  computed,
  contentChild,
  effect,
  inject,
  input,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { ScBackdrop } from '@semantic-components/ui';
import { ScLightboxPortal } from './lightbox-portal';
import { ScLightboxImageData } from './lightbox.types';

export const SC_LIGHTBOX_PROVIDER = new InjectionToken<ScLightboxProvider>(
  'SC_LIGHTBOX_PROVIDER',
);

@Component({
  selector: 'div[scLightboxProvider]',
  exportAs: 'scLightboxProvider',
  imports: [OverlayModule, ScBackdrop, CdkTrapFocus, NgTemplateOutlet],
  providers: [
    { provide: SC_LIGHTBOX_PROVIDER, useExisting: ScLightboxProvider },
  ],
  template: `
    <ng-content />
    <ng-template #overlayTemplate>
      <div
        scBackdrop
        [open]="isOpen()"
        (animationComplete)="onBackdropAnimationComplete()"
        class="z-0 bg-black/95"
      ></div>
      <div cdkTrapFocus [cdkTrapFocusAutoCapture]="true">
        <ng-container [ngTemplateOutlet]="lightboxPortal().templateRef" />
      </div>
    </ng-template>
  `,
  host: {
    'data-slot': 'lightbox-provider',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScLightboxProvider {
  private readonly overlay = inject(Overlay);
  private readonly viewContainerRef = inject(ViewContainerRef);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly images = input<ScLightboxImageData[]>([]);
  readonly loop = input<boolean>(true);
  readonly closeOnEscape = input<boolean>(true);

  readonly isOpen = model<boolean>(false);
  readonly currentIndex = model<number>(0);

  readonly opened = output<number>();
  readonly closed = output<void>();

  readonly zoomLevel = signal(1);
  readonly imageLoading = signal(false);

  private readonly overlayTemplate =
    viewChild.required<TemplateRef<unknown>>('overlayTemplate');

  protected readonly lightboxPortal = contentChild.required(ScLightboxPortal);

  private readonly overlayOpen = signal<boolean>(false);
  private readonly animationsCompleted = signal<number>(0);
  private overlayRef: OverlayRef | null = null;

  protected readonly class = computed(() => this.classInput());

  readonly currentImage = computed(() => {
    const images = this.images();
    const index = this.currentIndex();
    return images[index];
  });

  constructor() {
    effect(() => {
      if (this.isOpen()) {
        this.overlayOpen.set(true);
        this.animationsCompleted.set(0);
      }
    });

    effect(() => {
      const completed = this.animationsCompleted();
      if (completed >= 1 && !this.isOpen()) {
        this.overlayOpen.set(false);
        this.animationsCompleted.set(0);
      }
    });

    effect(() => {
      if (this.overlayOpen()) {
        this.attach();
      } else {
        this.detach();
      }
    });
  }

  open(index = 0): void {
    this.currentIndex.set(index);
    this.isOpen.set(true);
    this.zoomLevel.set(1);
    this.imageLoading.set(true);
    this.opened.emit(index);
  }

  close(): void {
    this.isOpen.set(false);
    this.closed.emit();
  }

  goTo(index: number): void {
    this.currentIndex.set(index);
    this.zoomLevel.set(1);
    this.imageLoading.set(true);
  }

  zoomIn(): void {
    this.zoomLevel.update((z) => Math.min(3, z + 0.25));
  }

  zoomOut(): void {
    this.zoomLevel.update((z) => Math.max(0.5, z - 0.25));
  }

  resetZoom(): void {
    this.zoomLevel.set(1);
  }

  onImageLoad(): void {
    this.imageLoading.set(false);
  }

  onBackdropAnimationComplete(): void {
    if (!this.isOpen()) {
      this.animationsCompleted.update((n) => n + 1);
    }
  }

  private getOverlayRef() {
    if (!this.overlayRef) {
      this.overlayRef = this.overlay.create({
        positionStrategy: this.overlay
          .position()
          .global()
          .centerHorizontally()
          .centerVertically(),
        hasBackdrop: true,
        backdropClass: 'cdk-overlay-transparent-backdrop',
        scrollStrategy: this.overlay.scrollStrategies.block(),
      });

      this.overlayRef.backdropClick().subscribe(() => this.close());
      this.overlayRef.keydownEvents().subscribe((event) => {
        if (event.key === 'Escape') {
          if (this.closeOnEscape()) {
            this.close();
          }
        } else if (event.key === '+' || event.key === '=') {
          this.zoomIn();
        } else if (event.key === '-') {
          this.zoomOut();
        } else if (event.key === '0') {
          this.resetZoom();
        }
      });
    }
    return this.overlayRef;
  }

  private attach(): void {
    const ref = this.getOverlayRef();
    if (!ref.hasAttached()) {
      const portal = new TemplatePortal(
        this.overlayTemplate(),
        this.viewContainerRef,
      );
      ref.attach(portal);
    }
  }

  private detach(): void {
    if (this.overlayRef?.hasAttached()) {
      this.overlayRef.detach();
    }
  }
}
