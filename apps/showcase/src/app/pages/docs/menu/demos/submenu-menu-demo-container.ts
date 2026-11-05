import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SubmenuMenuDemo } from './submenu-menu-demo';

@Component({
  selector: 'app-submenu-menu-demo-container',
  imports: [DemoContainer, SubmenuMenuDemo],
  template: `
    <app-demo-container
      title="Submenu"
      demoUrl="/demos/menu/submenu-menu-demo"
      [code]="code"
    >
      <app-submenu-menu-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SubmenuMenuDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScMenu,
  ScMenuContent,
  ScMenuItem,
  ScMenuPortal,
  ScMenuProvider,
  ScMenuSeparator,
  ScMenuShortcut,
  ScMenuSubmenuIcon,
  ScMenuTrigger,
} from '@semantic-components/ui';
import { SiChevronRightIcon } from '@semantic-icons/lucide-icons';

/** An item holding a portal opens a submenu: the arrow toward the reading end opens it, the other way closes it. */
@Component({
  selector: 'app-submenu-menu-demo',
  imports: [
    ScButton,
    ScMenu,
    ScMenuContent,
    ScMenuItem,
    ScMenuPortal,
    ScMenuSubmenuIcon,
    ScMenuProvider,
    ScMenuSeparator,
    ScMenuShortcut,
    ScMenuTrigger,
    SiChevronRightIcon,
  ],
  template: \`
    <div scMenuProvider>
      <button scButton scMenuTrigger variant="outline">Open</button>
      <ng-template scMenuPortal>
        <div scMenu>
          <ng-template scMenuContent>
            <div scMenuItem value="Team">Team</div>
            <div scMenuItem value="Invite users">
              Invite users
              <svg siChevronRightIcon scMenuSubmenuIcon></svg>
              <ng-template scMenuPortal>
                <div scMenu>
                  <ng-template scMenuContent>
                    <div scMenuItem value="Email">Email</div>
                    <div scMenuItem value="Message">Message</div>
                    <div scMenuItem value="More options">
                      More options
                      <svg siChevronRightIcon scMenuSubmenuIcon></svg>
                      <ng-template scMenuPortal>
                        <div scMenu>
                          <ng-template scMenuContent>
                            <div scMenuItem value="Calendly">Calendly</div>
                            <div scMenuItem value="Slack">Slack</div>
                            <div scMenuSeparator></div>
                            <div scMenuItem value="Webhook">Webhook</div>
                          </ng-template>
                        </div>
                      </ng-template>
                    </div>
                    <div scMenuSeparator></div>
                    <div scMenuItem value="Advanced…">Advanced…</div>
                  </ng-template>
                </div>
              </ng-template>
            </div>
            <div scMenuItem value="New Team">
              New Team
              <span scMenuShortcut>⌘+T</span>
            </div>
          </ng-template>
        </div>
      </ng-template>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SubmenuMenuDemo {}`;
}
