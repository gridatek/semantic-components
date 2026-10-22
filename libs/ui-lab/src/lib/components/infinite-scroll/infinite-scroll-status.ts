import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

/**
 * What loading is doing, said politely (`role="status"`) — your words:
 * "Loading…", "20 more", "That's all", an error. Keep it in the page and
 * change its text: a region added with its text is not announced.
 */
@Directive({
  selector: '[scInfiniteScrollStatus]',
  host: {
    'data-slot': 'infinite-scroll-status',
    role: 'status',
    '[class]': 'class()',
  },
})
export class ScInfiniteScrollStatus {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'text-muted-foreground flex min-h-6 items-center justify-center gap-2 text-sm',
      this.classInput(),
    ),
  );
}
