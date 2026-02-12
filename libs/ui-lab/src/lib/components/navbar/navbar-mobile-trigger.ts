import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { ScNavbarProvider } from './navbar-provider';

@Component({
  selector: 'button[sc-navbar-mobile-trigger]',
  exportAs: 'scNavbarMobileTrigger',
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'navbar-mobile-trigger',
    type: 'button',
    '[class]': 'class()',
    '[attr.aria-expanded]': 'isMobileMenuOpen()',
    '[attr.aria-controls]': '"navbar-mobile-menu"',
    '(click)': 'toggleMenu()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScNavbarMobileTrigger {
  readonly provider = inject(ScNavbarProvider);
  readonly classInput = input<string>('', { alias: 'class' });

  readonly isMobileMenuOpen = this.provider.open;

  protected readonly class = computed(() =>
    cn(
      'inline-flex items-center justify-center gap-2',
      'md:hidden',
      'size-10 rounded-md',
      'text-foreground',
      'hover:bg-accent hover:text-accent-foreground',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      '[&_svg]:pointer-events-none [&_svg]:size-6 [&_svg]:shrink-0',
      this.classInput(),
    ),
  );

  toggleMenu(): void {
    this.provider.open.update((open) => !open);
  }
}
