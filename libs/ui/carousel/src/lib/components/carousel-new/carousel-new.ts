import {
  DestroyRef,
  Directive,
  ElementRef,
  afterNextRender,
  computed,
  contentChild,
  effect,
  inject,
  input,
  model,
  signal,
  untracked,
} from '@angular/core';
import { ɵwarnIfUnnamed } from '@semantic-components/ui';
import { cn } from 'cn';
import EmblaCarousel, {
  type EmblaCarouselType,
  type EmblaOptionsType,
  type EmblaPluginType,
} from 'embla-carousel';
import { ScCarouselNewViewport } from './carousel-new-viewport';

export type ScCarouselNewOrientation = 'horizontal' | 'vertical';
export type ScCarouselNewAlign = 'start' | 'center' | 'end';
export type ScCarouselNewSlidesPerPage = number | 'auto';
export type ScCarouselNewApi = EmblaCarouselType;
export type ScCarouselNewPlugin = EmblaPluginType;

/**
 * A slideshow (Embla): its slides in a viewport, Previous and Next, and if
 * you like indicators and a play toggle. A region: name it (`aria-label`) and
 * say what it is (`aria-roledescription`, your word for "carousel").
 *
 * `[(page)]` is the page shown, from 0; `[(playing)]` rotates it every
 * `interval`. The keys, with focus inside: ← and → (mirrored right to left),
 * ↑ and ↓ when vertical, Home and End. Slides less than half in view are
 * inert.
 */
