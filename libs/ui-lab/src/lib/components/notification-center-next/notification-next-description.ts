import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

/** A notification's description, on two lines at most. */
@Directive({
  selector: '[scNotificationNextDescription]',
  host: {
    'data-slot': 'notification-description',
    '[class]': 'class()',
  },
})
export class ScNotificationNextDescription {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('text-muted-foreground line-clamp-2 text-sm', this.classInput()),
  );
}
