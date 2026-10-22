import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

/** A notification's title. */
@Directive({
  selector: '[scNotificationNextTitle]',
  host: {
    'data-slot': 'notification-title',
    '[class]': 'class()',
  },
})
export class ScNotificationNextTitle {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'text-sm font-medium text-foreground in-data-[read=false]:font-semibold',
      this.classInput(),
    ),
  );
}
