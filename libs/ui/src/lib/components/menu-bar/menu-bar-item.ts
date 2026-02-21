import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  effect,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { CdkOverlayOrigin, OverlayModule } from '@angular/cdk/overlay';
import { MenuItem } from '@angular/aria/menu';
import { SIGNAL, signalSetFn } from '@angular/core/primitives/signals';
import { cn } from '../../utils';
import { ScMenuPortal } from '../menu';
import { ScMenuBar } from './menu-bar';

@Component({
  selector: '[scMenuBarItem]',
  exportAs: 'scMenuBarItem',
  imports: [OverlayModule, NgTemplateOutlet],
  hostDirectives: [
    {
      directive: MenuItem,
      inputs: ['id', 'value', 'disabled'],
    },
    CdkOverlayOrigin,
  ],
  template: `
    <ng-content />

    @if (submenuPortal(); as portal) {
      <ng-template
        [cdkConnectedOverlayOpen]="rendered()"
        [cdkConnectedOverlay]="{ origin: overlayOrigin, usePopover: 'inline' }"
        [cdkConnectedOverlayPositions]="[
          {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top',
            offsetY: 4,
          },
        ]"
        cdkAttachPopoverAsChild
      >
        <ng-container [ngTemplateOutlet]="portal.templateRef" />
      </ng-template>
    }
  `,
  host: {
    'data-slot': 'menu-bar-item',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScMenuBarItem {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly overlayOrigin = inject(CdkOverlayOrigin);
  private readonly menuItem = inject(MenuItem);
  protected readonly submenuOpen = computed(() => !!this.menuItem.expanded());
  protected readonly submenuPortal = contentChild(ScMenuPortal);

  private readonly scMenuBar = inject(ScMenuBar);

  protected readonly rendered = computed(() => this.scMenuBar.rendered());

  protected readonly class = computed(() =>
    cn(
      'flex items-center rounded-sm px-2 py-0.5 text-sm font-medium outline-hidden select-none cursor-default hover:bg-muted aria-expanded:bg-muted focus-visible:outline-2 focus-visible:outline-ring',
      this.classInput(),
    ),
  );

  constructor() {
    effect(() => {
      const menu = this.submenuPortal()?.menu();
      if (menu) {
        signalSetFn(this.menuItem.submenu[SIGNAL], menu);
      }
    });
  }
}
