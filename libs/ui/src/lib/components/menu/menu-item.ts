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
import { Menu, MenuItem } from '@angular/aria/menu';
import { SIGNAL, signalSetFn } from '@angular/core/primitives/signals';
import { ScMenuPortal } from './menu-portal';
import { cn } from '../../utils';

@Component({
  selector: '[scMenuItem]',
  exportAs: 'scMenuItem',
  imports: [OverlayModule, NgTemplateOutlet],
  hostDirectives: [
    {
      directive: MenuItem,
      inputs: ['id', 'value', 'disabled', 'searchTerm'],
      outputs: ['searchTermChange'],
    },
    CdkOverlayOrigin,
  ],
  template: `
    <ng-content />

    @if (submenuPortal(); as portal) {
      <ng-template
        [cdkConnectedOverlayOpen]="submenuOpen()"
        [cdkConnectedOverlay]="{ origin: overlayOrigin, usePopover: 'inline' }"
        [cdkConnectedOverlayPositions]="[
          {
            originX: 'end',
            originY: 'top',
            overlayY: 'top',
            overlayX: 'start',
            offsetX: 6,
          },
        ]"
        cdkAttachPopoverAsChild
      >
        <ng-container [ngTemplateOutlet]="portal.templateRef" />
      </ng-template>
    }
  `,
  host: {
    'data-slot': 'menu-item',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScMenuItem {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly overlayOrigin = inject(CdkOverlayOrigin);
  private readonly menuItem = inject(MenuItem);
  private readonly parentMenu = inject(Menu);
  protected readonly submenuOpen = computed(() => this.parentMenu.visible());
  protected readonly submenuPortal = contentChild(ScMenuPortal);

  protected readonly class = computed(() =>
    cn(
      'data-[active=true]:bg-accent data-[active=true]:text-accent-foreground gap-1.5 rounded-md px-1.5 py-1 text-sm relative flex cursor-default items-center outline-hidden select-none focus-visible:outline-2 focus-visible:outline-ring',
      this.classInput(),
    ),
  );

  constructor() {
    // Auto-connect submenu when ScMenu registers itself with the portal
    effect(() => {
      const menu = this.submenuPortal()?.menu();
      if (menu) {
        signalSetFn(this.menuItem.submenu[SIGNAL], menu);
      }
    });
  }
}
