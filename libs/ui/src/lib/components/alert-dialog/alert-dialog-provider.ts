import { Overlay, OverlayModule, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  TemplateRef,
  ViewContainerRef,
  ViewEncapsulation,
  computed,
  contentChild,
  effect,
  inject,
  input,
  model,
  viewChild,
} from '@angular/core';
import { ScFocusTrap } from '../../utilities';
import { cn } from '../../utils';
import { ScBackdrop } from '../backdrop';
import { ScAlertDialogPortal } from './alert-dialog-portal';

@Component({
  selector: 'div[scAlertDialogProvider]',
  imports: [OverlayModule, ScBackdrop, ScFocusTrap, NgTemplateOutlet],
  template: `
    <ng-content />
    <ng-template #overlayTemplate>
      <div scBackdrop></div>
      <div scFocusTrap>
        <ng-container [ngTemplateOutlet]="alertDialogPortal().templateRef" />
      </div>
    </ng-template>
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScAlertDialogProvider {
  private readonly overlay = inject(Overlay);
  private readonly viewContainerRef = inject(ViewContainerRef);

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly overlayTemplate =
    viewChild.required<TemplateRef<unknown>>('overlayTemplate');

  protected readonly alertDialogPortal =
    contentChild.required(ScAlertDialogPortal);

  /** Shown or not; the dialog and backdrop animate in and out (`animate.enter` / `animate.leave`). */
  readonly open = model<boolean>(false);
  private overlayRef: OverlayRef | null = null;

  protected readonly class = computed(() => cn('contents', this.classInput()));

  constructor() {
    // Detached on close: Angular keeps the parts until they've animated out.
    effect(() => {
      if (this.open()) {
        this.attachDialog();
      } else {
        this.detachDialog();
      }
    });
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
}
