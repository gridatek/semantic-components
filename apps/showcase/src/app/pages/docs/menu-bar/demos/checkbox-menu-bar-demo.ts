import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScMenu,
  ScMenuBar,
  ScMenuBarItem,
  ScMenuCheckboxItem,
  ScMenuContent,
  ScMenuItem,
  ScMenuItemIndicator,
  ScMenuPortal,
  ScMenuSeparator,
  ScMenuShortcut,
} from '@semantic-components/ui';
import { SiCheckIcon } from '@semantic-icons/lucide-icons';

/** Items on or off, [(checked)]; in a menu bar the check is at the start. */
@Component({
  selector: 'app-checkbox-menu-bar-demo',
  imports: [
    ScMenuBar,
    ScMenuBarItem,
    ScMenu,
    ScMenuCheckboxItem,
    ScMenuContent,
    ScMenuItem,
    ScMenuItemIndicator,
    ScMenuPortal,
    ScMenuSeparator,
    ScMenuShortcut,
    SiCheckIcon,
  ],
  template: `
    <div scMenuBar aria-label="Browser" class="w-72">
      <div scMenuBarItem value="View">
        View
        <ng-template scMenuPortal>
          <div scMenu class="w-64">
            <ng-template scMenuContent>
              <div scMenuCheckboxItem [(checked)]="bookmarksBar">
                <span scMenuItemIndicator><svg siCheckIcon></svg></span>
                Always Show Bookmarks Bar
              </div>
              <div scMenuCheckboxItem [(checked)]="fullUrls">
                <span scMenuItemIndicator><svg siCheckIcon></svg></span>
                Always Show Full URLs
              </div>
              <div scMenuSeparator></div>
              <div scMenuItem value="Reload" inset>
                Reload
                <span scMenuShortcut>⌘R</span>
              </div>
              <div scMenuItem value="Force Reload" [disabled]="true" inset>
                Force Reload
                <span scMenuShortcut>⇧⌘R</span>
              </div>
            </ng-template>
          </div>
        </ng-template>
      </div>
      <div scMenuBarItem value="Format">
        Format
        <ng-template scMenuPortal>
          <div scMenu>
            <ng-template scMenuContent>
              <div scMenuCheckboxItem [(checked)]="strikethrough">
                <span scMenuItemIndicator><svg siCheckIcon></svg></span>
                Strikethrough
              </div>
              <div scMenuCheckboxItem [(checked)]="code">
                <span scMenuItemIndicator><svg siCheckIcon></svg></span>
                Code
              </div>
              <div scMenuCheckboxItem [(checked)]="superscript">
                <span scMenuItemIndicator><svg siCheckIcon></svg></span>
                Superscript
              </div>
            </ng-template>
          </div>
        </ng-template>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class CheckboxMenuBarDemo {
  protected readonly bookmarksBar = signal(false);
  protected readonly fullUrls = signal(true);
  protected readonly strikethrough = signal(true);
  protected readonly code = signal(false);
  protected readonly superscript = signal(false);
}
