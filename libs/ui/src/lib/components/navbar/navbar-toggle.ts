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
import { ScNavbar } from './navbar';

const HIDDEN = { sm: 'sm:hidden', md: 'md:hidden', lg: 'lg:hidden' } as const;

/**
 * Opens and closes the menu, on narrow screens. Your icons inside, and a name
 * that follows the state (`sr-only`): "Open menu" / "Close menu". Once it's
 * been pressed, the icon that comes in turns and fades in (100ms; not with
 * reduced motion) — not on the first paint.
 *
 * ```html
 * <button scNavbarToggle>
 *   @if (navbar.open()) {
 *     <svg siXIcon></svg><span class="sr-only">Close menu</span>
 *   } @else {
 *     <svg siMenuIcon></svg><span class="sr-only">Open menu</span>
 *   }
 * </button>
 * ```
 */
@Directive({
  selector: 'button[scNavbarToggle]',
  host: {
    'data-slot': 'navbar-toggle',
    type: 'button',
    '[attr.aria-expanded]': 'navbar.open()',
    '[attr.aria-controls]': 'navbar.menuId',
    '[class]': 'class()',
    '(click)': 'toggle()',
  },
})
export class ScNavbarToggle {
  private readonly buttonStyles = injectStyle().button;
  private readonly navbar = inject(ScNavbar);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon');

  /** Pressed once: from then on, the icons swapped in animate. */
  private readonly pressed = signal(false);

  private readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      '-me-2 ms-auto',
      // The icon your @if puts in (Menu ↔ X) turns 45°, grows and fades in.
      this.pressed() &&
        '[&_svg]:animate-in [&_svg]:fade-in-0 [&_svg]:zoom-in-75 [&_svg]:spin-in-45 [&_svg]:duration-100 motion-reduce:[&_svg]:animate-none',
      HIDDEN[this.navbar.expand()],
      this.classInput(),
    ),
  );

  private toggle(): void {
    this.pressed.set(true);
    this.navbar.open.set(!this.navbar.open());
  }

  constructor() {
    this.navbar.toggle.set(inject(ElementRef).nativeElement);
    inject(DestroyRef).onDestroy(() => this.navbar.toggle.set(null));
  }
}
