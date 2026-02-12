import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  input,
  signal,
  ViewEncapsulation,
  DestroyRef,
  inject,
  afterNextRender,
} from '@angular/core';
import EmblaCarousel, {
  type EmblaCarouselType,
  EmblaOptionsType,
  EmblaPluginType,
} from 'embla-carousel';
import { cn } from '../../utils';
import { ScCarouselViewport } from './carousel-viewport';

export type ScCarouselOrientation = 'horizontal' | 'vertical';
export type ScCarouselApi = EmblaCarouselType;
export type ScCarouselOptions = EmblaOptionsType;
export type ScCarouselPlugin = EmblaPluginType;

@Component({
  selector: 'div[sc-carousel]',
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'carousel',
    role: 'region',
    'aria-roledescription': 'carousel',
    '[class]': 'class()',
    '(keydown)': 'onKeyDown($event)',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScCarousel {
  private readonly destroyRef = inject(DestroyRef);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly orientation = input<ScCarouselOrientation>('horizontal');
  readonly options = input<ScCarouselOptions>({});
  readonly plugins = input<ScCarouselPlugin[]>([]);

  private readonly viewport = contentChild(ScCarouselViewport);

  readonly canScrollPrev = signal(false);
  readonly canScrollNext = signal(false);

  private api: ScCarouselApi | null = null;

  protected readonly class = computed(() => cn('relative', this.classInput()));

  constructor() {
    afterNextRender(() => {
      const viewportEl = this.viewport()?.viewportElement();
      if (!viewportEl) return;

      const opts = {
        ...this.options(),
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
  }

  scrollPrev(): void {
    this.api?.scrollPrev();
  }

  scrollNext(): void {
    this.api?.scrollNext();
  }

  private updateScrollState(): void {
    if (!this.api) return;
    this.canScrollPrev.set(this.api.canScrollPrev());
    this.canScrollNext.set(this.api.canScrollNext());
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
