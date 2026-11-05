import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScContextMenu,
  ScContextMenuTrigger,
  ScFrame,
  ScMenu,
  ScMenuContent,
  ScMenuGroup,
  ScMenuItemIndicator,
  ScMenuLabel,
  ScMenuPortal,
  ScMenuRadioGroup,
  ScMenuRadioItem,
  ScMenuSeparator,
} from '@semantic-components/ui';
import { SiCheckIcon } from '@semantic-icons/lucide-icons';

/** One of a group on, [(value)] on the group: a click chooses it, the menu stays open. */
@Component({
  selector: 'app-radio-context-menu-demo',
  imports: [
    ScContextMenu,
    ScContextMenuTrigger,
    ScFrame,
    ScMenu,
    ScMenuContent,
    ScMenuGroup,
    ScMenuItemIndicator,
    ScMenuLabel,
    ScMenuPortal,
    ScMenuRadioGroup,
    ScMenuRadioItem,
    ScMenuSeparator,
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
              <div scMenuLabel>People</div>
              <div scMenuRadioGroup [(value)]="user">
                <div scMenuRadioItem value="pedro">
                  <span scMenuItemIndicator><svg siCheckIcon></svg></span>
                  Pedro Duarte
                </div>
                <div scMenuRadioItem value="colm">
                  <span scMenuItemIndicator><svg siCheckIcon></svg></span>
                  Colm Tuite
                </div>
              </div>
            </div>
            <div scMenuSeparator></div>
            <div scMenuGroup>
              <div scMenuLabel>Theme</div>
              <div scMenuRadioGroup [(value)]="theme">
                <div scMenuRadioItem value="light">
                  <span scMenuItemIndicator><svg siCheckIcon></svg></span>
                  Light
                </div>
                <div scMenuRadioItem value="dark">
                  <span scMenuItemIndicator><svg siCheckIcon></svg></span>
                  Dark
                </div>
                <div scMenuRadioItem value="system">
                  <span scMenuItemIndicator><svg siCheckIcon></svg></span>
                  System
                </div>
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
export class RadioContextMenuDemo {
  protected readonly user = signal('pedro');
  protected readonly theme = signal('light');
}
