import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicItemDemo } from './basic-item-demo';

@Component({
  selector: 'app-basic-item-demo-container',
  imports: [DemoContainer, BasicItemDemo],
  template: `
    <app-demo-container
      title="Basic"
      demoUrl="/demos/item/basic-item-demo"
      [code]="code"
    >
      <app-basic-item-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicItemDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScItem,
  ScItemBody,
  ScItemDescription,
  ScItemGroup,
  ScItemMedia,
  ScItemSeparator,
  ScItemTitle,
} from '@semantic-components/ui';
import { SiBellIcon, SiLockIcon, SiSettingsIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-basic-item-demo',
  imports: [
    ScItem,
    ScItemBody,
    ScItemDescription,
    ScItemGroup,
    ScItemMedia,
    ScItemSeparator,
    ScItemTitle,
    SiBellIcon,
    SiLockIcon,
    SiSettingsIcon,
  ],
  template: \`
    <div scItemGroup class="max-w-md">
      <div scItem>
        <div scItemMedia variant="icon">
          <svg si-bell-icon></svg>
        </div>
        <div scItemBody>
          <div scItemTitle>Notifications</div>
          <p scItemDescription>Manage your notification preferences.</p>
        </div>
      </div>

      <div scItemSeparator></div>

      <div scItem>
        <div scItemMedia variant="icon">
          <svg si-lock-icon></svg>
        </div>
        <div scItemBody>
          <div scItemTitle>Privacy</div>
          <p scItemDescription>Control your privacy settings.</p>
        </div>
      </div>

      <div scItemSeparator></div>

      <div scItem>
        <div scItemMedia variant="icon">
          <svg si-settings-icon></svg>
        </div>
        <div scItemBody>
          <div scItemTitle>Settings</div>
          <p scItemDescription>Configure your account preferences.</p>
        </div>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicItemDemo {}`;
}
