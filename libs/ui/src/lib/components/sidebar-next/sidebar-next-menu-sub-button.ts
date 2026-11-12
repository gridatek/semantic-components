import {
  Directive,
  booleanAttribute,
  computed,
  inject,
  input,
} from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import { ScSidebarNextState } from './sidebar-next-state';

/**
 * A sub-menu's link (or button). `active` for the page shown
 * (`aria-current="page"`). On phones, following a link closes the sheet.
 */
@Directive({
  selector: 'a[scSidebarNextMenuSubButton], button[scSidebarNextMenuSubButton]',
  host: {
    'data-slot': 'sidebar-menu-sub-button',
    '[attr.data-active]': 'active() ? "" : null',
    '[attr.aria-current]': 'active() ? "page" : null',
    '[attr.data-size]': 'size()',
    '[class]': 'class()',
    '(click)': 'onClick($event)',
  },
})
export class ScSidebarNextMenuSubButton {
  private readonly styles = injectPreset().sidebar;
  private readonly state = inject(ScSidebarNextState, { optional: true });

  readonly classInput = input<string>('', { alias: 'class' });
  readonly size = input<'sm' | 'md'>('md');
  /** The page shown. */
  readonly active = input(false, { transform: booleanAttribute });

  protected readonly class = computed(() =>
    cn(this.styles.menuSubButton, this.classInput()),
  );

  protected onClick(event: Event): void {
    if (
      this.state?.isMobile() &&
      (event.currentTarget as HTMLElement).tagName === 'A'
    )
      this.state.openMobile.set(false);
  }
}
