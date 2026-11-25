import { Menu, MenuItem } from '@angular/aria/menu';
import { Directionality } from '@angular/cdk/bidi';
import {
  CdkConnectedOverlay,
  CdkOverlayOrigin,
  type ConnectedOverlayPositionChange,
  OverlayModule,
} from '@angular/cdk/overlay';
import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ViewEncapsulation,
  afterRenderEffect,
  booleanAttribute,
  computed,
  contentChild,
  effect,
  inject,
  input,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { cn } from 'cn';
import { followOverlaySize, setInput } from '../../utils';
import { injectMenuHighlight } from './menu-highlight';
import { ScMenuPortal } from './menu-portal';
import { useDefaultSearchTerm } from './menu-search-term';
import { injectMenuStyles } from './menu-styles';

/** The space between a menu and its submenu. */
const SUBMENU_GAP = 4;

export type ScMenuItemVariant = 'default' | 'destructive';

/**
 * An item. Holding a portal (an ng-template with scMenuPortal), it opens
 * a submenu: the arrow toward the reading end, or Enter, opens it.
 */
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
        [cdkConnectedOverlayPositions]="positions()"
        cdkConnectedOverlayPush
        [cdkConnectedOverlayViewportMargin]="5"
        cdkAttachPopoverAsChild
        (positionChange)="onSubmenuPosition($event)"
      >
        <!-- The gap from its menu, a margin: part of the overlay's size. -->
        <div
          [style.margin-inline-start.px]="
            submenuSide() === 'end' ? submenuGaps().end : 0
          "
          [style.margin-inline-end.px]="
            submenuSide() === 'start' ? submenuGaps().start : 0
          "
        >
          <ng-container [ngTemplateOutlet]="portal.templateRef" />
        </div>
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
  private readonly styles = injectMenuStyles();
  readonly overlayOrigin = inject(CdkOverlayOrigin);
  private readonly menuItem = inject(MenuItem);
  private readonly parentMenu = inject(Menu);
  private readonly directionality = inject(Directionality);
  private readonly highlight = injectMenuHighlight(
    this.menuItem as MenuItem<unknown>,
  );

  readonly classInput = input<string>('', { alias: 'class' });
  /** Destructive: in the destructive color (delete, log out). */
  readonly variant = input<ScMenuItemVariant>('default');
  /** Lined up with the items that have an icon or a check. */
  readonly inset = input<boolean, unknown>(false, {
    transform: booleanAttribute,
  });

  private readonly submenuPortal = contentChild(ScMenuPortal);
  private readonly submenuOpen = computed(
    () => this.parentMenu.visible() && this.menuItem.expanded() !== false,
  );

  /**
   * How far the submenu's first row is from its top (its padding and
   * border, the style's): lifted by as much, that row is level with this
   * item. Measured once the submenu is rendered.
   */
  private readonly submenuInset = signal(0);
  private readonly overlay = viewChild(CdkConnectedOverlay);

  /**
   * Its distance from this item on each side — past the menu's edge (the
   * style's padding) and a gap: toward the reading end, and toward the
   * start. Measured as the submenu opens.
   */
  private readonly submenuGaps = computed(() => {
    let [right, left] = [SUBMENU_GAP, SUBMENU_GAP];
    if (this.submenuOpen()) {
      const item = this.menuItem.element.getBoundingClientRect();
      const menu = this.parentMenu.element.getBoundingClientRect();
      right += menu.right - item.right;
      left += item.left - menu.left;
    }
    return this.directionality.value === 'rtl'
      ? { end: left, start: right }
      : { end: right, start: left };
  });

  /** The side the CDK put it on: the reading end, or the start (no room). */
  private readonly submenuSide = signal<'end' | 'start'>('end');

  /**
   * Beside its menu, at the reading end — at the other end if there is no
   * room. The gap is a margin on its side facing the menu, not an offset:
   * the CDK pushes an overlay onto the screen without its offsets, then adds
   * them (angular/components#23503) — a submenu pushed in on a phone went
   * past the edge by its gap. Lifted by its inset (an offset: up, away from
   * the bottom it is pushed from), its first row level with this item.
   */
  private readonly positions = computed(() => [
    {
      originX: 'end' as const,
      originY: 'top' as const,
      overlayX: 'start' as const,
      overlayY: 'top' as const,
      offsetY: -this.submenuInset(),
    },
    {
      originX: 'start' as const,
      originY: 'top' as const,
      overlayX: 'end' as const,
      overlayY: 'top' as const,
      offsetY: -this.submenuInset(),
    },
  ]);

  private readonly class = computed(() =>
    cn(
      this.submenuPortal() ? this.styles().subTrigger : this.styles().item,
      this.classInput(),
    ),
  );

  /**
   * Opened by a key: its submenu's first item gets focus once it is rendered.
   * Aria moves focus on open, but the submenu exists only after that.
   */
  private readonly focusFirst = signal(false);

  constructor() {
    // Its items render after it opens: placed again as it grows (the flip).
    followOverlaySize(this.overlay, this.submenuOpen);
    useDefaultSearchTerm(this.menuItem as MenuItem<unknown>);
    this.measureSubmenu();
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

  private measureSubmenu(): void {
    afterRenderEffect({
      read: () => {
        if (!this.submenuOpen()) return;
        const element = this.submenuPortal()?.menu()?.element;
        if (!element) return;
        const style = getComputedStyle(element);
        const inset =
          parseFloat(style.paddingTop) + parseFloat(style.borderTopWidth);
        if (inset === untracked(this.submenuInset)) return;
        this.submenuInset.set(inset);
        // The CDK takes new positions, but places by them on its next update.
        queueMicrotask(() => this.overlay()?.overlayRef?.updatePosition());
      },
    });
  }

  private onSubmenuPosition(change: ConnectedOverlayPositionChange): void {
    this.submenuSide.set(
      change.connectionPair.overlayX === 'start' ? 'end' : 'start',
    );
  }

  private keydown(event: KeyboardEvent): void {
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
