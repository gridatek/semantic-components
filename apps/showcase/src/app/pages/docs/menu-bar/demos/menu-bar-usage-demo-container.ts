import { Component, ViewEncapsulation, inject } from '@angular/core';
import {
  ScCodeBlock,
  ScCodeBlockActions,
  ScCodeBlockContent,
  ScCodeBlockCopy,
  ScCodeBlockHeader,
  ScCodeBlockTitle,
} from '@semantic-components/ui/code-block';
import { SiCheckIcon, SiCopyIcon } from '@semantic-icons/lucide-icons';
import { DevOnly } from '../../../../components/dev-only/dev-only';
import { ConfigService } from '../../../../services/config-service';
import { MenuBarUsageDemo } from './menu-bar-usage-demo';

@Component({
  selector: 'app-menu-bar-usage-demo-container',
  imports: [
    DevOnly,
    ScCodeBlock,
    ScCodeBlockHeader,
    ScCodeBlockTitle,
    ScCodeBlockActions,
    ScCodeBlockCopy,
    ScCodeBlockContent,
    SiCheckIcon,
    SiCopyIcon,
    MenuBarUsageDemo,
  ],
  template: `
    <div scCodeBlock>
      <div scCodeBlockHeader>
        <div scCodeBlockTitle>angular-ts</div>
        <div scCodeBlockActions>
          <button [scCodeBlockCopy]="code" #copy="scCodeBlockCopy">
            @if (copy.copied()) {
              <svg siCheckIcon></svg>
            } @else {
              <svg siCopyIcon></svg>
            }
            <span class="sr-only">Copy to clipboard</span>
          </button>
        </div>
      </div>
      <pre scCodeBlockContent [code]="code" language="angular-ts"></pre>
    </div>

    @if (devMode()) {
      <app-dev-only>
        <app-menu-bar-usage-demo />
      </app-dev-only>
    }
  `,
  host: { class: 'block w-full space-y-4' },
  encapsulation: ViewEncapsulation.None,
})
export class MenuBarUsageDemoContainer {
  private readonly config = inject(ConfigService);

  protected readonly devMode = this.config.devMode;

  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScMenu,
  ScMenuBar,
  ScMenuBarItem,
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
} from '@semantic-components/ui';
import { SiCheckIcon, SiChevronRightIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-menu-bar-usage-demo',
  imports: [
    ScMenuBar,
    ScMenuBarItem,
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
    SiCheckIcon,
    SiChevronRightIcon,
  ],
  template: \`
    <div scMenuBar aria-label="Browser" class="w-72">
      <div scMenuBarItem value="File">
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
                  <svg siChevronRightIcon></svg>
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
      <div scMenuBarItem value="Edit">
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
                  <svg siChevronRightIcon></svg>
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
      <div scMenuBarItem value="View">
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
      <div scMenuBarItem value="Profiles">
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
export class MenuBarUsageDemo {
  protected readonly bookmarksBar = signal(false);
  protected readonly fullUrls = signal(true);
  protected readonly profile = signal('benoit');
}`;
}