@Directive({
  selector: 'div[scCarouselNew]',
  exportAs: 'scCarouselNew',
  host: {
    role: 'region',
    '[attr.data-orientation]': 'orientation()',
    '[attr.data-playing]': 'playing() || null',
    '[attr.data-paused]': '(playing() && paused()) || null',
    '[style.--sc-carousel-interval]': 'interval() + "ms"',
    '[class]': 'class()',
    '(keydown)': 'onKeydown($event)',
    '(focusin)': 'onFocusin($event)',
    '(pointerenter)': 'onPointerenter($event)',
    '(pointerleave)': 'hovered.set(false)',
  },
})
export class ScCarouselNew {
  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });
  readonly orientation = input<ScCarouselNewOrientation>('horizontal');
  /** Where a page's slides sit in the viewport. */
  readonly align = input<ScCarouselNewAlign>('start');
  /** How many slides a page holds: a number, or as many as show ('auto'). */
  readonly slidesPerPage = input<ScCarouselNewSlidesPerPage>(1);
  /** Wraps round at either end. */
  readonly loop = input(false);
  /** A swipe coasts to wherever it stops; the nearest page becomes current. */
  readonly dragFree = input(false);
  /** A fast swipe may pass over pages (otherwise one page at most). */
  readonly skipSnaps = input(false);
  /** Swipes and drags move it (off: only the buttons, keys and code). */
  readonly drag = input(true);
  /** Embla's plugins (fade, wheel gestures…): a change starts it again with them. */
  readonly plugins = input<ScCarouselNewPlugin[]>([]);
  /** The page shown, from 0. */
  readonly page = model(0);
  /** Rotating: on to the next page every `interval`, round to the first. Stops when the user moves it or brings keyboard focus in; doesn't start by itself under reduced motion. */
  readonly playing = model(false);
  /** The time each page shows while rotating, in milliseconds. */
  readonly interval = input(5000);

  private readonly viewport = contentChild(ScCarouselNewViewport);
  private readonly apiSignal = signal<ScCarouselNewApi | null>(null);
  /** Embla's API, once it runs: for plugins, events and more. */
  readonly api = this.apiSignal.asReadonly();
  private readonly snaps = signal<readonly (readonly number[])[]>([]);
  /** How many pages (0 until measured, in the browser). */
  readonly pageCount = computed(() => this.snaps().length);
  /** Its pages, 0 … pageCount − 1: one indicator each. */
  readonly pages = computed(() =>
    Array.from({ length: this.pageCount() }, (_, i) => i),
  );
  private readonly items = signal<readonly HTMLElement[]>([]);
  /** The slides, in page order (they register themselves). */
  readonly slides = computed(() =>
    [...this.items()].sort((a, b) =>
      // 4: b follows a (Node.DOCUMENT_POSITION_FOLLOWING, no Node global on the server).
      a.compareDocumentPosition(b) & 4 ? -1 : 1,
    ),
  );
  private readonly canPreviousSignal = signal(false);
  private readonly canNextSignal = signal(false);
  /** There is a page before (always, looping). */
  readonly canPrevious = this.canPreviousSignal.asReadonly();
  /** There is a page after (always, looping). */
  readonly canNext = this.canNextSignal.asReadonly();
  private readonly inViewSlides = signal<ReadonlySet<HTMLElement> | null>(null);

  /** Rotation held: hovered, a finger down, the tab hidden, scrolled out of view. */
  readonly paused = computed(
    () => this.hovered() || this.held() || this.hidden() || !this.visible(),
  );
  private readonly hovered = signal(false);
  private readonly held = signal(false);
  private readonly hidden = signal(false);
  private readonly visible = signal(true);

  /** A swipe or drag under way: a page it reaches stops the rotation. */
  private swiping = false;
  /** Focus was in a slide when the keys paged: it follows to the incoming one. */
  private focusFollows = false;

  private readonly class = computed(() => cn('relative', this.classInput()));

  constructor() {
    ɵwarnIfUnnamed('scCarouselNew');
    const destroyRef = inject(DestroyRef);
    const rendered = signal(false);
    afterNextRender(() => {
      rendered.set(true);
      if (
        this.playing() &&
        globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches
      ) {
        this.playing.set(false);
      }
      const visibility = () =>
        this.hidden.set(document.visibilityState === 'hidden');
      document.addEventListener('visibilitychange', visibility);
      const observer =
        typeof IntersectionObserver === 'function'
          ? new IntersectionObserver(([entry]) =>
              this.visible.set(entry.isIntersecting),
            )
          : null;
      observer?.observe(this.element);
      destroyRef.onDestroy(() => {
        document.removeEventListener('visibilitychange', visibility);
        observer?.disconnect();
      });
    });

    const options = computed<EmblaOptionsType>(() => ({
      axis: this.orientation() === 'horizontal' ? 'x' : 'y',
      align: this.align(),
      slidesToScroll: this.slidesPerPage(),
      loop: this.loop(),
      dragFree: this.dragFree(),
      skipSnaps: this.skipSnaps(),
      watchDrag: this.drag(),
      inViewThreshold: 0.5,
    }));

    // Started in the browser, and again when its options or plugins change.
    effect((onCleanup) => {
      if (!rendered()) return;
      const viewport = this.viewport()?.element;
      if (!viewport) return;
      const opts = options();
      const plugins = this.plugins();
      untracked(() => {
        const embla = EmblaCarousel(
          viewport,
          {
            // Right to left as its page.
            direction: this.direction(),
            ...opts,
            startIndex: this.page(),
          },
          plugins,
        );
        const sync = () => this.sync(embla);
        embla.on('select', () => {
          if (this.swiping) this.playing.set(false);
          sync();
        });
        embla.on('reInit', sync);
        embla.on('slidesInView', () => this.syncInView(embla));
        embla.on('scroll', () => this.syncProgress(embla));
        embla.on('pointerDown', () => {
          this.swiping = true;
          this.held.set(true);
        });
        embla.on('pointerUp', () => this.held.set(false));
        embla.on('settle', () => (this.swiping = false));
        sync();
        this.syncInView(embla);
        this.syncProgress(embla);
        this.apiSignal.set(embla);
        onCleanup(() => {
          embla.destroy();
          this.apiSignal.set(null);
        });
      });
    });

    // page → Embla.
    effect(() => {
      const page = this.page();
      const embla = this.apiSignal();
      if (embla && embla.selectedScrollSnap() !== page) {
        embla.scrollTo(page, this.reducedMotion());
      }
    });

    // Rotation: a page every interval, the timer set again by each change.
    effect((onCleanup) => {
      this.page();
      const embla = this.apiSignal();
      if (!embla || !this.playing() || this.paused()) return;
      const timer = setTimeout(() => {
        if (embla.canScrollNext()) embla.scrollNext(this.reducedMotion());
        else embla.scrollTo(0, this.reducedMotion());
      }, this.interval());
      onCleanup(() => clearTimeout(timer));
    });

    destroyRef.onDestroy(() => this.apiSignal()?.destroy());
  }

  /** @internal A slide, from its directive: until it goes. */
  register(slide: HTMLElement): () => void {
    this.items.update((items) => [...items, slide]);
    return () => this.items.update((items) => items.filter((i) => i !== slide));
  }

  /** @internal Whether a slide is at least half in view (all are, until measured). */
  isInView(slide: HTMLElement): boolean {
    return this.inViewSlides()?.has(slide) ?? true;
  }

  /** @internal Whether a slide is in the current page. */
  isActive(slide: HTMLElement): boolean {
    return this.slidesOf(this.page()).includes(slide);
  }

  /** @internal A page's slides: before measuring, as many as slidesPerPage says. */
  slidesOf(page: number): readonly HTMLElement[] {
    const slides = this.slides();
    const snaps = this.snaps();
    if (snaps.length) {
      return (snaps[page] ?? []).map((i) => slides[i]).filter(Boolean);
    }
    const per = this.slidesPerPage();
    const size = typeof per === 'number' ? Math.max(1, per) : 1;
    return slides.slice(page * size, page * size + size);
  }

  /** The page holding a slide (by its index): for a strip that follows another carousel. */
  pageOf(index: number): number {
    const snaps = this.snaps();
    if (snaps.length) {
      return Math.max(
        0,
        snaps.findIndex((slides) => slides.includes(index)),
      );
    }
    const per = this.slidesPerPage();
    return Math.floor(index / (typeof per === 'number' ? Math.max(1, per) : 1));
  }

  /** The previous page; stops the rotation. */
  previous(): void {
    this.playing.set(false);
    this.apiSignal()?.scrollPrev(this.reducedMotion());
  }

  /** The next page; stops the rotation. */
  next(): void {
    this.playing.set(false);
    this.apiSignal()?.scrollNext(this.reducedMotion());
  }

  /** @internal A page chosen by the user (an indicator, Home, End): stops the rotation. */
  goTo(page: number): void {
    this.playing.set(false);
    this.page.set(Math.max(0, Math.min(page, this.pageCount() - 1)));
  }

  private onKeydown(event: KeyboardEvent): void {
    if (event.defaultPrevented) return;
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    // Text fields keep their keys.
    const target = event.target as HTMLElement;
    if (target.closest('input, textarea, select, [contenteditable="true"]')) {
      return;
    }
    let move: (() => void) | null = null;
    const vertical = this.orientation() === 'vertical';
    const rtl = this.direction() === 'rtl';
    switch (event.key) {
      case vertical ? 'ArrowUp' : rtl ? 'ArrowRight' : 'ArrowLeft':
        move = () => this.previous();
        break;
      case vertical ? 'ArrowDown' : rtl ? 'ArrowLeft' : 'ArrowRight':
        move = () => this.next();
        break;
      case 'Home':
        move = () => this.goTo(0);
        break;
      case 'End':
        move = () => this.goTo(this.pageCount() - 1);
        break;
    }
    if (!move) return;
    event.preventDefault();
    this.focusFollows = this.slides().some((slide) => slide.contains(target));
    move();
  }

  private onFocusin(event: FocusEvent): void {
    // Keyboard focus coming in stops the rotation, until asked again.
    const target = event.target as HTMLElement;
    const from = event.relatedTarget as Node | null;
    if (from && this.element.contains(from)) return;
    if (target.matches?.(':focus-visible')) this.playing.set(false);
  }

  private onPointerenter(event: PointerEvent): void {
    if (event.pointerType === 'mouse') this.hovered.set(true);
  }

  private reducedMotion(): boolean {
    return !!globalThis.matchMedia?.('(prefers-reduced-motion: reduce)')
      .matches;
  }

  private direction(): 'ltr' | 'rtl' {
    return typeof getComputedStyle === 'function' &&
      getComputedStyle(this.element).direction === 'rtl'
      ? 'rtl'
      : 'ltr';
  }

  private sync(embla: EmblaCarouselType): void {
    this.canPreviousSignal.set(embla.canScrollPrev());
    this.canNextSignal.set(embla.canScrollNext());
    this.snaps.set(embla.internalEngine().slideRegistry.map((s) => [...s]));
    const page = embla.selectedScrollSnap();
    if (this.page() !== page) this.page.set(page);
  }

  private syncInView(embla: EmblaCarouselType): void {
    const nodes = embla.slideNodes();
    const inView = new Set(embla.slidesInView().map((i) => nodes[i]));
    this.inViewSlides.set(inView);
    if (!this.focusFollows) return;
    const incoming = this.slidesOf(this.page()).find((s) => inView.has(s));
    if (!incoming) return;
    this.focusFollows = false;
    if (!incoming.hasAttribute('tabindex')) {
      incoming.setAttribute('tabindex', '-1');
    }
    incoming.focus({ preventScroll: true });
  }

  private syncProgress(embla: EmblaCarouselType): void {
    const progress = Math.max(0, Math.min(1, embla.scrollProgress()));
    this.element.style.setProperty('--sc-carousel-progress', String(progress));
  }
}
