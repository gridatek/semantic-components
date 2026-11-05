import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScContextMenu,
  ScContextMenuTrigger,
  ScFrame,
  ScMenu,
  ScMenuContent,
  ScMenuGroup,
  ScMenuItem,
  ScMenuLabel,
  ScMenuPortal,
  ScMenuSeparator,
  ScMenuShortcut,
} from '@semantic-components/ui';

/** Groups named by their label, lines between them. */
@Component({
  selector: 'app-groups-context-menu-demo',
  imports: [
    ScContextMenu,
    ScContextMenuTrigger,
    ScFrame,
    ScMenu,
    ScMenuContent,
    ScMenuGroup,
    ScMenuItem,
    ScMenuLabel,
    ScMenuPortal,
    ScMenuSeparator,
    ScMenuShortcut,
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
              <div scMenuLabel>File</div>
              <div scMenuItem value="New File">
                New File
                <span scMenuShortcut>⌘N</span>
              </div>
              <div scMenuItem value="Open File">
                Open File
                <span scMenuShortcut>⌘O</span>
              </div>
              <div scMenuItem value="Save">
                Save
                <span scMenuShortcut>⌘S</span>
              </div>
            </div>
            <div scMenuSeparator></div>
            <div scMenuGroup>
              <div scMenuLabel>Edit</div>
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
              <div scMenuItem value="Cut">
                Cut
                <span scMenuShortcut>⌘X</span>
              </div>
              <div scMenuItem value="Copy">
                Copy
                <span scMenuShortcut>⌘C</span>
              </div>
              <div scMenuItem value="Paste">
                Paste
                <span scMenuShortcut>⌘V</span>
              </div>
            </div>
            <div scMenuSeparator></div>
            <div scMenuGroup>
              <div scMenuItem value="Delete" variant="destructive">
                Delete
                <span scMenuShortcut>⌫</span>
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
export class GroupsContextMenuDemo {}
