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
import { cn, ɵwarnIfUnnamed } from '@semantic-components/ui';
import EmblaCarousel, {
  type EmblaCarouselType,
  type EmblaOptionsType,
  type EmblaPluginType,
} from 'embla-carousel';
import { ScCarouselViewport } from './carousel-viewport';

export type ScCarouselOrientation = 'horizontal' | 'vertical';
export type ScCarouselApi = EmblaCarouselType;
export type ScCarouselOptions = EmblaOptionsType;
export type ScCarouselPlugin = EmblaPluginType;

/**
 * A slideshow (Embla): its slides in a viewport, the previous and next
 * buttons. A region: name it (`aria-label`) and say what it is
 * (`aria-roledescription`, your word for "carousel"). The arrows move between
 * slides — ← and → (mirrored right to left), ↑ and ↓ when vertical.
 * `[(activeIndex)]` is the slide position shown; `api()` is Embla's, for
 * plugins and more.
 */
@Directive({
  selector: 'div[scCarousel]',
  exportAs: 'scCarousel',
  host: {
    role: 'region',
    '[attr.data-orientation]': 'orientation()',
    '[class]': 'class()',
    '(keydown)': 'onKeydown($event)',
  },
})
export class ScCarousel {
  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });
  readonly orientation = input<ScCarouselOrientation>('horizontal');
  /** Embla's options: a change starts it again with them. */
  readonly options = input<ScCarouselOptions>({});
  /** Embla's plugins (autoplay…), none by default: a change starts it again with them. */
  readonly plugins = input<ScCarouselPlugin[]>([]);
  /** The slide position shown (Embla's scroll snap). */
  readonly activeIndex = model(0);

  private readonly viewport = contentChild(ScCarouselViewport);
  private readonly apiSignal = signal<ScCarouselApi | null>(null);
  /** Embla's API, once it runs: for plugins, events and more. */
  readonly api = this.apiSignal.asReadonly();
  /** How many positions it stops at (with several slides in view, fewer than the slides). */
  readonly count = signal(0);
  private readonly items = signal<readonly HTMLElement[]>([]);
  /** The slides, in page order (they register themselves): each one's place, for its name ("2 of 5"). */
  readonly slides = computed(() =>
    [...this.items()].sort((a, b) =>
      // 4: b follows a (Node.DOCUMENT_POSITION_FOLLOWING, no Node global on the server).
      a.compareDocumentPosition(b) & 4 ? -1 : 1,
    ),
  );
  readonly canScrollPrev = signal(false);
  readonly canScrollNext = signal(false);

  protected readonly class = computed(() => cn('relative', this.classInput()));

  constructor() {
    ɵwarnIfUnnamed('scCarousel');
    const destroyRef = inject(DestroyRef);
    const rendered = signal(false);
    afterNextRender(() => rendered.set(true));

    // Started in the browser, and again when its options, plugins or
    // orientation change.
    effect((onCleanup) => {
      if (!rendered()) return;
      const viewport = this.viewport()?.element;
      if (!viewport) return;
      const options = this.options();
      const plugins = this.plugins();
      const axis = this.orientation() === 'horizontal' ? 'x' : 'y';
      untracked(() => {
        const embla = EmblaCarousel(
          viewport,
          {
            // Right to left as its page, unless told.
            direction: this.direction(),
            ...options,
            startIndex: this.activeIndex(),
            axis,
          },
          plugins,
        );
        const sync = () => this.sync(embla);
        embla.on('select', sync);
        embla.on('reInit', sync);
        sync();
        this.apiSignal.set(embla);
        onCleanup(() => {
          embla.destroy();
          this.apiSignal.set(null);
        });
      });
    });

    // activeIndex → Embla.
    effect(() => {
      const index = this.activeIndex();
      const embla = this.apiSignal();
      if (embla && embla.selectedScrollSnap() !== index) embla.scrollTo(index);
    });

    destroyRef.onDestroy(() => this.apiSignal()?.destroy());
  }

  /** @internal A slide, from its directive: until it goes. */
  register(slide: HTMLElement): () => void {
    this.items.update((items) => [...items, slide]);
    return () => this.items.update((items) => items.filter((i) => i !== slide));
  }

  scrollPrev(): void {
    this.apiSignal()?.scrollPrev();
  }

  scrollNext(): void {
    this.apiSignal()?.scrollNext();
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    let step: 1 | -1 | 0 = 0;
    if (this.orientation() === 'vertical') {
      if (event.key === 'ArrowUp') step = -1;
      else if (event.key === 'ArrowDown') step = 1;
    } else {
      // The visually previous and next: mirrored right to left.
      const rtl = this.direction() === 'rtl';
      if (event.key === 'ArrowLeft') step = rtl ? 1 : -1;
      else if (event.key === 'ArrowRight') step = rtl ? -1 : 1;
    }
    if (!step) return;
    event.preventDefault();
    if (step === 1) this.scrollNext();
    else this.scrollPrev();
  }

  private direction(): 'ltr' | 'rtl' {
    return typeof getComputedStyle === 'function' &&
      getComputedStyle(this.element).direction === 'rtl'
      ? 'rtl'
      : 'ltr';
  }

  private sync(embla: EmblaCarouselType): void {
    this.canScrollPrev.set(embla.canScrollPrev());
    this.canScrollNext.set(embla.canScrollNext());
    this.count.set(embla.scrollSnapList().length);
    const index = embla.selectedScrollSnap();
    if (this.activeIndex() !== index) this.activeIndex.set(index);
  }
}
