import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_NOTIFICATION_GROUP } from './notification-group';

/** A group's title (a heading of yours): it names the group. */
@Directive({
  selector: '[scNotificationGroupTitle]',
  host: {
    'data-slot': 'notification-group-title',
    '[id]': 'group.titleId',
    '[class]': 'class()',
  },
})
export class ScNotificationGroupTitle {
  protected readonly group = inject(SC_NOTIFICATION_GROUP);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'text-muted-foreground flex items-center gap-2 px-3 pt-3 pb-1 text-xs font-medium tracking-wide uppercase',
      this.classInput(),
    ),
  );
}
