import {
  Directive,
  booleanAttribute,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ScSidebarState } from './sidebar-state';

/**
 * A sub-menu's link (or button). `active` for the page shown
 * (`aria-current="page"`). On phones, following a link closes the sheet.
 */
@Directive({
  selector: 'a[scSidebarMenuSubButton], button[scSidebarMenuSubButton]',
  host: {
    'data-slot': 'sidebar-menu-sub-button',
    '[attr.data-active]': 'active() ? "" : null',
    '[attr.aria-current]': 'active() ? "page" : null',
    '[attr.data-size]': 'size()',
    '[class]': 'class()',
    '(click)': 'onClick($event)',
  },
})
export class ScSidebarMenuSubButton {
  private readonly styles = injectStyle().sidebar;
  private readonly state = inject(ScSidebarState, { optional: true });

  readonly classInput = input<string>('', { alias: 'class' });
  readonly size = input<'sm' | 'md'>('md');
  /** The page shown. */
  readonly active = input(false, { transform: booleanAttribute });

  private readonly class = computed(() =>
    cn(this.styles.menuSubButton, this.classInput()),
  );

  private onClick(event: Event): void {
    if (
      this.state?.isMobile() &&
      (event.currentTarget as HTMLElement).tagName === 'A'
    )
      this.state.openMobile.set(false);
  }
}
