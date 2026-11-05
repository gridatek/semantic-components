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
import { useDefaultSearchTerm } from '../menu/menu-search-term';
import { injectMenuNextHighlight } from './menu-next-highlight';
import { ScMenuNextPortal } from './menu-next-portal';

export type ScMenuNextItemVariant = 'default' | 'destructive';

/**
 * An item. Holding a portal (an ng-template with scMenuNextPortal), it opens
 * a submenu: the arrow toward the reading end, or Enter, opens it.
 */
@Component({
  selector: '[scMenuNextItem]',
  providers: [{ provide: Directionality, useClass: ScElementDirectionality }],
  exportAs: 'scMenuNextItem',
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
        [cdkConnectedOverlayPositions]="positions"
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
export class ScMenuNextItem {
  private readonly styles = injectPreset().menu;
  readonly overlayOrigin = inject(CdkOverlayOrigin);
  private readonly menuItem = inject(MenuItem);
  private readonly parentMenu = inject(Menu);
  private readonly directionality = inject(Directionality);
  protected readonly highlight = injectMenuNextHighlight(
    this.menuItem as MenuItem<unknown>,
  );

  readonly classInput = input<string>('', { alias: 'class' });
  /** Destructive: in the destructive color (delete, log out). */
  readonly variant = input<ScMenuNextItemVariant>('default');
  /** Lined up with the items that have an icon or a check. */
  readonly inset = input<boolean, unknown>(false, {
    transform: booleanAttribute,
  });

  protected readonly submenuPortal = contentChild(ScMenuNextPortal);
  protected readonly submenuOpen = computed(
    () => this.parentMenu.visible() && this.menuItem.expanded() !== false,
  );

  /** Beside the item, at its reading end; at the other end if no room. */
  protected readonly positions = [
    {
      originX: 'end' as const,
      originY: 'top' as const,
      overlayX: 'start' as const,
      overlayY: 'top' as const,
      offsetX: 4,
      offsetY: -4,
    },
    {
      originX: 'start' as const,
      originY: 'top' as const,
      overlayX: 'end' as const,
      overlayY: 'top' as const,
      offsetX: -4,
      offsetY: -4,
    },
  ];

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
