import { MenuItem } from '@angular/aria/menu';
import { Directionality } from '@angular/cdk/bidi';
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
import { injectPreset } from '../../config/preset';
import { cn, setInput } from '../../utils';
import { ScElementDirectionality } from '../../utils/element-directionality';
import { ScMenuPortal } from '../menu';
import { useDefaultSearchTerm } from '../menu/menu-search-term';
import { ScMenubar } from './menubar';

@Component({
  selector: '[scMenubarItem]',
  providers: [{ provide: Directionality, useClass: ScElementDirectionality }],
  exportAs: 'scMenubarItem',
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
        [cdkConnectedOverlayPositions]="positions()"
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
export class ScMenubarItem {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly overlayOrigin = inject(CdkOverlayOrigin);
  private readonly menuItem = inject(MenuItem);
  protected readonly submenuPortal = contentChild(ScMenuPortal);
  private readonly connectedOverlay = viewChild(CdkConnectedOverlay);

  private readonly scMenubar = inject(ScMenubar);
  private readonly styles = injectPreset().menubar;
  private readonly directionality = inject(Directionality);

  /**
   * Below the item, 8px down and 4px toward the start (shadcn's menubar);
   * above it if there is no room. The CDK mirrors start and end right to
   * left, not the offsets: turned here, read as the menu opens.
   */
  protected readonly positions = computed(() => {
    this.menuItem.expanded();
    const offsetX = this.directionality.value === 'rtl' ? 4 : -4;
    return [
      {
        originX: 'start' as const,
        originY: 'bottom' as const,
        overlayX: 'start' as const,
        overlayY: 'top' as const,
        offsetX,
        offsetY: 8,
      },
      {
        originX: 'start' as const,
        originY: 'top' as const,
        overlayX: 'start' as const,
        overlayY: 'bottom' as const,
        offsetX,
        offsetY: -8,
      },
    ];
  });

  protected readonly rendered = computed(() => this.scMenubar.rendered());

  protected readonly class = computed(() =>
    cn(
      this.styles.trigger,
      // shadcn's has none: a keyboard user sees where focus is.
      'focus-visible:outline-2 focus-visible:outline-ring',
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
