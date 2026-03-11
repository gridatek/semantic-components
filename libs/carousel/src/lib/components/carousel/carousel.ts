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

  readonly canScrollPrev = signal(false);
  readonly canScrollNext = signal(false);
  readonly activeIndex = model(0);

  private api: ScCarouselApi | null = null;

  protected readonly class = computed(() => cn('relative', this.classInput()));

  constructor() {
    afterNextRender(() => {
      const viewportEl = this.viewport()?.viewportElement();
      if (!viewportEl) return;

      const opts = {
        ...this.options(),
        startIndex: this.activeIndex(),
        axis: (this.orientation() === 'horizontal' ? 'x' : 'y') as 'x' | 'y',
      };

      this.api = EmblaCarousel(viewportEl, opts, this.plugins());

      this.updateScrollState();

      this.api.on('select', () => this.updateScrollState());
      this.api.on('reInit', () => this.updateScrollState());

      this.destroyRef.onDestroy(() => {
        this.api?.destroy();
      });
    });

    effect(() => {
      const index = this.activeIndex();
      this.api?.scrollTo(index);
    });
  }

  scrollPrev(): void {
    this.api?.scrollPrev();
  }

  scrollNext(): void {
    this.api?.scrollNext();
  }

  scrollTo(index: number): void {
    this.api?.scrollTo(index);
  }

  private updateScrollState(): void {
    if (!this.api) return;
    this.canScrollPrev.set(this.api.canScrollPrev());
    this.canScrollNext.set(this.api.canScrollNext());

    const newIndex = this.api.selectedScrollSnap();
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
