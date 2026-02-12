import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import type { Notification, NotificationAction } from './notification-types';

@Component({
  selector: 'sc-notification-item',
  template: `
    <div
      [class]="itemClass()"
      role="article"
      [attr.aria-label]="notification().title"
      tabindex="0"
      (click)="onItemClick()"
      (keydown.enter)="onItemClick()"
      (keydown.space)="onItemClick(); $event.preventDefault()"
    >
      <!-- Unread indicator -->
      @if (!notification().read) {
        <div
          class="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary"
          aria-label="Unread"
        ></div>
      }

      <!-- Icon or Avatar -->
      <div class="flex-shrink-0 ml-4">
        @if (notification().avatar) {
          <img
            [src]="notification().avatar"
            [alt]="notification().title"
            class="w-10 h-10 rounded-full object-cover"
          />
        } @else {
          <div [class]="iconContainerClass()">
            <span [innerHTML]="typeIcon()"></span>
          </div>
        }
      </div>

      <!-- Content -->
      <div class="flex-1 min-w-0 ml-3">
        <div class="flex items-start justify-between gap-2">
          <p
            class="text-sm font-medium text-foreground truncate"
            [class.font-semibold]="!notification().read"
          >
            {{ notification().title }}
          </p>
          <span class="text-xs text-muted-foreground whitespace-nowrap">
            {{ formatTime(notification().timestamp) }}
          </span>
        </div>

        @if (notification().description) {
          <p class="mt-0.5 text-sm text-muted-foreground line-clamp-2">
            {{ notification().description }}
          </p>
        }

        <!-- Action button -->
        @if (notification().action) {
          <button
            type="button"
            class="mt-2 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
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
          class="flex-shrink-0 p-1 ml-2 rounded-full opacity-0 group-hover:opacity-100 hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
          (click)="onDismiss($event)"
          aria-label="Dismiss notification"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      }
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScNotificationItem {
  readonly notification = input.required<Notification>();
  readonly showDismiss = input(true);
  readonly class = input<string>('');

  readonly markRead = output<boolean>();
  readonly dismiss = output<void>();
  readonly actionClick = output<NotificationAction>();
  readonly itemClick = output<void>();

  protected readonly itemClass = computed(() =>
    cn(
      'group relative flex items-start p-3 pr-2 rounded-lg cursor-pointer',
      'hover:bg-muted/50 transition-colors',
      'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
      !this.notification().read && 'bg-primary/5',
      this.class(),
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

  protected typeIcon(): string {
    const type = this.notification().type;
    const customIcon = this.notification().icon;

    if (customIcon) {
      return customIcon;
    }

    switch (type) {
      case 'success':
        return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`;
      case 'warning':
        return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>`;
      case 'error':
        return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>`;
      case 'message':
        return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>`;
      case 'info':
      default:
        return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`;
    }
  }

  protected formatTime(date: Date): string {
    const now = new Date();
    const d = new Date(date);
    const diffMs = now.getTime() - d.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) {
      return 'Just now';
    } else if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else if (diffDays < 7) {
      return `${diffDays}d ago`;
    } else {
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  }

  protected onItemClick(): void {
    if (!this.notification().read) {
      this.markRead.emit(true);
    }
    this.itemClick.emit();
  }

  protected onActionClick(event: MouseEvent, action: NotificationAction): void {
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
