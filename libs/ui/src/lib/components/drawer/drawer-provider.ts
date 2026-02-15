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
import { ScDrawerPortal } from './drawer-portal';

export type DrawerDirection = 'top' | 'right' | 'bottom' | 'left';

@Component({
  selector: 'div[sc-drawer-provider]',
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
        <ng-container [ngTemplateOutlet]="drawerPortal().templateRef" />
      </div>
    </ng-template>
  `,
  host: {
    'data-slot': 'drawer-provider',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScDrawerProvider {
  private readonly overlay = inject(Overlay);
  private readonly viewContainerRef = inject(ViewContainerRef);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly direction = input<DrawerDirection>('bottom');

  private readonly overlayTemplate =
    viewChild.required<TemplateRef<unknown>>('overlayTemplate');

  protected readonly drawerPortal = contentChild.required(ScDrawerPortal);

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
        this.attachDrawer();
      } else {
        this.detachDrawer();
      }
    });
  }

  onDrawerAnimationComplete(): void {
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

      this.overlayRef.backdropClick().subscribe(() => this.closeDrawer());
      this.overlayRef.keydownEvents().subscribe((event) => {
        if (event.key === 'Escape') this.closeDrawer();
      });
    }
    return this.overlayRef;
  }

  private attachDrawer(): void {
    const ref = this.getOverlayRef();
    if (!ref.hasAttached()) {
      const portal = new TemplatePortal(
        this.overlayTemplate(),
        this.viewContainerRef,
      );
      ref.attach(portal);
    }
  }

  private detachDrawer(): void {
    if (this.overlayRef?.hasAttached()) {
      this.overlayRef.detach();
    }
  }

  private closeDrawer(): void {
    this.open.set(false);
  }
}
