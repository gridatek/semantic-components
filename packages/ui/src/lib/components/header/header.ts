import { _IdGenerator } from '@angular/cdk/a11y';
import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  DestroyRef,
  ElementRef,
  ViewEncapsulation,
  afterNextRender,
  afterRenderEffect,
  booleanAttribute,
  computed,
  contentChild,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import { cn } from 'cn';
import { onNavigationEnd } from '../../utils/navigation-end';
import {
  SC_NAVIGATION_MENU_LINK_HOST,
  type ScNavigationMenuLinkHost,
} from '../navigation-menu/navigation-menu-link-host';
import { ScHeaderMobileMenu } from './header-mobile-menu';

/** The width from which the links show and the toggle hides. */
export type ScHeaderExpand = 'sm' | 'md' | 'lg';

/** How the mobile menu shows: over the page below the bar, or pushing it down. */
export type ScHeaderMobileMenuMode = 'cover' | 'push';

const HIDDEN = { sm: 'sm:hidden', md: 'md:hidden', lg: 'lg:hidden' } as const;

/** The mobile menu's toggle, wherever it sits in the bar: hidden from `expand` up. */
const TOGGLE_HIDDEN = {
  sm: 'sm:[&_[data-slot=header-mobile-menu-toggle]]:hidden',
  md: 'md:[&_[data-slot=header-mobile-menu-toggle]]:hidden',
  lg: 'lg:[&_[data-slot=header-mobile-menu-toggle]]:hidden',
} as const;

/** The bar's links (its `nav`): shown from `expand` up. */
const NAV_SHOWN = {
  sm: 'sm:[&>nav]:flex',
  md: 'md:[&>nav]:flex',
  lg: 'lg:[&>nav]:flex',
} as const;

/** Tailwind's breakpoints, for the same widths in a media query. */
const BREAKPOINT: Record<ScHeaderExpand, string> = {
  sm: '40rem',
  md: '48rem',
  lg: '64rem',
};

/**
 * A site's top bar (`header`, the banner landmark): your brand and actions
 * (your own markup), and the links (a Navigation Menu); below `expand`, the
 * mobile menu's toggle and the menu, under the bar — over the page, or
 * pushing it down (`mobileMenu`). A disclosure: nothing is trapped. The menu
 * is your `ng-template scHeaderMobileMenu`: the header renders it while open.
 * It closes on Escape (focus back on the toggle), when a link in it is
 * followed, on a page change, when the window grows wide enough for the
 * links, and — over the page — on a click or the focus outside the bar.
 *
 * ```html
 * <header scHeader>
 *   <a href="/">…</a>
 *   <nav scNavigationMenu aria-label="Main">…</nav>
 *   <div class="ms-auto flex items-center gap-2">
 *     …
 *     <button scHeaderMobileMenuToggle class="-me-2">…</button>
 *   </div>
 *   <ng-template scHeaderMobileMenu><nav aria-label="Main">…</nav></ng-template>
 * </header>
 * ```
 */
