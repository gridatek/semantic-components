import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { NotificationCardDemo } from './notification-card-demo';

@Component({
  selector: 'app-notification-card-demo-container',
  imports: [DemoContainer, NotificationCardDemo],
  template: `
    <app-demo-container
      title="Notification Card"
      demoUrl="/demos/card/notification-card-demo"
      [code]="code"
    >
      <app-notification-card-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationCardDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScCard,
  ScCardBody,
  ScCardDescription,
  ScCardHeader,
  ScCardTitle,
} from '@semantic-components/ui';
import { SiBellIcon, SiMailIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-notification-card-demo',
  imports: [
    ScCard,
    ScCardBody,
    ScCardDescription,
    ScCardHeader,
    ScCardTitle,
    SiBellIcon,
    SiMailIcon,
  ],
  template: \`
    <div sc-card class="w-[380px]">
      <div sc-card-header>
        <h3 sc-card-title>Notifications</h3>
        <p sc-card-description>You have 3 unread messages.</p>
      </div>
      <div sc-card-body class="grid gap-4">
        <div class="flex items-center space-x-4 rounded-md border p-4">
          <svg si-bell-icon class="size-6"></svg>
          <div class="flex-1 space-y-1">
            <p class="text-sm font-medium leading-none">Push Notifications</p>
            <p class="text-sm text-muted-foreground">
              Send notifications to device.
            </p>
          </div>
        </div>
        <div class="flex items-center space-x-4 rounded-md border p-4">
          <svg si-mail-icon class="size-6"></svg>
          <div class="flex-1 space-y-1">
            <p class="text-sm font-medium leading-none">Email Notifications</p>
            <p class="text-sm text-muted-foreground">
              Receive emails about activity.
            </p>
          </div>
        </div>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationCardDemo {}`;
}
