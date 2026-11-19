import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScKbd,
  ScMenu,
  ScMenuContent,
  ScMenuItem,
  ScMenuPortal,
  ScMenuSeparator,
  ScMenuSubmenuIcon,
  ScMenubar,
  ScMenubarItem,
} from '@semantic-components/ui';
import { SiChevronRightIcon } from '@semantic-icons/lucide-icons';

/** An item holding a portal opens a submenu beside it. */
@Component({
  selector: 'app-submenu-menubar-demo',
  imports: [
    ScMenubar,
    ScMenubarItem,
    ScMenu,
    ScMenuContent,
    ScMenuItem,
    ScMenuPortal,
    ScMenuSubmenuIcon,
    ScMenuSeparator,
    ScKbd,
    SiChevronRightIcon,
  ],
  template: `
    <div scMenubar aria-label="Editor" class="w-72">
      <div scMenubarItem value="File">
        File
        <ng-template scMenuPortal>
          <div scMenu>
            <ng-template scMenuContent>
              <div scMenuItem value="Share">
                Share
                <svg siChevronRightIcon scMenuSubmenuIcon></svg>
                <ng-template scMenuPortal>
                  <div scMenu>
                    <ng-template scMenuContent>
                      <div scMenuItem value="Email link">Email link</div>
                      <div scMenuItem value="Messages">Messages</div>
                      <div scMenuItem value="Notes">Notes</div>
                    </ng-template>
                  </div>
                </ng-template>
              </div>
              <div scMenuSeparator></div>
              <div scMenuItem value="Print...">
                Print...
                <kbd scKbd>⌘P</kbd>
              </div>
            </ng-template>
          </div>
        </ng-template>
      </div>
      <div scMenubarItem value="Edit">
        Edit
        <ng-template scMenuPortal>
          <div scMenu>
            <ng-template scMenuContent>
              <div scMenuItem value="Undo">
                Undo
                <kbd scKbd>⌘Z</kbd>
              </div>
              <div scMenuItem value="Redo">
                Redo
                <kbd scKbd>⇧⌘Z</kbd>
              </div>
              <div scMenuSeparator></div>
              <div scMenuItem value="Find">
                Find
                <svg siChevronRightIcon scMenuSubmenuIcon></svg>
                <ng-template scMenuPortal>
                  <div scMenu>
                    <ng-template scMenuContent>
                      <div scMenuItem value="Find...">Find...</div>
                      <div scMenuItem value="Find Next">Find Next</div>
                      <div scMenuItem value="Find Previous">Find Previous</div>
                    </ng-template>
                  </div>
                </ng-template>
              </div>
              <div scMenuSeparator></div>
              <div scMenuItem value="Cut">Cut</div>
              <div scMenuItem value="Copy">Copy</div>
              <div scMenuItem value="Paste">Paste</div>
            </ng-template>
          </div>
        </ng-template>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SubmenuMenubarDemo {}
