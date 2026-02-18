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
  ScItem,
  ScItemBody,
  ScItemDescription,
  ScItemMedia,
  ScItemTitle,
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
    ScItem,
    ScItemBody,
    ScItemDescription,
    ScItemMedia,
    ScItemTitle,
    SiBellIcon,
    SiMailIcon,
  ],
  template: \`
    <div scCard class="w-[380px]">
      <div scCardHeader>
        <h3 scCardTitle>Notifications</h3>
        <p scCardDescription>You have 3 unread messages.</p>
      </div>
      <div scCardBody class="grid gap-4">
        <div scItem variant="outline">
          <div scItemMedia variant="icon">
            <svg siBellIcon></svg>
          </div>
          <div scItemBody>
            <div scItemTitle>Push Notifications</div>
            <p scItemDescription>Send notifications to device.</p>
          </div>
        </div>
        <div scItem variant="outline">
          <div scItemMedia variant="icon">
            <svg siMailIcon></svg>
          </div>
          <div scItemBody>
            <div scItemTitle>Email Notifications</div>
            <p scItemDescription>Receive emails about activity.</p>
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
