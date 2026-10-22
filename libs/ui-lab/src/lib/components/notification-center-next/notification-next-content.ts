import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

/** A notification's text: its title, description, time — beside its icon. */
@Directive({
  selector: 'div[scNotificationNextContent]',
  host: {
    'data-slot': 'notification-content',
    '[class]': 'class()',
  },
})
export class ScNotificationNextContent {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex min-w-0 flex-1 flex-col gap-0.5', this.classInput()),
  );
}
