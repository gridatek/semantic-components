import { Menu, MenuItem } from '@angular/aria/menu';
import { Directionality } from '@angular/cdk/bidi';
import { CdkOverlayOrigin, OverlayModule } from '@angular/cdk/overlay';
import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  contentChild,
  effect,
  inject,
  input,
  signal,
  untracked,
} from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn, setInput } from '../../utils';
import { ScElementDirectionality } from '../../utils/element-directionality';
import { injectMenuHighlight } from './menu-highlight';
import { ScMenuPortal } from './menu-portal';
import { useDefaultSearchTerm } from './menu-search-term';

/** The space between a menu and its submenu. */
const SUBMENU_GAP = 4;

export type ScMenuItemVariant = 'default' | 'destructive';

/**
 * An item. Holding a portal (an ng-template with scMenuPortal), it opens
 * a submenu: the arrow toward the reading end, or Enter, opens it.
 */
@Component({
  selector: '[scMenuItem]',
  providers: [{ provide: Directionality, useClass: ScElementDirectionality }],
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
        [cdkConnectedOverlayPositions]="positions()"
        cdkAttachPopoverAsChild
      >
        <ng-container [ngTemplateOutlet]="portal.templateRef" />
      </ng-template>
    }
  `,
  host: {
    '[class]': 'class()',
    '[attr.data-highlighted]': 'highlight.highlighted() || null',
    '[attr.data-variant]': 'variant()',
    '[attr.data-inset]': 'inset() || null',
    '(keydown)': 'keydown($event)',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScMenuItem {
  private readonly styles = injectPreset().menu;
  readonly overlayOrigin = inject(CdkOverlayOrigin);
  private readonly menuItem = inject(MenuItem);
  private readonly parentMenu = inject(Menu);
  private readonly directionality = inject(Directionality);
  protected readonly highlight = injectMenuHighlight(
    this.menuItem as MenuItem<unknown>,
  );

  readonly classInput = input<string>('', { alias: 'class' });
  /** Destructive: in the destructive color (delete, log out). */
  readonly variant = input<ScMenuItemVariant>('default');
  /** Lined up with the items that have an icon or a check. */
  readonly inset = input<boolean, unknown>(false, {
    transform: booleanAttribute,
  });

  protected readonly submenuPortal = contentChild(ScMenuPortal);
  protected readonly submenuOpen = computed(
    () => this.parentMenu.visible() && this.menuItem.expanded() !== false,
  );

  /**
   * Beside its menu, at the reading end — at the other end if there is no
   * room — a gap from the menu's edge, whatever the preset's padding. The
   * CDK mirrors start and end in right to left, not the offsets: they are
   * turned here. Measured as the submenu opens.
   */
  protected readonly positions = computed(() => {
    let [right, left] = [SUBMENU_GAP, SUBMENU_GAP];
    const rtl = this.directionality.value === 'rtl';
    if (this.submenuOpen()) {
      const item = this.menuItem.element.getBoundingClientRect();
      const menu = this.parentMenu.element.getBoundingClientRect();
      right += menu.right - item.right;
      left += item.left - menu.left;
    }
    return [
      {
        originX: 'end' as const,
        originY: 'top' as const,
        overlayX: 'start' as const,
        overlayY: 'top' as const,
        offsetX: rtl ? -left : right,
        offsetY: -4,
      },
      {
        originX: 'start' as const,
        originY: 'top' as const,
        overlayX: 'end' as const,
        overlayY: 'top' as const,
        offsetX: rtl ? right : -left,
        offsetY: -4,
      },
    ];
  });

  protected readonly class = computed(() =>
    cn(
      this.submenuPortal()
        ? [
            this.styles.subTrigger,
            // The chevron: at the end, turned right to left.
            '[&>svg:last-of-type]:ms-auto rtl:[&>svg:last-of-type]:rotate-180',
          ]
        : this.styles.item,
      this.classInput(),
    ),
  );

  /**
   * Opened by a key: its submenu's first item gets focus once it is rendered.
   * Aria moves focus on open, but the submenu exists only after that.
   */
  private readonly focusFirst = signal(false);

  constructor() {
    useDefaultSearchTerm(this.menuItem as MenuItem<unknown>);
    effect(() => {
      const menu = this.submenuPortal()?.menu();
      if (menu) setInput(this.menuItem.submenu, menu);
    });
    effect(() => {
      if (!this.focusFirst()) return;
      if (!this.submenuOpen()) return;
      const menu = this.submenuPortal()?.menu();
      if (!menu?._pattern.inputs.items().length) return;
      untracked(() => {
        menu._pattern.first();
        this.focusFirst.set(false);
      });
    });
  }

  protected keydown(event: KeyboardEvent): void {
    this.highlight.keydown(event);
    if (!this.submenuPortal() || event.defaultPrevented) return;
    // Not from an item of its submenu, rendered inside it.
    if (event.target !== this.menuItem.element) return;
    const expand =
      this.directionality.value === 'rtl' ? 'ArrowLeft' : 'ArrowRight';
    if (event.key === expand || event.key === 'Enter' || event.key === ' ') {
      this.focusFirst.set(true);
    }
  }
}
