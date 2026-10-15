import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

/** What is shown when nothing matches the filter: write its icon and text. */
@Directive({
  selector: 'div[scNotificationEmpty]',
  host: {
    'data-slot': 'notification-empty',
    '[class]': 'class()',
  },
})
export class ScNotificationEmpty {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'flex flex-1 flex-col items-center justify-center gap-2 px-4 py-12 text-center text-sm text-muted-foreground [&_svg]:size-8 [&_svg]:text-muted-foreground/60',
      this.classInput(),
    ),
  );
}
