import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { GroupsContextMenuDemo } from './groups-context-menu-demo';

@Component({
  selector: 'app-groups-context-menu-demo-container',
  imports: [DemoContainer, GroupsContextMenuDemo],
  template: `
    <app-demo-container
      title="Groups"
      demoUrl="/demos/context-menu/groups-context-menu-demo"
      [code]="code"
    >
      <app-groups-context-menu-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class GroupsContextMenuDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
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
  ScKbd,
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
    ScKbd,
  ],
  template: \`
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
                <kbd scKbd>⌘N</kbd>
              </div>
              <div scMenuItem value="Open File">
                Open File
                <kbd scKbd>⌘O</kbd>
              </div>
              <div scMenuItem value="Save">
                Save
                <kbd scKbd>⌘S</kbd>
              </div>
            </div>
            <div scMenuSeparator></div>
            <div scMenuGroup>
              <div scMenuLabel>Edit</div>
              <div scMenuItem value="Undo">
                Undo
                <kbd scKbd>⌘Z</kbd>
              </div>
              <div scMenuItem value="Redo">
                Redo
                <kbd scKbd>⇧⌘Z</kbd>
              </div>
            </div>
            <div scMenuSeparator></div>
            <div scMenuGroup>
              <div scMenuItem value="Cut">
                Cut
                <kbd scKbd>⌘X</kbd>
              </div>
              <div scMenuItem value="Copy">
                Copy
                <kbd scKbd>⌘C</kbd>
              </div>
              <div scMenuItem value="Paste">
                Paste
                <kbd scKbd>⌘V</kbd>
              </div>
            </div>
            <div scMenuSeparator></div>
            <div scMenuGroup>
              <div scMenuItem value="Delete" variant="destructive">
                Delete
                <kbd scKbd>⌫</kbd>
              </div>
            </div>
          </ng-template>
        </div>
      </ng-template>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class GroupsContextMenuDemo {}`;
}
