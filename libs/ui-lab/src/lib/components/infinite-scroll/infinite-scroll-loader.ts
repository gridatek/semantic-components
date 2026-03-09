import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SiLoaderCircleIcon } from '@semantic-icons/lucide-icons';
import { SC_INFINITE_SCROLL } from './infinite-scroll';

@Component({
  selector: '[scInfiniteScrollLoader]',
  imports: [SiLoaderCircleIcon],
  template: `
    @if (infiniteScroll.loading()) {
      <ng-content>
        <div class="flex items-center justify-center gap-2 py-4">
          <svg
            siLoaderCircleIcon
            class="text-muted-foreground size-5 animate-spin"
          ></svg>
          <span class="text-muted-foreground text-sm">Loading more...</span>
        </div>
      </ng-content>
    }
  `,
  host: {
    'data-slot': 'infinite-scroll-loader',
    '[class]': 'hostClass()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScInfiniteScrollLoader {
  readonly infiniteScroll = inject(SC_INFINITE_SCROLL);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly hostClass = computed(() => cn('block', this.classInput()));
}
