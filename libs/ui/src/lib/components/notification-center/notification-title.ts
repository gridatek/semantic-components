import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils/cn/cn';

/** A notification's title. */
@Directive({
  selector: '[scNotificationTitle]',
  host: {
    'data-slot': 'notification-title',
    '[class]': 'class()',
  },
})
export class ScNotificationTitle {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'text-sm font-medium text-foreground in-data-[read=false]:font-semibold',
      this.classInput(),
    ),
  );
}
