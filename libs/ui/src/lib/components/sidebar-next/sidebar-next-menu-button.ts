import {
  Directive,
  booleanAttribute,
  computed,
  inject,
  input,
} from '@angular/core';
import type {
  ScSidebarMenuButtonSize,
  ScSidebarMenuButtonVariant,
} from '@semantic-components/presets';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import { ScSidebarNextMenuTooltip } from './sidebar-next-menu-tooltip';
import { ScSidebarNextState } from './sidebar-next-state';

/**
 * A menu item's button or link: your icon, then its text (in a `span`, kept
 * as its name when collapsed to icons). `active` for the page shown
 * (`aria-current="page"`). `tooltip`: its label, shown beside it (in the
 * Tooltip's look) only while collapsed to icons. On phones, following a link closes the sheet.
 */
@Directive({
  selector: 'a[scSidebarNextMenuButton], button[scSidebarNextMenuButton]',
  hostDirectives: [
    {
      directive: ScSidebarNextMenuTooltip,
      inputs: ['tooltip'],
    },
  ],
  host: {
    'data-slot': 'sidebar-menu-button',
    '[attr.data-active]': 'active() ? "" : null',
    '[attr.aria-current]': 'active() ? "page" : null',
    '[attr.data-size]': 'size()',
    '[class]': 'class()',
    '(click)': 'onClick($event)',
  },
})
export class ScSidebarNextMenuButton {
  private readonly styles = injectPreset().sidebar;
  private readonly state = inject(ScSidebarNextState, { optional: true });

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScSidebarMenuButtonVariant>('default');
  readonly size = input<ScSidebarMenuButtonSize>('default');
  /** The page shown. */
  readonly active = input(false, { transform: booleanAttribute });

  protected readonly class = computed(() =>
    cn(
      this.styles.menuButton({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  protected onClick(event: Event): void {
    // A link followed on a phone: the sheet goes.
    if (
      this.state?.isMobile() &&
      (event.currentTarget as HTMLElement).tagName === 'A'
    )
      this.state.openMobile.set(false);
  }
}
