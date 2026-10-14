import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { ScFocusTrap, cn } from '@semantic-components/ui';
import { ScNavbarProvider } from './navbar-provider';

/**
 * The mobile menu (in a `scNavbarMobilePortal` template): slides in when
 * shown and out when it goes (`animate.enter` / `animate.leave`); keeps
 * focus inside while open.
 */
@Component({
  selector: 'div[scNavbarMobileMenu]',
  hostDirectives: [ScFocusTrap],
  template: ` <ng-content /> `,
  host: {
    '[id]': 'provider.menuId',
    role: 'navigation',
    '[attr.aria-label]': '"Mobile navigation"',
    '[class]': 'class()',
    '[tabindex]': '-1',
    'animate.enter': 'animate-in fade-in-0',
    'animate.leave': 'animate-out fade-out-0',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScNavbarMobileMenu {
  protected readonly provider = inject(ScNavbarProvider);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'md:hidden',
      'fixed inset-x-0 top-[calc(var(--navbar-height,57px))] bottom-0',
      'z-50',
      'flex flex-col gap-2 p-6',
      'bg-background border-t border-border',
      // Where it slides from and to (read by the enter / leave animations)
      'slide-in-from-top slide-out-to-top duration-300',
      this.classInput(),
    ),
  );
}
