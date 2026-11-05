import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScMenu,
  ScMenuContent,
  ScMenuGroup,
  ScMenuItem,
  ScMenuPortal,
  ScMenuSeparator,
  ScMenuShortcut,
  ScMenubar,
  ScMenubarItem,
} from '@semantic-components/ui';
import {
  SiCircleQuestionMarkIcon,
  SiFileIcon,
  SiFolderIcon,
  SiSaveIcon,
  SiSettingsIcon,
  SiTrashIcon,
} from '@semantic-icons/lucide-icons';

/** Your icons, sized by the menu. */
@Component({
  selector: 'app-icons-menubar-demo',
  imports: [
    ScMenubar,
    ScMenubarItem,
    ScMenu,
    ScMenuContent,
    ScMenuGroup,
    ScMenuItem,
    ScMenuPortal,
    ScMenuSeparator,
    ScMenuShortcut,
    SiCircleQuestionMarkIcon,
    SiFileIcon,
    SiFolderIcon,
    SiSaveIcon,
    SiSettingsIcon,
    SiTrashIcon,
  ],
  template: `
    <div scMenubar aria-label="Editor" class="w-72">
      <div scMenubarItem value="File">
        File
        <ng-template scMenuPortal>
          <div scMenu>
            <ng-template scMenuContent>
              <div scMenuItem value="New File">
                <svg siFileIcon></svg>
                New File
                <span scMenuShortcut>⌘N</span>
              </div>
              <div scMenuItem value="Open Folder">
                <svg siFolderIcon></svg>
                Open Folder
              </div>
              <div scMenuSeparator></div>
              <div scMenuItem value="Save">
                <svg siSaveIcon></svg>
                Save
                <span scMenuShortcut>⌘S</span>
              </div>
            </ng-template>
          </div>
        </ng-template>
      </div>
      <div scMenubarItem value="More">
        More
        <ng-template scMenuPortal>
          <div scMenu>
            <ng-template scMenuContent>
              <div scMenuGroup>
                <div scMenuItem value="Settings">
                  <svg siSettingsIcon></svg>
                  Settings
                </div>
                <div scMenuItem value="Help">
                  <svg siCircleQuestionMarkIcon></svg>
                  Help
                </div>
                <div scMenuSeparator></div>
                <div scMenuItem value="Delete" variant="destructive">
                  <svg siTrashIcon></svg>
                  Delete
                </div>
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
export class IconsMenubarDemo {}
