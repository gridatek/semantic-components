import {
  Component,
  ElementRef,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import {
  type ScButtonVariants,
  cn,
  injectPreset,
} from '@semantic-components/ui';
import { ScNavbarProvider } from './navbar-provider';

@Component({
  selector: 'button[scNavbarMobileTrigger]',
  exportAs: 'scNavbarMobileTrigger',
  template: ` <ng-content /> `,
  host: {
    type: 'button',
    '[class]': 'class()',
    '[attr.aria-expanded]': 'isMobileMenuOpen()',
    '[attr.aria-controls]': 'provider.menuId',
    '(click)': 'toggleMenu()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScNavbarMobileTrigger {
  private readonly buttonStyles = injectPreset().button;

  readonly provider = inject(ScNavbarProvider);
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-lg');

  readonly isMobileMenuOpen = this.provider.open;

  constructor() {
    this.provider.trigger.set(inject(ElementRef));
  }

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      'md:hidden',
      this.classInput(),
    ),
  );

  toggleMenu(): void {
    this.provider.open.update((open) => !open);
  }
}
