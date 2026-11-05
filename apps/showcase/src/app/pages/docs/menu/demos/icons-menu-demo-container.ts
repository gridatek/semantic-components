import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { IconsMenuDemo } from './icons-menu-demo';

@Component({
  selector: 'app-icons-menu-demo-container',
  imports: [DemoContainer, IconsMenuDemo],
  template: `
    <app-demo-container
      title="Icons"
      demoUrl="/demos/menu/icons-menu-demo"
      [code]="code"
    >
      <app-icons-menu-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class IconsMenuDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScMenu,
  ScMenuContent,
  ScMenuItem,
  ScMenuPortal,
  ScMenuProvider,
  ScMenuSeparator,
  ScMenuTrigger,
} from '@semantic-components/ui';
import {
  SiCreditCardIcon,
  SiLogOutIcon,
  SiSettingsIcon,
  SiUserIcon,
} from '@semantic-icons/lucide-icons';

/** Your icons, sized by the menu. */
@Component({
  selector: 'app-icons-menu-demo',
  imports: [
    ScButton,
    ScMenu,
    ScMenuContent,
    ScMenuItem,
    ScMenuPortal,
    ScMenuProvider,
    ScMenuSeparator,
    ScMenuTrigger,
    SiCreditCardIcon,
    SiLogOutIcon,
    SiSettingsIcon,
    SiUserIcon,
  ],
  template: \`
    <div scMenuProvider>
      <button scButton scMenuTrigger variant="outline">Open</button>
      <ng-template scMenuPortal>
        <div scMenu>
          <ng-template scMenuContent>
            <div scMenuItem value="Profile">
              <svg siUserIcon></svg>
              Profile
            </div>
            <div scMenuItem value="Billing">
              <svg siCreditCardIcon></svg>
              Billing
            </div>
            <div scMenuItem value="Settings">
              <svg siSettingsIcon></svg>
              Settings
            </div>
            <div scMenuSeparator></div>
            <div scMenuItem value="Log out" variant="destructive">
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
export class IconsMenuDemo {}`;
}
