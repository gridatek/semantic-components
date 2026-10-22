import {
  DestroyRef,
  Directive,
  InjectionToken,
  afterNextRender,
  computed,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import type {
  ScNotification,
  ScNotificationDayGroup,
  ScNotificationFilterValue,
} from './notification-types';

export const SC_NOTIFICATION_CENTER = new InjectionToken<
  ScNotificationCenter<ScNotification>
>('SC_NOTIFICATION_CENTER');

/**
 * The notifications and what is done with them: the list (`[(notifications)]`,
 * your own type extending `ScNotification`), the filter, the counts. Its
 * parts read and change it; write the rest — the header, the list, each
 * notification's content — with them (`#center="scNotificationCenter"`).
 */
@Directive({
  selector: '[scNotificationCenter]',
  exportAs: 'scNotificationCenter',
  providers: [
    {
      provide: SC_NOTIFICATION_CENTER,
      useExisting: ScNotificationCenter,
    },
  ],
  host: {
    'data-slot': 'notification-center',
    '[class]': 'class()',
  },
})
export class ScNotificationCenter<T extends ScNotification = ScNotification> {
  readonly notifications = model<readonly T[]>([]);
  /** Which are shown: `all` or `unread`. */
  readonly filter = model<ScNotificationFilterValue>('all');
  readonly classInput = input<string>('', { alias: 'class' });

  /** Now, moving on every minute: the times follow it. */
  readonly now = signal(Temporal.Now.instant());

  /** The notifications the filter shows. */
  readonly visible = computed(() => {
    const filter = this.filter();
    return filter === 'all'
      ? this.notifications()
      : this.notifications().filter((n) => !n.read);
  });

  readonly unreadCount = computed(
    () => this.notifications().filter((n) => !n.read).length,
  );

  /**
   * The shown notifications by day, in the user's time zone — the latest day
   * first, each day's in their order. Title each with `scNotificationDay`.
   */
  readonly days = computed<ScNotificationDayGroup<T>[]>(() => {
    const zone = Temporal.Now.timeZoneId();
    const days = new Map<string, ScNotificationDayGroup<T>>();
    for (const notification of this.visible()) {
      const day = notification.timestamp.toZonedDateTimeISO(zone).toPlainDate();
      const key = day.toString();
      const found = days.get(key);
      if (found) found.notifications.push(notification);
      else days.set(key, { day, notifications: [notification] });
    }
    return [...days.values()].sort((a, b) =>
      Temporal.PlainDate.compare(b.day, a.day),
    );
  });

  protected readonly class = computed(() =>
    cn('flex flex-col', this.classInput()),
  );

  constructor() {
    // In the browser only: the server renders the time once.
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const timer = setInterval(
        () => this.now.set(Temporal.Now.instant()),
        60_000,
      );
      destroyRef.onDestroy(() => clearInterval(timer));
    });
  }

  markRead(id: string, read = true): void {
    this.notifications.update((list) =>
      list.map((n) => (n.id === id ? { ...n, read } : n)),
    );
  }

  markAllRead(): void {
    this.notifications.update((list) =>
      list.map((n) => (n.read ? n : { ...n, read: true })),
    );
  }

  dismiss(id: string): void {
    this.notifications.update((list) => list.filter((n) => n.id !== id));
  }

  /** Removes every notification. */
  clear(): void {
    this.notifications.set([]);
  }
}
