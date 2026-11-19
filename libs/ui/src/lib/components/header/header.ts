import { _IdGenerator } from '@angular/cdk/a11y';
import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  DestroyRef,
  ElementRef,
  ViewEncapsulation,
  afterNextRender,
  booleanAttribute,
  computed,
  contentChild,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { cn } from 'cn';
import { filter } from 'rxjs';
import { ScHeaderMenu } from './header-menu';

/** The width from which the links show and the toggle hides. */
export type ScHeaderExpand = 'sm' | 'md' | 'lg';

const HIDDEN = { sm: 'sm:hidden', md: 'md:hidden', lg: 'lg:hidden' } as const;

/** Tailwind's breakpoints, for the same widths in a media query. */
const BREAKPOINT: Record<ScHeaderExpand, string> = {
  sm: '40rem',
  md: '48rem',
  lg: '64rem',
};

/**
 * A site's top bar (`header`, the banner landmark): your brand, links and
 * actions; on narrow screens a toggle and a menu panel under the bar (a
 * disclosure — the page stays usable, nothing is trapped). The menu is your
 * `ng-template scHeaderMenu`: the header renders it while open. It closes on
 * Escape (focus back on the toggle), when a link in it is followed, when the
 * window grows wide enough for the links, and — over the page — when the
 * focus leaves the bar.
 *
 * ```html
 * <header scHeader>
 *   <a scHeaderBrand href="/">…</a>
 *   <nav scNavigationMenu scHeaderNav aria-label="Main">…</nav>
 *   <div scHeaderActions>…</div>
 *   <button scHeaderToggle>…</button>
 *   <ng-template scHeaderMenu><nav aria-label="Main">…</nav></ng-template>
 * </header>
 * ```
 */
@Component({
  selector: 'header[scHeader]',
  exportAs: 'scHeader',
  imports: [NgTemplateOutlet],
  template: `
    <ng-content />
    @if (open() && menu(); as menu) {
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
export class ScHeader {
  readonly classInput = input<string>('', { alias: 'class' });
  /** Whether the menu is open (narrow screens). */
  readonly open = model(false);
  /** The width from which the links show and the toggle hides. */
  readonly expand = input<ScHeaderExpand>('md');
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

  /** Your menu's content (`ng-template scHeaderMenu`). */
  private readonly menu = contentChild(ScHeaderMenu);
  /** The menu lies over the page (not `push`). */
  private readonly covers = computed(() => !(this.menu()?.push() ?? false));

  /**
   * The panel, under the bar. Over the page, as shadcn's: the bar's width and
   * padding; all of the page below the bar (the window's height less the
   * bar's, which is `100%` here), scrolling if its content is taller;
   * see-through and blurred.
   */
  private readonly panelClass = computed(() =>
    cn(
      'flex basis-full flex-col gap-1 pb-4',
      this.covers() &&
        'bg-background/90 backdrop-blur absolute inset-x-0 top-full px-4 md:px-6 h-[calc(100dvh-100%)] overflow-y-auto overscroll-contain',
      HIDDEN[this.expand()],
      this.menu()?.classInput(),
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
    () => this.hideOnScroll() && this.scrolledAway() && !this.open(),
  );

  private readonly class = computed(() =>
    cn(
      'bg-background relative z-40 flex flex-wrap items-center gap-x-4 border-b px-4 md:px-6',
      this.sticky() && 'sticky top-0',
      this.hideOnScroll() &&
        'transition-transform duration-200 data-hidden:-translate-y-full motion-reduce:transition-none',
      // The actions take the free space; the toggle after them doesn't.
      '[&>[data-slot=header-actions]~[data-slot=header-toggle]]:ms-0',
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

  /** Over the page, it hides it: the focus or a click out there closes it. */
  private closeOutside(event: Event): void {
    if (
      this.open() &&
      this.covers() &&
      !this.element.contains(event.target as Node)
    )
      this.open.set(false);
  }

  private onEscape(): void {
    if (!this.open()) return;
    this.open.set(false);
    this.toggle()?.focus();
  }
}
