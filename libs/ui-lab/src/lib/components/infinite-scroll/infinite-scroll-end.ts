import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_INFINITE_SCROLL } from './infinite-scroll';

@Component({
  selector: '[scInfiniteScrollEnd]',
  template: `
    @if (infiniteScroll.hasReachedEnd() && !infiniteScroll.loading()) {
      <ng-content>
        <div class="text-muted-foreground py-4 text-center text-sm">
          {{ message() }}
        </div>
      </ng-content>
    }
  `,
  host: {
    'data-slot': 'infinite-scroll-end',
    '[class]': 'hostClass()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScInfiniteScrollEnd {
  readonly infiniteScroll = inject(SC_INFINITE_SCROLL);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly message = input<string>('No more items to load');

  protected readonly hostClass = computed(() => cn('block', this.classInput()));
}
