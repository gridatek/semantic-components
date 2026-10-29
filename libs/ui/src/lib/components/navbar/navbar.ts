import { _IdGenerator } from '@angular/cdk/a11y';
import {
  DestroyRef,
  Directive,
  ElementRef,
  afterNextRender,
  booleanAttribute,
  computed,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { cn } from '../../utils/cn/cn';

/** The width from which the links show and the toggle hides. */
export type ScNavbarExpand = 'sm' | 'md' | 'lg';

/** Tailwind's breakpoints, for the same widths in a media query. */
const BREAKPOINT: Record<ScNavbarExpand, string> = {
  sm: '40rem',
  md: '48rem',
  lg: '64rem',
};

/**
 * A site's top bar (`header`, the banner landmark): your brand, links and
 * actions; on narrow screens a toggle and a menu panel under the bar (a
 * disclosure — the page stays usable, nothing is trapped). The menu closes
 * on Escape (focus back on the toggle), when a link in it is followed, and
 * when the window grows wide enough for the links.
 *
 * ```html
 * <header scNavbar>
 *   <a scNavbarBrand href="/">…</a>
 *   <nav scNavbarNav aria-label="Main">…</nav>
 *   <div scNavbarActions>…</div>
 *   <button scNavbarToggle>…</button>
 *   <div scNavbarMenu><nav aria-label="Main">…</nav></div>
 * </header>
 * ```
 */
@Directive({
  selector: 'header[scNavbar]',
  exportAs: 'scNavbar',
  host: {
    'data-slot': 'navbar',
    '[attr.data-hidden]': 'hidden() ? "" : null',
    '[class]': 'class()',
    '(keydown.escape)': 'onEscape()',
  },
})
export class ScNavbar {
  readonly classInput = input<string>('', { alias: 'class' });
  /** Whether the menu is open (narrow screens). */
  readonly open = model(false);
  /** The width from which the links show and the toggle hides. */
  readonly expand = input<ScNavbarExpand>('md');
  /** Stays at the top of the page as it scrolls. */
  readonly sticky = input(false, { transform: booleanAttribute });
  /** Slides away while the page scrolls down, back when it scrolls up. */
  readonly hideOnScroll = input(false, { transform: booleanAttribute });

  /** The menu's id: the toggle's `aria-controls`. */
  readonly menuId = inject(_IdGenerator).getId('sc-navbar-menu-');
  /** The bar: what is inside it, or not (an overlaid menu closes on the outside). */
  readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  /** The toggle, to give it back the focus. */
  readonly toggle = signal<HTMLElement | null>(null);

  private readonly scrolledAway = signal(false);
  protected readonly hidden = computed(
    () => this.hideOnScroll() && this.scrolledAway() && !this.open(),
  );

  protected readonly class = computed(() =>
    cn(
      'bg-background relative z-40 flex flex-wrap items-center gap-x-4 border-b px-4 md:px-6',
      this.sticky() && 'sticky top-0',
      this.hideOnScroll() &&
        'transition-transform duration-200 data-hidden:-translate-y-full motion-reduce:transition-none',
      // The actions take the free space; the toggle after them doesn't.
      '[&>[data-slot=navbar-actions]~[data-slot=navbar-toggle]]:ms-0',
      this.classInput(),
    ),
  );

  constructor() {
    inject(Router, { optional: true })
      ?.events.pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.open.set(false));

    const destroyRef = inject(DestroyRef);
    const element = this.element;
    afterNextRender(() => {
      const window = element.ownerDocument.defaultView;
      if (!window) return;

      // Wide enough for the links: no menu.
      const wide = window.matchMedia(
        `(min-width: ${BREAKPOINT[this.expand()]})`,
      );
      const onWide = () => wide.matches && this.open.set(false);
      wide.addEventListener('change', onWide);

      let lastY = window.scrollY;
      const onScroll = () => {
        const y = window.scrollY;
        // Past the bar, going down: away. Up, or back at the top: here.
        if (Math.abs(y - lastY) > 4)
          this.scrolledAway.set(y > lastY && y > element.offsetHeight);
        lastY = y;
      };
      window.addEventListener('scroll', onScroll, { passive: true });

      destroyRef.onDestroy(() => {
        wide.removeEventListener('change', onWide);
        window.removeEventListener('scroll', onScroll);
      });
    });
  }

  protected onEscape(): void {
    if (!this.open()) return;
    this.open.set(false);
    this.toggle()?.focus();
  }
}
