import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScContextMenu,
  ScContextMenuTrigger,
  ScFrame,
  ScMenu,
  ScMenuCheckboxItem,
  ScMenuContent,
  ScMenuGroup,
  ScMenuItemIndicator,
  ScMenuPortal,
} from '@semantic-components/ui';
import { SiCheckIcon } from '@semantic-icons/lucide-icons';

/** Items on or off, [(checked)]: a click toggles one, the menu stays open. */
@Component({
  selector: 'app-checkboxes-context-menu-demo',
  imports: [
    ScContextMenu,
    ScContextMenuTrigger,
    ScFrame,
    ScMenu,
    ScMenuCheckboxItem,
    ScMenuContent,
    ScMenuGroup,
    ScMenuItemIndicator,
    ScMenuPortal,
    SiCheckIcon,
  ],
  template: `
    <div scContextMenu class="w-full max-w-xs">
      <div
        scContextMenuTrigger
        scFrame
        class="flex aspect-video w-full items-center justify-center text-sm"
      >
        <span class="hidden pointer-fine:inline-block">Right click here</span>
        <span class="hidden pointer-coarse:inline-block">Long press here</span>
      </div>
      <ng-template scMenuPortal>
        <div scMenu>
          <ng-template scMenuContent>
            <div scMenuGroup>
              <div scMenuCheckboxItem [(checked)]="bookmarksBar">
                <span scMenuItemIndicator><svg siCheckIcon></svg></span>
                Show Bookmarks Bar
              </div>
              <div scMenuCheckboxItem [(checked)]="fullUrls">
                <span scMenuItemIndicator><svg siCheckIcon></svg></span>
                Show Full URLs
              </div>
              <div scMenuCheckboxItem [(checked)]="developerTools">
                <span scMenuItemIndicator><svg siCheckIcon></svg></span>
                Show Developer Tools
              </div>
            </div>
          </ng-template>
        </div>
      </ng-template>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class CheckboxesContextMenuDemo {
  protected readonly bookmarksBar = signal(true);
  protected readonly fullUrls = signal(false);
  protected readonly developerTools = signal(true);
}
