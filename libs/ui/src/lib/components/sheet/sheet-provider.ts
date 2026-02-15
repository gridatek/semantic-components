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
import { ScSheetPortal } from './sheet-portal';

export type SheetSide = 'top' | 'right' | 'bottom' | 'left';

@Component({
  selector: 'div[sc-sheet-provider]',
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
        <ng-container [ngTemplateOutlet]="sheetPortal().templateRef" />
      </div>
    </ng-template>
  `,
  host: {
    'data-slot': 'sheet-provider',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScSheetProvider {
  private readonly overlay = inject(Overlay);
  private readonly viewContainerRef = inject(ViewContainerRef);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly side = input<SheetSide>('right');

  private readonly overlayTemplate =
    viewChild.required<TemplateRef<unknown>>('overlayTemplate');

  protected readonly sheetPortal = contentChild.required(ScSheetPortal);

  readonly open = model<boolean>(false);
  readonly overlayOpen = signal<boolean>(false);
  private readonly animationsCompleted = signal<number>(0);
  private overlayRef: OverlayRef | null = null;

  protected readonly class = computed(() => cn('contents', this.classInput()));

  constructor() {
    effect(() => {
      if (this.open()) {
        this.overlayOpen.set(true);
        this.animationsCompleted.set(0);
      }
    });

    effect(() => {
      const completed = this.animationsCompleted();
      if (completed === 2 && !this.open()) {
        this.overlayOpen.set(false);
        this.animationsCompleted.set(0);
      }
    });

    effect(() => {
      if (this.overlayOpen()) {
        this.attachSheet();
      } else {
        this.detachSheet();
      }
    });
  }

  onSheetAnimationComplete(): void {
    if (!this.open()) {
      this.animationsCompleted.update((n) => n + 1);
    }
  }

  onBackdropAnimationComplete(): void {
    if (!this.open()) {
      this.animationsCompleted.update((n) => n + 1);
    }
  }

  private getOverlayRef() {
    if (!this.overlayRef) {
      this.overlayRef = this.overlay.create({
        positionStrategy: this.overlay.position().global(),
        hasBackdrop: true,
        backdropClass: 'cdk-overlay-transparent-backdrop',
        scrollStrategy: this.overlay.scrollStrategies.block(),
      });

      this.overlayRef.backdropClick().subscribe(() => this.closeSheet());
      this.overlayRef.keydownEvents().subscribe((event) => {
        if (event.key === 'Escape') this.closeSheet();
      });
    }
    return this.overlayRef;
  }

  private attachSheet(): void {
    const ref = this.getOverlayRef();
    if (!ref.hasAttached()) {
      const portal = new TemplatePortal(
        this.overlayTemplate(),
        this.viewContainerRef,
      );
      ref.attach(portal);
    }
  }

  private detachSheet(): void {
    if (this.overlayRef?.hasAttached()) {
      this.overlayRef.detach();
    }
  }

  private closeSheet(): void {
    this.open.set(false);
  }
}
