import { _IdGenerator } from '@angular/cdk/a11y';
import {
  Directive,
  InjectionToken,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';

export const SC_NOTIFICATION_GROUP = new InjectionToken<ScNotificationGroup>(
  'SC_NOTIFICATION_GROUP',
);

/**
 * A group of notifications (`[scNotificationGroup]="'messages'"`, the `group`
 * of its notifications): a `group` named by its `scNotificationGroupTitle`.
 * Mark-all-read and clear-all buttons inside it act on it alone.
 */
@Directive({
  selector: '[scNotificationGroup]',
  exportAs: 'scNotificationGroup',
  providers: [
    { provide: SC_NOTIFICATION_GROUP, useExisting: ScNotificationGroup },
  ],
  host: {
    role: 'group',
    'data-slot': 'notification-group',
    '[attr.aria-labelledby]': 'titleId',
    '[class]': 'class()',
  },
})
export class ScNotificationGroup {
  readonly id = input.required<string>({ alias: 'scNotificationGroup' });
  readonly classInput = input<string>('', { alias: 'class' });

  /** The id of its title, which names it. */
  readonly titleId = inject(_IdGenerator).getId('sc-notification-group-');

  protected readonly class = computed(() =>
    cn('flex flex-col gap-1', this.classInput()),
  );
}
