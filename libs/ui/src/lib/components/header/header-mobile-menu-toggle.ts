import {
  DestroyRef,
  Directive,
  ElementRef,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { type ScButtonVariants } from '../button/button';
import { ScHeader } from './header';

/**
 * Opens and closes the mobile menu (the header shows it only below `expand`,
 * wherever it sits in the bar). Your icons inside, and a name
 * that follows the state (`sr-only`): "Open menu" / "Close menu". Once it's
 * been pressed, the icon that comes in turns and fades in (100ms; not with
 * reduced motion) — not on the first paint. Where it sits is yours: e.g.
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

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon');

  /** Pressed once: from then on, the icons swapped in animate. */
  private readonly pressed = signal(false);

  private readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      // The icon your @if puts in (Menu ↔ X) turns 45°, grows and fades in.
      this.pressed() &&
        '[&_svg]:animate-in [&_svg]:fade-in-0 [&_svg]:zoom-in-75 [&_svg]:spin-in-45 [&_svg]:duration-100 motion-reduce:[&_svg]:animate-none',
      this.classInput(),
    ),
  );

  private toggle(): void {
    this.pressed.set(true);
    this.header.mobileMenuOpen.set(!this.header.mobileMenuOpen());
  }

  constructor() {
    this.header.toggle.set(inject(ElementRef).nativeElement);
    inject(DestroyRef).onDestroy(() => this.header.toggle.set(null));
  }
}
