import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScTab, ScTabList, ScTabPanel, ScTabs } from '@semantic-components/ui';

@Component({
  selector: 'app-tabs-usage-demo',
  imports: [ScTabs, ScTabPanel, ScTabList, ScTab],
  template: `
    <div scTabs class="w-[400px]">
      <div scTabList [selectedTab]="'account'" class="grid w-full grid-cols-2">
        <button scTab value="account">Account</button>
        <button scTab value="password">Password</button>
      </div>
      <div scTabPanel value="account">
        <p class="text-muted-foreground p-4 text-sm">
          Make changes to your account here.
        </p>
      </div>
      <div scTabPanel value="password">
        <p class="text-muted-foreground p-4 text-sm">
          Change your password here.
        </p>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsUsageDemo {}
