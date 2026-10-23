import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils/cn/cn';

/** A notification's description, on two lines at most. */
@Directive({
  selector: '[scNotificationDescription]',
  host: {
    'data-slot': 'notification-description',
    '[class]': 'class()',
  },
})
export class ScNotificationDescription {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('text-muted-foreground line-clamp-2 text-sm', this.classInput()),
  );
}
