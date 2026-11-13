import { Overlay, OverlayModule, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  DestroyRef,
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
import { cn } from 'cn';
import { ScFocusTrap } from '../../utilities';
import { ScBackdrop } from '../backdrop';
import { ScAlertDialogPortal } from './alert-dialog-portal';

@Component({
  selector: 'div[scAlertDialogProvider], span[scAlertDialogProvider]',
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
    inject(DestroyRef).onDestroy(() => this.overlayRef?.dispose());
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
      // Escape closes it (a click outside doesn't: an alert dialog wants an
      // answer). Focus goes back where it was (the focus trap).
      this.overlayRef.keydownEvents().subscribe((event) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          this.open.set(false);
        }
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
