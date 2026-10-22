import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_NOTIFICATION_NEXT_SECTION } from './notification-next-section';

/** A section's title (a heading of yours: "Today"): it names the section. */
@Directive({
  selector: '[scNotificationNextSectionTitle]',
  host: {
    'data-slot': 'notification-section-title',
    '[id]': 'section.titleId',
    '[class]': 'class()',
  },
})
export class ScNotificationNextSectionTitle {
  protected readonly section = inject(SC_NOTIFICATION_NEXT_SECTION);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'text-muted-foreground px-3 pt-3 pb-1 text-xs font-medium',
      this.classInput(),
    ),
  );
}
