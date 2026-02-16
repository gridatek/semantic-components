import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScContextMenu,
  ScContextMenuContent,
  ScContextMenuItem,
  ScContextMenuLabel,
  ScContextMenuSeparator,
  ScContextMenuShortcut,
  ScContextMenuSub,
  ScContextMenuSubContent,
  ScContextMenuSubTrigger,
  ScContextMenuTrigger,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-context-menu-demo',
  imports: [
    ScContextMenu,
    ScContextMenuContent,
    ScContextMenuItem,
    ScContextMenuLabel,
    ScContextMenuSeparator,
    ScContextMenuShortcut,
    ScContextMenuSub,
    ScContextMenuSubContent,
    ScContextMenuSubTrigger,
    ScContextMenuTrigger,
  ],
  template: `
    <div scContextMenu>
      <div
        scContextMenuTrigger
        class="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm"
      >
        Right click here
      </div>

      <scContextMenuContent>
        <span scContextMenuLabel>My Account</span>
        <div scContextMenuSeparator></div>

        <div scContextMenuItem (select)="onSelect('Back')">
          Back
          <span scContextMenuShortcut>⌘[</span>
        </div>
        <div scContextMenuItem [disabled]="true">
          Forward
          <span scContextMenuShortcut>⌘]</span>
        </div>
        <div scContextMenuItem (select)="onSelect('Reload')">
          Reload
          <span scContextMenuShortcut>⌘R</span>
        </div>

        <div scContextMenuSeparator></div>

        <!-- Submenu -->
        <div scContextMenuSub>
          <div scContextMenuSubTrigger>More Tools</div>
          <div scContextMenuSubContent>
            <div scContextMenuItem (select)="onSelect('Save Page As')">
              Save Page As...
              <span scContextMenuShortcut>⇧⌘S</span>
            </div>
            <div scContextMenuItem (select)="onSelect('Create Shortcut')">
              Create Shortcut...
            </div>
            <div scContextMenuItem (select)="onSelect('Name Window')">
              Name Window...
            </div>
            <div scContextMenuSeparator></div>
            <div scContextMenuItem (select)="onSelect('Developer Tools')">
              Developer Tools
            </div>
          </div>
        </div>

        <div scContextMenuSeparator></div>

        <div scContextMenuItem (select)="onSelect('Show Bookmarks Bar')">
          Show Bookmarks Bar
          <span scContextMenuShortcut>⇧⌘B</span>
        </div>
        <div scContextMenuItem (select)="onSelect('Show Full URLs')">
          Show Full URLs
        </div>
      </sc-context-menu-content>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScContextMenuDemo {
  onSelect(item: string): void {
    console.log('Selected:', item);
  }
}
