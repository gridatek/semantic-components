import { Component, ViewEncapsulation } from '@angular/core';
import { UsageCode } from '../../../../components/usage-code/usage-code';
import { MenubarUsageDemo } from './menubar-usage-demo';

@Component({
  selector: 'app-menubar-usage-demo-container',
  imports: [UsageCode, MenubarUsageDemo],
  template: `
    <app-usage-code [code]="code">
      <ng-template><app-menubar-usage-demo /></ng-template>
    </app-usage-code>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class MenubarUsageDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScMenu,
  ScMenuCheckboxItem,
  ScMenuContent,
  ScMenuGroup,
  ScMenuItem,
  ScMenuItemIndicator,
  ScMenuPortal,
  ScMenuRadioGroup,
  ScMenuRadioItem,
  ScMenuSeparator,
  ScMenuShortcut,
  ScMenuSubmenuIcon,
  ScMenubar,
  ScMenubarItem,
} from '@semantic-components/ui';
import { SiCheckIcon, SiChevronRightIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-menubar-usage-demo',
  imports: [
    ScMenubar,
    ScMenubarItem,
    ScMenu,
    ScMenuCheckboxItem,
    ScMenuContent,
    ScMenuGroup,
    ScMenuItem,
    ScMenuItemIndicator,
    ScMenuPortal,
    ScMenuSubmenuIcon,
    ScMenuRadioGroup,
    ScMenuRadioItem,
    ScMenuSeparator,
    ScMenuShortcut,
    SiCheckIcon,
    SiChevronRightIcon,
  ],
  template: \`
    <div scMenubar aria-label="Browser" class="w-72">
      <div scMenubarItem value="File">
        File
        <ng-template scMenuPortal>
          <div scMenu>
            <ng-template scMenuContent>
              <div scMenuGroup>
                <div scMenuItem value="New Tab">
                  New Tab
                  <span scMenuShortcut>⌘T</span>
                </div>
                <div scMenuItem value="New Window">
                  New Window
                  <span scMenuShortcut>⌘N</span>
                </div>
                <div scMenuItem value="New Incognito Window" [disabled]="true">
                  New Incognito Window
                </div>
              </div>
              <div scMenuSeparator></div>
              <div scMenuGroup>
                <div scMenuItem value="Share">
                  Share
                  <svg siChevronRightIcon scMenuSubmenuIcon></svg>
                  <ng-template scMenuPortal>
                    <div scMenu>
                      <ng-template scMenuContent>
                        <div scMenuGroup>
                          <div scMenuItem value="Email link">Email link</div>
                          <div scMenuItem value="Messages">Messages</div>
                          <div scMenuItem value="Notes">Notes</div>
                        </div>
                      </ng-template>
                    </div>
                  </ng-template>
                </div>
              </div>
              <div scMenuSeparator></div>
              <div scMenuGroup>
                <div scMenuItem value="Print...">
                  Print...
                  <span scMenuShortcut>⌘P</span>
                </div>
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
              <div scMenuGroup>
                <div scMenuItem value="Undo">
                  Undo
                  <span scMenuShortcut>⌘Z</span>
                </div>
                <div scMenuItem value="Redo">
                  Redo
                  <span scMenuShortcut>⇧⌘Z</span>
                </div>
              </div>
              <div scMenuSeparator></div>
              <div scMenuGroup>
                <div scMenuItem value="Find">
                  Find
                  <svg siChevronRightIcon scMenuSubmenuIcon></svg>
                  <ng-template scMenuPortal>
                    <div scMenu>
                      <ng-template scMenuContent>
                        <div scMenuGroup>
                          <div scMenuItem value="Search the web">
                            Search the web
                          </div>
                        </div>
                        <div scMenuSeparator></div>
                        <div scMenuGroup>
                          <div scMenuItem value="Find...">Find...</div>
                          <div scMenuItem value="Find Next">Find Next</div>
                          <div scMenuItem value="Find Previous">
                            Find Previous
                          </div>
                        </div>
                      </ng-template>
                    </div>
                  </ng-template>
                </div>
              </div>
              <div scMenuSeparator></div>
              <div scMenuGroup>
                <div scMenuItem value="Cut">Cut</div>
                <div scMenuItem value="Copy">Copy</div>
                <div scMenuItem value="Paste">Paste</div>
              </div>
            </ng-template>
          </div>
        </ng-template>
      </div>
      <div scMenubarItem value="View">
        View
        <ng-template scMenuPortal>
          <div scMenu class="w-44">
            <ng-template scMenuContent>
              <div scMenuGroup>
                <div scMenuCheckboxItem [(checked)]="bookmarksBar">
                  <span scMenuItemIndicator><svg siCheckIcon></svg></span>
                  Bookmarks Bar
                </div>
                <div scMenuCheckboxItem [(checked)]="fullUrls">
                  <span scMenuItemIndicator><svg siCheckIcon></svg></span>
                  Full URLs
                </div>
              </div>
              <div scMenuSeparator></div>
              <div scMenuGroup>
                <div scMenuItem value="Reload" inset>
                  Reload
                  <span scMenuShortcut>⌘R</span>
                </div>
                <div scMenuItem value="Force Reload" [disabled]="true" inset>
                  Force Reload
                  <span scMenuShortcut>⇧⌘R</span>
                </div>
              </div>
              <div scMenuSeparator></div>
              <div scMenuGroup>
                <div scMenuItem value="Toggle Fullscreen" inset>
                  Toggle Fullscreen
                </div>
              </div>
              <div scMenuSeparator></div>
              <div scMenuGroup>
                <div scMenuItem value="Hide Sidebar" inset>Hide Sidebar</div>
              </div>
            </ng-template>
          </div>
        </ng-template>
      </div>
      <div scMenubarItem value="Profiles">
        Profiles
        <ng-template scMenuPortal>
          <div scMenu>
            <ng-template scMenuContent>
              <div scMenuRadioGroup [(value)]="profile">
                <div scMenuRadioItem value="andy">
                  <span scMenuItemIndicator><svg siCheckIcon></svg></span>
                  Andy
                </div>
                <div scMenuRadioItem value="benoit">
                  <span scMenuItemIndicator><svg siCheckIcon></svg></span>
                  Benoit
                </div>
                <div scMenuRadioItem value="luis">
                  <span scMenuItemIndicator><svg siCheckIcon></svg></span>
                  Luis
                </div>
              </div>
              <div scMenuSeparator></div>
              <div scMenuGroup>
                <div scMenuItem value="Edit..." inset>Edit...</div>
              </div>
              <div scMenuSeparator></div>
              <div scMenuGroup>
                <div scMenuItem value="Add Profile..." inset>
                  Add Profile...
                </div>
              </div>
            </ng-template>
          </div>
        </ng-template>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class MenubarUsageDemo {
  protected readonly bookmarksBar = signal(false);
  protected readonly fullUrls = signal(true);
  protected readonly profile = signal('benoit');
}`;
}
