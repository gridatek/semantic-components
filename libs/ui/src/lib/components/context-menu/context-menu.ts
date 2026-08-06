import { OverlayModule } from '@angular/cdk/overlay';
import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ViewEncapsulation,
  computed,
  contentChild,
  effect,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { SIGNAL, signalSetFn } from '@angular/core/primitives/signals';
import { buildOverlayPositionsWithFallback, cn } from '../../utils';
import { ScMenuPortal } from '../menu/menu-portal';
import { ScMenuTrigger } from '../menu/menu-trigger';

@Component({
  selector: 'div[scContextMenu]',
  imports: [OverlayModule, NgTemplateOutlet, ScMenuTrigger],
  template: `
    <ng-content />

    <!--
      The overlay anchors to this element rather than to the pointer itself, so
      the CDK still handles flipping and clamping near the viewport edges.
      Moving it is all that positions the menu.
    -->
    <div
      scMenuTrigger
      class="pointer-events-none invisible fixed"
      [style.left.px]="position().x"
      [style.top.px]="position().y"
    ></div>

    @if (origin(); as origin) {
      @if (menuPortal(); as portal) {
        <ng-template
          [cdkConnectedOverlayOpen]="expanded()"
          [cdkConnectedOverlay]="{
            origin,
            usePopover: 'inline',
            hasBackdrop: true,
            backdropClass: 'cdk-overlay-transparent-backdrop',
          }"
          [cdkConnectedOverlayPositions]="positions()"
          (backdropClick)="close()"
          (overlayKeydown)="onOverlayKeydown($event)"
          cdkAttachPopoverAsChild
        >
          <ng-container [ngTemplateOutlet]="portal.templateRef" />
        </ng-template>
      }
    }
  `,
  host: {
    'data-slot': 'context-menu',
    '[class]': 'class()',
    '(contextmenu)': 'onContextMenu($event)',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScContextMenu {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly cursorTrigger = viewChild(ScMenuTrigger);
  protected readonly menuPortal = contentChild(ScMenuPortal);

  /** Viewport coordinates of the last right-click. */
  protected readonly position = signal({ x: 0, y: 0 });

  protected readonly origin = computed(
    () => this.cursorTrigger()?.overlayOrigin,
  );

  protected readonly expanded = computed(
    () => this.cursorTrigger()?.trigger?.expanded() ?? false,
  );

  protected readonly positions = computed(() =>
    buildOverlayPositionsWithFallback('bottom', 'start', 0),
  );

  protected readonly class = computed(() => cn('block', this.classInput()));

  constructor() {
    // Same wiring ScMenuProvider does: hand the portal's menu to the trigger.
    effect(() => {
      const trigger = this.cursorTrigger()?.trigger;
      const menu = this.menuPortal()?.menu();
      if (trigger && menu) {
        signalSetFn(trigger.menu[SIGNAL], menu);
      }
    });
  }

  protected onContextMenu(event: MouseEvent): void {
    event.preventDefault();
    this.position.set({ x: event.clientX, y: event.clientY });
    this.cursorTrigger()?.trigger?.open();
  }

  protected onOverlayKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  protected close(): void {
    const trigger = this.cursorTrigger()?.trigger;
    if (trigger?.expanded()) {
      trigger.close();
    }
  }
}
