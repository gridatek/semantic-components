import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { NotificationCenterUsageDemo } from './notification-center-usage-demo';

@Component({
  selector: 'app-notification-center-usage-demo-container',
  imports: [DemoContainer, NotificationCenterUsageDemo],
  template: `
    <app-demo-container
      title="Usage"
      [code]="code"
      demoUrl="/demos/notification-center/notification-center-usage-demo"
    >
      <app-notification-center-usage-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class NotificationCenterUsageDemoContainer {
  readonly code = `import {
  Component,
  LOCALE_ID,
  ViewEncapsulation,
  computed,
  inject,
  signal,
} from '@angular/core';
import {
  ScBadge,
  ScButton,
  ScEmpty,
  ScEmptyHeader,
  ScEmptyTitle,
  ScItem,
  ScItemActions,
  ScItemBody,
  ScItemDescription,
  ScItemGroup,
  ScItemTitle,
  ScPopover,
  ScPopoverHeader,
  ScPopoverPortal,
  ScPopoverProvider,
  ScPopoverTitle,
  ScPopoverTrigger,
  ScToggleGroup,
  ScToggleGroupItem,
} from '@semantic-components/ui';
import { SiBellIcon, SiCheckIcon, SiXIcon } from '@semantic-icons/lucide-icons';

interface Notice {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly at: Temporal.Instant;
  readonly read: boolean;
}

/**
 * An inbox behind a bell: the unread count on it, All or Unread, each
 * notification marked read or dismissed, and all marked read at once.
 */
@Component({
  selector: 'app-notification-center-usage-demo',
  imports: [
    ScBadge,
    ScButton,
    ScEmpty,
    ScEmptyHeader,
    ScEmptyTitle,
    ScItem,
    ScItemActions,
    ScItemBody,
    ScItemDescription,
    ScItemGroup,
    ScItemTitle,
    ScPopover,
    ScPopoverHeader,
    ScPopoverPortal,
    ScPopoverProvider,
    ScPopoverTitle,
    ScPopoverTrigger,
    ScToggleGroup,
    ScToggleGroupItem,
    SiBellIcon,
    SiCheckIcon,
    SiXIcon,
  ],
  template: \`
    <div scPopoverProvider alignment="end">
      <button
        scButton
        scPopoverTrigger
        variant="outline"
        size="icon"
        class="relative"
      >
        <svg siBellIcon></svg>
        <span class="sr-only">Notifications, {{ unread() }} unread</span>
        @if (unread()) {
          <span
            scBadge
            aria-hidden="true"
            class="absolute -end-2 -top-2 h-5 min-w-5 px-1 tabular-nums"
          >
            {{ unread() }}
          </span>
        }
      </button>
      <ng-template scPopoverPortal>
        <div scPopover class="w-80 gap-3">
          <div scPopoverHeader class="flex-row items-center justify-between">
            <h2 scPopoverTitle>Notifications</h2>
            <button
              scButton
              variant="ghost"
              size="sm"
              [disabled]="!unread()"
              (click)="markAllRead()"
            >
              Mark all as read
            </button>
          </div>
          <div
            scToggleGroup
            variant="outline"
            size="sm"
            aria-label="Show"
            [(value)]="filter"
          >
            <button scToggleGroupItem value="all">All</button>
            <button scToggleGroupItem value="unread">Unread</button>
          </div>
          @if (visible().length) {
            <div scItemGroup role="list" class="max-h-80 overflow-y-auto">
              @for (notice of visible(); track notice.id) {
                <div scItem size="sm" role="listitem">
                  <div scItemBody>
                    <div scItemTitle>
                      @if (!notice.read) {
                        <span
                          aria-hidden="true"
                          class="bg-primary size-2 shrink-0 rounded-full"
                        ></span>
                        <span class="sr-only">Unread:</span>
                      }
                      {{ notice.title }}
                    </div>
                    <p scItemDescription>
                      {{ notice.description }} ·
                      <time [attr.datetime]="notice.at.toString()">{{
                        ago(notice.at)
                      }}</time>
                    </p>
                  </div>
                  <div scItemActions>
                    @if (!notice.read) {
                      <button
                        scButton
                        variant="ghost"
                        size="icon-sm"
                        (click)="markRead(notice.id)"
                      >
                        <svg siCheckIcon></svg>
                        <span class="sr-only">
                          Mark “{{ notice.title }}” as read
                        </span>
                      </button>
                    }
                    <button
                      scButton
                      variant="ghost"
                      size="icon-sm"
                      (click)="dismiss(notice.id)"
                    >
                      <svg siXIcon></svg>
                      <span class="sr-only">Dismiss “{{ notice.title }}”</span>
                    </button>
                  </div>
                </div>
              }
            </div>
          } @else {
            <div scEmpty class="py-6">
              <div scEmptyHeader>
                <h3 scEmptyTitle>You&apos;re all caught up.</h3>
              </div>
            </div>
          }
        </div>
      </ng-template>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class NotificationCenterUsageDemo {
  private readonly relative = new Intl.RelativeTimeFormat(inject(LOCALE_ID), {
    numeric: 'auto',
  });
  private readonly now = Temporal.Now.instant();

  private readonly notifications = signal<readonly Notice[]>([
    {
      id: '1',
      title: 'New comment',
      description: 'Ada replied to your review',
      at: this.now.subtract({ minutes: 5 }),
      read: false,
    },
    {
      id: '2',
      title: 'Deploy finished',
      description: 'Version 2.4.1 is live',
      at: this.now.subtract({ hours: 2 }),
      read: false,
    },
    {
      id: '3',
      title: 'Invoice paid',
      description: 'Acme Inc. paid invoice #1024',
      at: this.now.subtract({ hours: 26 }),
      read: true,
    },
  ]);
  private readonly filter = signal(['all']);

  private readonly unread = computed(
    () => this.notifications().filter((n) => !n.read).length,
  );
  private readonly visible = computed(() =>
    this.filter()[0] === 'unread'
      ? this.notifications().filter((n) => !n.read)
      : this.notifications(),
  );

  /** "5 minutes ago", "yesterday": in the locale. */
  private ago(at: Temporal.Instant): string {
    const minutes = Math.round(
      (at.epochMilliseconds - this.now.epochMilliseconds) / 60_000,
    );
    if (Math.abs(minutes) < 60) return this.relative.format(minutes, 'minute');
    const hours = Math.round(minutes / 60);
    if (Math.abs(hours) < 24) return this.relative.format(hours, 'hour');
    return this.relative.format(Math.round(hours / 24), 'day');
  }

  private markRead(id: string): void {
    this.notifications.update((all) =>
      all.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  }

  private markAllRead(): void {
    this.notifications.update((all) => all.map((n) => ({ ...n, read: true })));
  }

  private dismiss(id: string): void {
    this.notifications.update((all) => all.filter((n) => n.id !== id));
  }
}`;
}
