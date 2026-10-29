import {
  DestroyRef,
  Directive,
  ElementRef,
  computed,
  inject,
  input,
} from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils/cn/cn';
import { type ScButtonVariants } from '../button/button';
import { ScNavbarNext } from './navbar-next';

const HIDDEN = { sm: 'sm:hidden', md: 'md:hidden', lg: 'lg:hidden' } as const;

/**
 * Opens and closes the menu, on narrow screens. Your icons inside, and a name
 * that follows the state (`sr-only`): "Open menu" / "Close menu".
 *
 * ```html
 * <button scNavbarNextToggle>
 *   @if (navbar.open()) {
 *     <svg siXIcon></svg><span class="sr-only">Close menu</span>
 *   } @else {
 *     <svg siMenuIcon></svg><span class="sr-only">Open menu</span>
 *   }
 * </button>
 * ```
 */
@Directive({
  selector: 'button[scNavbarNextToggle]',
  host: {
    'data-slot': 'navbar-toggle',
    type: 'button',
    '[attr.aria-expanded]': 'navbar.open()',
    '[attr.aria-controls]': 'navbar.menuId',
    '[class]': 'class()',
    '(click)': 'navbar.open.set(!navbar.open())',
  },
})
export class ScNavbarNextToggle {
  private readonly buttonStyles = injectPreset().button;
  protected readonly navbar = inject(ScNavbarNext);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon');

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      '-me-2 ms-auto',
      HIDDEN[this.navbar.expand()],
      this.classInput(),
    ),
  );

  constructor() {
    this.navbar.toggle.set(inject(ElementRef).nativeElement);
    inject(DestroyRef).onDestroy(() => this.navbar.toggle.set(null));
  }
}
