import { MenuItem } from '@angular/aria/menu';
import {
  CdkConnectedOverlay,
  CdkOverlayOrigin,
  OverlayModule,
} from '@angular/cdk/overlay';
import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ViewEncapsulation,
  computed,
  contentChild,
  effect,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { cn, setInput } from '../../utils';
import { ScMenuPortal } from '../menu';
import { useDefaultSearchTerm } from '../menu/menu-search-term';
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
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScMenuBarItem {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly overlayOrigin = inject(CdkOverlayOrigin);
  private readonly menuItem = inject(MenuItem);
  protected readonly submenuPortal = contentChild(ScMenuPortal);
  private readonly connectedOverlay = viewChild(CdkConnectedOverlay);

  private readonly scMenuBar = inject(ScMenuBar);

  protected readonly rendered = computed(() => this.scMenuBar.rendered());

  protected readonly class = computed(() =>
    cn(
      'flex items-center rounded-sm px-1.5 py-0.5 text-sm font-medium outline-hidden select-none cursor-default hover:bg-muted aria-expanded:bg-muted focus-visible:outline-2 focus-visible:outline-ring',
      this.classInput(),
    ),
  );

  constructor() {
    useDefaultSearchTerm(this.menuItem as MenuItem<unknown>);

    effect(() => {
      const menu = this.submenuPortal()?.menu();
      if (menu) {
        setInput(this.menuItem.submenu, menu);
      }
    });

    // Force overlay to recalculate position when menu item expands
    effect(() => {
      const expanded = this.menuItem.expanded();
      if (expanded) {
        this.connectedOverlay()?.overlayRef?.updatePosition();
      }
    });
  }
}
