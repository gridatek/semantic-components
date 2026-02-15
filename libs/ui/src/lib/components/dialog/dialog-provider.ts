import { NgTemplateOutlet } from '@angular/common';
import { CdkTrapFocus } from '@angular/cdk/a11y';
import { Overlay, OverlayModule, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  effect,
  inject,
  input,
  model,
  signal,
  TemplateRef,
  viewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { ScBackdrop } from '../backdrop';
import { ScDialogPortal } from './dialog-portal';

@Component({
  selector: 'div[sc-dialog-provider]',
  imports: [OverlayModule, ScBackdrop, CdkTrapFocus, NgTemplateOutlet],
  template: `
    <ng-content />
    <ng-template #overlayTemplate>
      <div
        sc-backdrop
        [open]="open()"
        (animationComplete)="onBackdropAnimationComplete()"
      ></div>
      <div cdkTrapFocus [cdkTrapFocusAutoCapture]="true">
        <ng-container [ngTemplateOutlet]="dialogPortal().templateRef" />
      </div>
    </ng-template>
  `,
  host: {
    'data-slot': 'dialog-provider',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScDialogProvider {
  private readonly overlay = inject(Overlay);
  private readonly viewContainerRef = inject(ViewContainerRef);

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly overlayTemplate =
    viewChild.required<TemplateRef<unknown>>('overlayTemplate');

  protected readonly dialogPortal = contentChild.required(ScDialogPortal);

  /**
   * Logical state: Controls animation state (open/closed)
   * - When true: Triggers entry animation
   * - When false: Triggers exit animation
   */
  readonly open = model<boolean>(false);

  /**
   * Physical state: Controls DOM presence
   * - When true: Content exists in DOM (can animate)
   * - When false: Content removed from DOM
   * - Stays true during close animation to allow it to complete
   */
  readonly overlayOpen = signal<boolean>(false);

  /**
   * Tracks how many animations have completed during close sequence
   * Target: 2 (dialog + backdrop)
   */
  private readonly animationsCompleted = signal<number>(0);

  private overlayRef: OverlayRef | null = null;

  protected readonly class = computed(() => cn('contents', this.classInput()));

  constructor() {
    // Synchronize overlay state with logical state for opening
    effect(() => {
      if (this.open()) {
        // Opening: Mount DOM immediately so animation can start
        this.overlayOpen.set(true);
        // Reset counter when opening for next close cycle
        this.animationsCompleted.set(0);
      }
      // Note: When closing (open = false), overlayOpen stays true
      // until both animations complete (handled by animation completion methods)
    });

    // Close overlay when both animations complete
    effect(() => {
      const completed = this.animationsCompleted();
      if (completed === 2 && !this.open()) {
        this.overlayOpen.set(false);
        // Reset for next cycle
        this.animationsCompleted.set(0);
      }
    });

    // Attach/detach CDK overlay based on overlayOpen state
    effect(() => {
      if (this.overlayOpen()) {
        this.attachDialog();
      } else {
        this.detachDialog();
      }
    });
  }

  /**
   * Called by dialog when its close animation completes
   */
  onDialogAnimationComplete(): void {
    if (!this.open()) {
      this.animationsCompleted.update((n) => n + 1);
    }
  }

  /**
   * Called when backdrop close animation completes
   */
  onBackdropAnimationComplete(): void {
    if (!this.open()) {
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

      this.overlayRef.backdropClick().subscribe(() => this.closeDialog());
      this.overlayRef.keydownEvents().subscribe((event) => {
        if (event.key === 'Escape') this.closeDialog();
      });
    }
    return this.overlayRef;
  }

  private attachDialog(): void {
    const ref = this.getOverlayRef();
    if (!ref.hasAttached()) {
      const portal = new TemplatePortal(
        this.overlayTemplate(),
        this.viewContainerRef,
      );
      ref.attach(portal);
    }
  }

  private detachDialog(): void {
    if (this.overlayRef?.hasAttached()) {
      this.overlayRef.detach();
    }
  }

  private closeDialog(): void {
    this.open.set(false);
  }
}
