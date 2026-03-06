import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { EmptyNotificationCenterDemo } from './empty-notification-center-demo';

@Component({
  selector: 'app-empty-notification-center-demo-container',
  imports: [DemoContainer, EmptyNotificationCenterDemo],
  template: `
    <app-demo-container
      title="Empty State"
      demoUrl="/demos/notification-center/empty-notification-center-demo"
      [code]="code"
    >
      <app-empty-notification-center-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyNotificationCenterDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  type Notification,
  ScNotificationCenter,
  ScNotificationCenterContainer,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-empty-notification-center-demo',
  imports: [ScNotificationCenter, ScNotificationCenterContainer],
  template: \`
    <div
      scNotificationCenter
      [(notifications)]="notifications"
      emptyTitle="All caught up!"
      emptyDescription="No new notifications to show."
      class="h-[300px] max-w-md"
    >
      <div scNotificationCenterContainer class="h-full"></div>
    </div>
  \`,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyNotificationCenterDemo {
  readonly notifications = signal<Notification[]>([]);
}`;
}
