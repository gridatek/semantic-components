import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { IconsMenuNextDemo } from './icons-menu-next-demo';

@Component({
  selector: 'app-icons-menu-next-demo-container',
  imports: [DemoContainer, IconsMenuNextDemo],
  template: `
    <app-demo-container
      title="Icons"
      demoUrl="/demos/menu-next/icons-menu-next-demo"
      [code]="code"
    >
      <app-icons-menu-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class IconsMenuNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScMenuNext,
  ScMenuNextContent,
  ScMenuNextItem,
  ScMenuNextPortal,
  ScMenuNextProvider,
  ScMenuNextSeparator,
  ScMenuNextTrigger,
} from '@semantic-components/ui';
import {
  SiCreditCardIcon,
  SiLogOutIcon,
  SiSettingsIcon,
  SiUserIcon,
} from '@semantic-icons/lucide-icons';

/** Your icons, sized by the menu. */
@Component({
  selector: 'app-icons-menu-next-demo',
  imports: [
    ScButton,
    ScMenuNext,
    ScMenuNextContent,
    ScMenuNextItem,
    ScMenuNextPortal,
    ScMenuNextProvider,
    ScMenuNextSeparator,
    ScMenuNextTrigger,
    SiCreditCardIcon,
    SiLogOutIcon,
    SiSettingsIcon,
    SiUserIcon,
  ],
  template: \`
    <div scMenuNextProvider>
      <button scButton scMenuNextTrigger variant="outline">Open</button>
      <ng-template scMenuNextPortal>
        <div scMenuNext>
          <ng-template scMenuNextContent>
            <div scMenuNextItem value="Profile">
              <svg siUserIcon></svg>
              Profile
            </div>
            <div scMenuNextItem value="Billing">
              <svg siCreditCardIcon></svg>
              Billing
            </div>
            <div scMenuNextItem value="Settings">
              <svg siSettingsIcon></svg>
              Settings
            </div>
            <div scMenuNextSeparator></div>
            <div scMenuNextItem value="Log out" variant="destructive">
              <svg siLogOutIcon></svg>
              Log out
            </div>
          </ng-template>
        </div>
      </ng-template>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class IconsMenuNextDemo {}`;
}
