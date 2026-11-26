import {
  DestroyRef,
  Directive,
  ElementRef,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ɵfocusOnPress } from '../../utils';
import { type ScButtonVariants } from '../button/button';
import { ScHeader } from './header';

/**
 * Opens and closes the mobile menu (the header shows it only below `expand`,
 * wherever it sits in the bar). Your icons inside, and a name
 * that follows the state (`sr-only`): "Open menu" / "Close menu". Where it
 * sits is yours: e.g.
 * `ms-auto` to reach the bar's end, `-me-2` to line its icon up with the edge.
 *
 * ```html
 * <button scHeaderMobileMenuToggle>
 *   @if (header.mobileMenuOpen()) {
 *     <svg siXIcon></svg><span class="sr-only">Close menu</span>
 *   } @else {
 *     <svg siMenuIcon></svg><span class="sr-only">Open menu</span>
 *   }
 * </button>
 * ```
 */
@Directive({
  selector: 'button[scHeaderMobileMenuToggle]',
  host: {
    'data-slot': 'header-mobile-menu-toggle',
    type: 'button',
    '[attr.aria-expanded]': 'header.mobileMenuOpen()',
    // The panel exists only while open: nothing to control otherwise.
    '[attr.aria-controls]': 'header.mobileMenuOpen() ? header.menuId : null',
    '[class]': 'class()',
    '(click)': 'toggle()',
  },
})
export class ScHeaderMobileMenuToggle {
  private readonly buttonStyles = injectStyle().button;
  private readonly header = inject(ScHeader);
  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon');

  private readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  private toggle(): void {
    // Focused, so the keys reach the header (Escape closes the menu) and
    // focus goes back to it: WebKit leaves it on the page.
    ɵfocusOnPress(this.element);
    this.header.mobileMenuOpen.set(!this.header.mobileMenuOpen());
  }

  constructor() {
    this.header.toggle.set(this.element);
    inject(DestroyRef).onDestroy(() => this.header.toggle.set(null));
  }
}
