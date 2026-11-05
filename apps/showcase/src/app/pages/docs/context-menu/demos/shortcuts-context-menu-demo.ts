import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScContextMenu,
  ScContextMenuTrigger,
  ScMenu,
  ScMenuContent,
  ScMenuGroup,
  ScMenuItem,
  ScMenuPortal,
  ScMenuSeparator,
  ScMenuShortcut,
} from '@semantic-components/ui';

/** A keyboard hint at the end of each item; the text is yours. */
@Component({
  selector: 'app-shortcuts-context-menu-demo',
  imports: [
    ScContextMenu,
    ScContextMenuTrigger,
    ScMenu,
    ScMenuContent,
    ScMenuGroup,
    ScMenuItem,
    ScMenuPortal,
    ScMenuSeparator,
    ScMenuShortcut,
  ],
  template: `
    <div scContextMenu class="w-full max-w-xs">
      <div
        scContextMenuTrigger
        class="flex aspect-video w-full items-center justify-center rounded-xl border border-dashed text-sm"
      >
        <span class="hidden pointer-fine:inline-block">Right click here</span>
        <span class="hidden pointer-coarse:inline-block">Long press here</span>
      </div>
      <ng-template scMenuPortal>
        <div scMenu>
          <ng-template scMenuContent>
            <div scMenuGroup>
              <div scMenuItem value="Back">
                Back
                <span scMenuShortcut>⌘[</span>
              </div>
              <div scMenuItem value="Forward" [disabled]="true">
                Forward
                <span scMenuShortcut>⌘]</span>
              </div>
              <div scMenuItem value="Reload">
                Reload
                <span scMenuShortcut>⌘R</span>
              </div>
            </div>
            <div scMenuSeparator></div>
            <div scMenuGroup>
              <div scMenuItem value="Save">
                Save
                <span scMenuShortcut>⌘S</span>
              </div>
              <div scMenuItem value="Save As...">
                Save As...
                <span scMenuShortcut>⇧⌘S</span>
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
export class ShortcutsContextMenuDemo {}
