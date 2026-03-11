import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ViewEncapsulation,
  afterNextRender,
  computed,
  contentChild,
  effect,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import EmblaCarousel, {
  type EmblaCarouselType,
  EmblaOptionsType,
  EmblaPluginType,
} from 'embla-carousel';
import { ScCarouselViewport } from './carousel-viewport';

export type ScCarouselOrientation = 'horizontal' | 'vertical';
export type ScCarouselApi = EmblaCarouselType;
export type ScCarouselOptions = EmblaOptionsType;
export type ScCarouselPlugin = EmblaPluginType;

@Component({
  selector: 'div[scCarousel]',
  exportAs: 'scCarousel',
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'carousel',
    role: 'region',
    'aria-roledescription': 'carousel',
    '[attr.aria-label]': 'ariaLabel()',
    '[class]': 'class()',
    '(keydown)': 'onKeyDown($event)',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScCarousel {
  private readonly destroyRef = inject(DestroyRef);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly ariaLabel = input('carousel', { alias: 'aria-label' });
  readonly orientation = input<ScCarouselOrientation>('horizontal');
  readonly options = input<ScCarouselOptions>({});
  readonly plugins = input<ScCarouselPlugin[]>([]);

  private readonly viewport = contentChild(ScCarouselViewport);

  readonly activeIndex = model(0);
  readonly canScrollPrev = signal(false);
  readonly canScrollNext = signal(false);

  private readonly api = signal<ScCarouselApi | null>(null);

  protected readonly class = computed(() => cn('relative', this.classInput()));

  constructor() {
    afterNextRender(() => {
      const viewportEl = this.viewport()?.viewportElement();
      if (!viewportEl) return;

      const embla = EmblaCarousel(
        viewportEl,
        {
          ...this.options(),
          startIndex: this.activeIndex(),
          axis: this.orientation() === 'horizontal' ? 'x' : 'y',
        },
        this.plugins(),
      );

      this.api.set(embla);
      this.syncFromEmbla(embla);

      embla.on('select', () => this.syncFromEmbla(embla));
      embla.on('reInit', () => this.syncFromEmbla(embla));

      this.destroyRef.onDestroy(() => embla.destroy());
    });

    // Sync activeIndex model → embla
    effect(() => {
      const index = this.activeIndex();
      const embla = this.api();
      if (embla && embla.selectedScrollSnap() !== index) {
        embla.scrollTo(index);
      }
    });
  }

  scrollPrev(): void {
    this.api()?.scrollPrev();
  }

  scrollNext(): void {
    this.api()?.scrollNext();
  }

  private syncFromEmbla(embla: EmblaCarouselType): void {
    this.canScrollPrev.set(embla.canScrollPrev());
    this.canScrollNext.set(embla.canScrollNext());

    const newIndex = embla.selectedScrollSnap();
    if (this.activeIndex() !== newIndex) {
      this.activeIndex.set(newIndex);
    }
  }

  protected onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.scrollPrev();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.scrollNext();
    }
  }
}
