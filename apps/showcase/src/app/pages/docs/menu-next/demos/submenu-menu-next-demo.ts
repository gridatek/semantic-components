import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScMenuNext,
  ScMenuNextContent,
  ScMenuNextItem,
  ScMenuNextPortal,
  ScMenuNextProvider,
  ScMenuNextSeparator,
  ScMenuNextShortcut,
  ScMenuNextTrigger,
} from '@semantic-components/ui';
import { SiChevronRightIcon } from '@semantic-icons/lucide-icons';

/** An item holding a portal opens a submenu: the arrow toward the reading end opens it, the other way closes it. */
@Component({
  selector: 'app-submenu-menu-next-demo',
  imports: [
    ScButton,
    ScMenuNext,
    ScMenuNextContent,
    ScMenuNextItem,
    ScMenuNextPortal,
    ScMenuNextProvider,
    ScMenuNextSeparator,
    ScMenuNextShortcut,
    ScMenuNextTrigger,
    SiChevronRightIcon,
  ],
  template: `
    <div scMenuNextProvider>
      <button scButton scMenuNextTrigger variant="outline">Open</button>
      <ng-template scMenuNextPortal>
        <div scMenuNext>
          <ng-template scMenuNextContent>
            <div scMenuNextItem value="Team">Team</div>
            <div scMenuNextItem value="Invite users">
              Invite users
              <svg siChevronRightIcon></svg>
              <ng-template scMenuNextPortal>
                <div scMenuNext>
                  <ng-template scMenuNextContent>
                    <div scMenuNextItem value="Email">Email</div>
                    <div scMenuNextItem value="Message">Message</div>
                    <div scMenuNextItem value="More options">
                      More options
                      <svg siChevronRightIcon></svg>
                      <ng-template scMenuNextPortal>
                        <div scMenuNext>
                          <ng-template scMenuNextContent>
                            <div scMenuNextItem value="Calendly">Calendly</div>
                            <div scMenuNextItem value="Slack">Slack</div>
                            <div scMenuNextSeparator></div>
                            <div scMenuNextItem value="Webhook">Webhook</div>
                          </ng-template>
                        </div>
                      </ng-template>
                    </div>
                    <div scMenuNextSeparator></div>
                    <div scMenuNextItem value="Advanced…">Advanced…</div>
                  </ng-template>
                </div>
              </ng-template>
            </div>
            <div scMenuNextItem value="New Team">
              New Team
              <span scMenuNextShortcut>⌘+T</span>
            </div>
          </ng-template>
        </div>
      </ng-template>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SubmenuMenuNextDemo {}
