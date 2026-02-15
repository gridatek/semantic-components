import {
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
  template: `
    <div sc-card class="w-[380px]">
      <div sc-card-header>
        <h3 sc-card-title>Notifications</h3>
        <p sc-card-description>You have 3 unread messages.</p>
      </div>
      <div sc-card-body class="grid gap-4">
        <div sc-item variant="outline">
          <div sc-item-media variant="icon">
            <svg si-bell-icon></svg>
          </div>
          <div sc-item-body>
            <div sc-item-title>Push Notifications</div>
            <p sc-item-description>Send notifications to device.</p>
          </div>
        </div>
        <div sc-item variant="outline">
          <div sc-item-media variant="icon">
            <svg si-mail-icon></svg>
          </div>
          <div sc-item-body>
            <div sc-item-title>Email Notifications</div>
            <p sc-item-description>Receive emails about activity.</p>
          </div>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationCardDemo {}
