import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FlatNotificationCenterDemo } from './flat-notification-center-demo';

@Component({
  selector: 'app-flat-notification-center-demo-container',
  imports: [DemoContainer, FlatNotificationCenterDemo],
  template: `
    <app-demo-container
      title="Flat List"
      demoUrl="/demos/notification-center/flat-notification-center-demo"
      [code]="code"
    >
      <app-flat-notification-center-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlatNotificationCenterDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScNotificationCenter,
  ScNotificationCenterContainer,
  type Notification,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-flat-notification-center-demo',
  imports: [ScNotificationCenter, ScNotificationCenterContainer],
  template: \`
    <div
      sc-notification-center
      [(notifications)]="notifications"
      [showFilters]="true"
      class="max-w-md h-[400px]"
    >
      <div sc-notification-center-container class="h-full"></div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlatNotificationCenterDemo {
  readonly notifications = signal<Notification[]>([
    {
      id: 'f1',
      title: 'Build completed successfully',
      description: 'Project my-app built in 45 seconds.',
      type: 'success',
      timestamp: new Date(Date.now() - 2 * 60000),
      read: false,
    },
    {
      id: 'f2',
      title: 'Deployment in progress',
      description: 'Deploying to production environment...',
      type: 'info',
      timestamp: new Date(Date.now() - 15 * 60000),
      read: false,
    },
    {
      id: 'f3',
      title: 'Security alert',
      description: 'Unusual login attempt detected from a new location.',
      type: 'warning',
      timestamp: new Date(Date.now() - 45 * 60000),
      read: true,
      action: { label: 'Review activity' },
    },
    {
      id: 'f4',
      title: 'Scheduled maintenance',
      description: 'System maintenance scheduled for tonight at 2 AM.',
      type: 'info',
      timestamp: new Date(Date.now() - 4 * 3600000),
      read: true,
    },
    {
      id: 'f5',
      title: 'New team member joined',
      description: 'Carol has joined the Engineering team.',
      type: 'message',
      timestamp: new Date(Date.now() - 2 * 24 * 3600000),
      read: true,
      avatar: 'https://i.pravatar.cc/150?u=carol',
    },
  ]);
}`;
}
