import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScItem,
  ScItemContent,
  ScItemDescription,
  ScItemGroup,
  ScItemMedia,
  ScItemSeparator,
  ScItemTitle,
} from '@semantic-components/ui';
import {
  SiBellIcon,
  SiLockIcon,
  SiSettingsIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-basic-item-demo',
  imports: [
    ScItem,
    ScItemContent,
    ScItemDescription,
    ScItemGroup,
    ScItemMedia,
    ScItemSeparator,
    ScItemTitle,
    SiBellIcon,
    SiLockIcon,
    SiSettingsIcon,
  ],
  template: `
    <div sc-item-group class="max-w-md">
      <div sc-item>
        <div sc-item-media variant="icon">
          <svg si-bell-icon></svg>
        </div>
        <div sc-item-content>
          <div sc-item-title>Notifications</div>
          <p sc-item-description>Manage your notification preferences.</p>
        </div>
      </div>

      <div sc-item-separator></div>

      <div sc-item>
        <div sc-item-media variant="icon">
          <svg si-lock-icon></svg>
        </div>
        <div sc-item-content>
          <div sc-item-title>Privacy</div>
          <p sc-item-description>Control your privacy settings.</p>
        </div>
      </div>

      <div sc-item-separator></div>

      <div sc-item>
        <div sc-item-media variant="icon">
          <svg si-settings-icon></svg>
        </div>
        <div sc-item-content>
          <div sc-item-title>Settings</div>
          <p sc-item-description>Configure your account preferences.</p>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicItemDemo {}
