import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScCard,
  ScCardContent,
  ScCardDescription,
  ScCardHeader,
  ScCardTitle,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-notification-card-demo',
  imports: [
    ScCard,
    ScCardContent,
    ScCardDescription,
    ScCardHeader,
    ScCardTitle,
  ],
  template: `
    <div sc-card class="w-[380px]">
      <div sc-card-header>
        <h3 sc-card-title>Notifications</h3>
        <p sc-card-description>You have 3 unread messages.</p>
      </div>
      <div sc-card-content class="grid gap-4">
        <div class="flex items-center space-x-4 rounded-md border p-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="size-6"
          >
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
          </svg>
          <div class="flex-1 space-y-1">
            <p class="text-sm font-medium leading-none">Push Notifications</p>
            <p class="text-sm text-muted-foreground">
              Send notifications to device.
            </p>
          </div>
        </div>
        <div class="flex items-center space-x-4 rounded-md border p-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="size-6"
          >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          <div class="flex-1 space-y-1">
            <p class="text-sm font-medium leading-none">Email Notifications</p>
            <p class="text-sm text-muted-foreground">
              Receive emails about activity.
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationCardDemo {}
