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
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyNotificationCenterDemoContainer {
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
  selector: 'app-empty-notification-center-demo',
  imports: [ScNotificationCenter, ScNotificationCenterContainer],
  template: \`
    <div
      sc-notification-center
      [(notifications)]="notifications"
      emptyTitle="All caught up!"
      emptyDescription="No new notifications to show."
      class="max-w-md h-[300px]"
    >
      <div sc-notification-center-container class="h-full"></div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyNotificationCenterDemo {
  readonly notifications = signal<Notification[]>([]);
}`;
}
