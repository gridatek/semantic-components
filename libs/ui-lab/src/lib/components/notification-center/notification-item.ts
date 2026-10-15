import {
  Component,
  LOCALE_ID,
  ViewEncapsulation,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import {
  SiCheckIcon,
  SiCircleXIcon,
  SiInfoIcon,
  SiMessageSquareIcon,
  SiTriangleAlertIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';
import { SC_NOTIFICATION_CENTER } from './notification-center';
import type {
  ScNotification,
  ScNotificationAction,
} from './notification-types';

@Component({
  selector: 'div[scNotificationItem]',
  imports: [
    SiXIcon,
    SiCheckIcon,
    SiTriangleAlertIcon,
    SiCircleXIcon,
    SiMessageSquareIcon,
    SiInfoIcon,
  ],
  template: `
    <!-- Unread indicator -->
    @if (!notification().read) {
      <div
        class="bg-primary absolute start-2 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full"
        aria-hidden="true"
      ></div>
    }

    <!-- Icon or Avatar -->
    <div class="ms-4 shrink-0">
      @if (notification().avatar) {
        <img
          [src]="notification().avatar"
          [alt]="notification().title"
          class="h-10 w-10 rounded-full object-cover"
        />
      } @else {
        <div [class]="iconContainerClass()">
          @if (notification().icon) {
            <span [innerHTML]="notification().icon"></span>
          } @else {
            @switch (notification().type) {
              @case ('success') {
                <svg siCheckIcon class="size-5"></svg>
              }
              @case ('warning') {
                <svg siTriangleAlertIcon class="size-5"></svg>
              }
              @case ('error') {
                <svg siCircleXIcon class="size-5"></svg>
              }
              @case ('message') {
                <svg siMessageSquareIcon class="size-5"></svg>
              }
              @default {
                <svg siInfoIcon class="size-5"></svg>
              }
            }
          }
        </div>
      }
    </div>

    <!-- Content -->
    <div class="ms-3 min-w-0 flex-1">
      <div class="flex items-start justify-between gap-2">
        <p
          class="text-foreground truncate text-sm font-medium"
          [class.font-semibold]="!notification().read"
        >
          @if (!notification().read) {
            <span class="sr-only">{{ center.labels().unread }}</span>
          }
          {{ notification().title }}
        </p>
        <span class="text-muted-foreground text-xs whitespace-nowrap">
          {{ formatTime(notification().timestamp) }}
        </span>
      </div>

      @if (notification().description) {
        <p class="text-muted-foreground mt-0.5 line-clamp-2 text-sm">
          {{ notification().description }}
        </p>
      }

      <!-- Action button -->
      @if (notification().action) {
        <button
          type="button"
          class="text-primary hover:text-primary/80 mt-2 text-xs font-medium transition-colors"
          (click)="onActionClick($event, notification().action!)"
        >
          {{ notification().action!.label }}
        </button>
      }
    </div>

    <!-- Dismiss button -->
    @if (showDismiss()) {
      <button
        type="button"
        class="hover:bg-muted text-muted-foreground hover:text-foreground ms-2 shrink-0 rounded-full p-1 opacity-0 transition-all group-focus-within:opacity-100 group-hover:opacity-100 focus-visible:opacity-100"
        (click)="onDismiss($event)"
        [attr.aria-label]="center.labels().dismiss"
      >
        <svg siXIcon class="size-4"></svg>
      </button>
    }
  `,
  host: {
    '[class]': 'class()',
    role: 'article',
    '[attr.aria-label]': 'notification().title',
    tabindex: '0',
    '(click)': 'onItemClick()',
    '(keydown.enter)': 'onItemKey($event)',
    '(keydown.space)': 'onItemKey($event)',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScNotificationItem {
  protected readonly center = inject(SC_NOTIFICATION_CENTER);
  readonly classInput = input<string>('', { alias: 'class' });
  readonly notification = input.required<ScNotification>();
  readonly showDismiss = input(true);

  readonly markRead = output<boolean>();
  readonly dismiss = output<void>();
  readonly actionClick = output<ScNotificationAction>();
  readonly itemClick = output<void>();

  protected readonly class = computed(() =>
    cn(
      'group relative flex items-start p-3 pe-2 rounded-lg cursor-pointer',
      'hover:bg-muted/50 transition-colors',
      'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
      !this.notification().read && 'bg-primary/5',
      this.classInput(),
    ),
  );

  protected readonly iconContainerClass = computed(() => {
    const type = this.notification().type;
    const base = 'w-10 h-10 rounded-full flex items-center justify-center';

    switch (type) {
      case 'success':
        return cn(base, 'bg-green-500/10 text-green-600 dark:text-green-400');
      case 'warning':
        return cn(
          base,
          'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
        );
      case 'error':
        return cn(base, 'bg-red-500/10 text-red-600 dark:text-red-400');
      case 'message':
        return cn(base, 'bg-blue-500/10 text-blue-600 dark:text-blue-400');
      case 'info':
      default:
        return cn(base, 'bg-muted text-muted-foreground');
    }
  });

  private readonly locale = inject(LOCALE_ID);

  /** How long ago, in the app's language; a date after a week. */
  protected formatTime(date: Date): string {
    const then = new Date(date);
    const minutes = Math.round((then.getTime() - Date.now()) / 60000);
    const relative = new Intl.RelativeTimeFormat(this.locale, {
      numeric: 'auto',
    });
    if (minutes > -60) return relative.format(minutes, 'minute');
    if (minutes > -24 * 60) {
      return relative.format(Math.round(minutes / 60), 'hour');
    }
    if (minutes > -7 * 24 * 60) {
      return relative.format(Math.round(minutes / (24 * 60)), 'day');
    }
    return then.toLocaleDateString(this.locale, {
      month: 'short',
      day: 'numeric',
    });
  }

  /** Enter/Space on the item itself — not on its own buttons. */
  protected onItemKey(event: Event): void {
    if (event.target !== event.currentTarget) return;
    event.preventDefault();
    this.onItemClick();
  }

  protected onItemClick(): void {
    if (!this.notification().read) {
      this.markRead.emit(true);
    }
    this.itemClick.emit();
  }

  protected onActionClick(
    event: MouseEvent,
    action: ScNotificationAction,
  ): void {
    event.stopPropagation();
    this.actionClick.emit(action);

    if (action.handler) {
      action.handler();
    }
  }

  protected onDismiss(event: MouseEvent): void {
    event.stopPropagation();
    this.dismiss.emit();
  }
}
