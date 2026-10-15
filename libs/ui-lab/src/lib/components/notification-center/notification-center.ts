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
    { provide: SC_NOTIFICATION_CENTER, useExisting: ScNotificationCenter },
  ],
  host: {
    'data-slot': 'notification-center',
    '[class]': 'class()',
  },
})
export class ScNotificationCenter<T extends ScNotification = ScNotification> {
  readonly notifications = model<readonly T[]>([]);
  /** Which are shown: `all`, `unread` or `read`. */
  readonly filter = model<ScNotificationFilterValue>('all');
  readonly classInput = input<string>('', { alias: 'class' });

  /** Now, moving on every minute: the times follow it. */
  readonly now = signal(Date.now());

  /** The notifications the filter shows. */
  readonly visible = computed(() => {
    const filter = this.filter();
    return this.notifications().filter(
      (n) => filter === 'all' || n.read === (filter === 'read'),
    );
  });

  readonly unreadCount = computed(
    () => this.notifications().filter((n) => !n.read).length,
  );

  protected readonly class = computed(() =>
    cn('flex flex-col', this.classInput()),
  );

  constructor() {
    // In the browser only: the server renders the time once.
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const timer = setInterval(() => this.now.set(Date.now()), 60_000);
      destroyRef.onDestroy(() => clearInterval(timer));
    });
  }

  /** The shown notifications of one group. */
  visibleIn(group: string): readonly T[] {
    return this.visible().filter((n) => n.group === group);
  }

  /** The unread notifications of one group, or of all. */
  unreadIn(group?: string): number {
    return this.notifications().filter(
      (n) => !n.read && (group === undefined || n.group === group),
    ).length;
  }

  markRead(id: string, read = true): void {
    this.notifications.update((list) =>
      list.map((n) => (n.id === id ? { ...n, read } : n)),
    );
  }

  /** Marks every notification read — or only those of a group. */
  markAllRead(group?: string): void {
    this.notifications.update((list) =>
      list.map((n) =>
        group === undefined || n.group === group ? { ...n, read: true } : n,
      ),
    );
  }

  dismiss(id: string): void {
    this.notifications.update((list) => list.filter((n) => n.id !== id));
  }

  /** Removes every notification — or only those of a group. */
  clear(group?: string): void {
    this.notifications.update((list) =>
      group === undefined ? [] : list.filter((n) => n.group !== group),
    );
  }
}