@Component({
  selector: 'header[scHeader]',
  exportAs: 'scHeader',
  imports: [NgTemplateOutlet],
  // The mobile menu's links (scNavigationMenuLink) tell it when one is
  // followed: it closes.
  providers: [{ provide: SC_NAVIGATION_MENU_LINK_HOST, useExisting: ScHeader }],
  template: `
    <ng-content />
    @if (mobileMenuOpen() && menu(); as menu) {
      <div
        data-slot="header-menu"
        [id]="menuId"
        [class]="panelClass()"
        [animate.enter]="panelEnter()"
        [animate.leave]="panelLeave()"
      >
        <ng-container [ngTemplateOutlet]="menu.template" />
      </div>
    }
  `,
  host: {
    'data-slot': 'header',
    '[attr.data-hidden]': 'hidden() ? "" : null',
    '[class]': 'class()',
    '(keydown.escape)': 'onEscape()',
    '(document:pointerdown)': 'closeOutside($event)',
    '(document:focusin)': 'closeOutside($event)',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScHeader implements ScNavigationMenuLinkHost {
  readonly classInput = input<string>('', { alias: 'class' });
  /** Whether the mobile menu is open (below `expand`): `[(mobileMenuOpen)]`. */
  readonly mobileMenuOpen = model(false);
  /** The width from which the links show and the toggle hides. */
  readonly expand = input<ScHeaderExpand>('md');
  /**
   * How the mobile menu shows: `'cover'` over the page below the bar (the
   * focus leaving the bar closes it), `'push'` pushing the page down.
   */
  readonly mobileMenu = input<ScHeaderMobileMenuMode>('cover');
  /** Stays at the top of the page as it scrolls. */
  readonly sticky = input(false, { transform: booleanAttribute });
  /** Slides away while the page scrolls down, back when it scrolls up. */
  readonly hideOnScroll = input(false, { transform: booleanAttribute });

  /** The menu's id: the toggle's `aria-controls`. */
  readonly menuId = inject(_IdGenerator).getId('sc-header-menu-');
  /** The bar: what is inside it, or not (an overlaid menu closes on the outside). */
  readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  /** The toggle, to give it back the focus. */
  readonly toggle = signal<HTMLElement | null>(null);

  /** Your menu's content (`ng-template scHeaderMobileMenu`). */
  private readonly menu = contentChild(ScHeaderMobileMenu);
  /** The menu lies over the page (not `push`). */
  private readonly covers = computed(() => this.mobileMenu() === 'cover');

  /**
   * The panel, under the bar. Over the page, as shadcn's: the bar's width and
   * padding; all of the page below the bar (the window's height less the
   * bar's, which is `100%` here), scrolling if its content is taller;
   * see-through and blurred.
   */
  private readonly panelClass = computed(() =>
    cn(
      'flex basis-full flex-col gap-1 pb-4',
      // Pushing: a little room under the bar.
      !this.covers() && 'pt-2',
      this.covers() &&
        'bg-background/90 backdrop-blur absolute inset-x-0 top-full px-4 md:px-6 h-[calc(100dvh-100%)] overflow-y-auto overscroll-contain',
      HIDDEN[this.expand()],
    ),
  );
  /** Over the page, it opens at once; pushing it, it fades and slides in. */
  private readonly panelEnter = computed(() =>
    this.covers()
      ? ''
      : 'animate-in fade-in-0 slide-in-from-top-1 duration-200 motion-reduce:animate-none',
  );
  /** Closing, it fades out (over the page, shrinking a little), then leaves. */
  private readonly panelLeave = computed(() =>
    this.covers()
      ? 'animate-out fade-out-0 zoom-out-95 duration-100 motion-reduce:animate-none'
      : 'animate-out fade-out-0 slide-out-to-top-1 duration-200 motion-reduce:animate-none',
  );

  private readonly scrolledAway = signal(false);
  private readonly hidden = computed(
    () => this.hideOnScroll() && this.scrolledAway() && !this.mobileMenuOpen(),
  );

  private readonly class = computed(() =>
    cn(
      // Its own height (56px), whatever is in it. The bar's line is 56px tall
      // by an invisible first item (::before, no width; its gap taken back):
      // a push menu wraps below as a line of its own, and the bar keeps its
      // place — a min-height would centre both lines together.
      'bg-background relative z-40 flex min-h-14 flex-wrap items-center gap-x-4 border-b px-4 md:px-6',
      "before:h-14 before:w-0 before:-me-4 before:content-['']",
      // Its links (a `nav` in the bar, a Navigation Menu): hidden below
      // `expand`, where the menu has them.
      '[&>nav]:hidden',
      NAV_SHOWN[this.expand()],
      // The toggle: only below `expand`, where the menu is.
      TOGGLE_HIDDEN[this.expand()],
      this.sticky() && 'sticky top-0',
      this.hideOnScroll() &&
        'transition-transform duration-200 data-hidden:-translate-y-full motion-reduce:transition-none',
      this.classInput(),
    ),
  );

  constructor() {
    // A navigation over (a link elsewhere, Back…): the menu closes.
    onNavigationEnd(() => this.mobileMenuOpen.set(false));

    const destroyRef = inject(DestroyRef);
    const element = this.element;

    // Over the page, the menu takes all of it below the bar: the page behind
    // is out of sight, so it doesn't scroll — no scrollbar, no keys moving it.
    // Its scrollbar's room is kept, so nothing shifts.
    afterRenderEffect((onCleanup) => {
      if (!this.covers() || !this.mobileMenuOpen() || !this.menu()) return;
      const root = element.ownerDocument.documentElement;
      const window = element.ownerDocument.defaultView;
      const scrollbar = !!window && window.innerWidth > root.clientWidth;
      const body = element.ownerDocument.body;
      const width = body.getBoundingClientRect().width;
      // A scrollbar on the left (right to left, in Chromium) or the right.
      const side = root.clientLeft > 0 ? 'paddingLeft' : 'paddingRight';
      const { overflow, scrollbarGutter } = root.style;
      const padding = root.style[side];
      root.style.overflow = 'hidden';
      if (scrollbar) root.style.scrollbarGutter = 'stable';
      // WebKit drops the root's gutter all the same: its room as padding.
      const lost = body.getBoundingClientRect().width - width;
      if (window && lost > 0.5) {
        const now = parseFloat(window.getComputedStyle(root)[side]) || 0;
        root.style[side] = `${now + lost}px`;
      }
      onCleanup(() => {
        root.style.overflow = overflow;
        root.style.scrollbarGutter = scrollbarGutter;
        root.style[side] = padding;
      });
    });
    afterNextRender(() => {
      const window = element.ownerDocument.defaultView;
      if (!window) return;

      // Wide enough for the links: no menu.
      const wide = window.matchMedia(
        `(min-width: ${BREAKPOINT[this.expand()]})`,
      );
      const onWide = () => wide.matches && this.mobileMenuOpen.set(false);
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

  /** Over the page, it hides it: the focus or a click out there closes it. */
  private closeOutside(event: Event): void {
    if (
      this.mobileMenuOpen() &&
      this.covers() &&
      !this.element.contains(event.target as Node)
    )
      this.mobileMenuOpen.set(false);
  }

  /** A link of the mobile menu was followed: it closes, at once. */
  linkFollowed(): void {
    this.mobileMenuOpen.set(false);
  }

  private onEscape(): void {
    if (!this.mobileMenuOpen()) return;
    this.mobileMenuOpen.set(false);
    this.toggle()?.focus();
  }
}
