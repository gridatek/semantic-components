import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { IconsMenuBarDemo } from './icons-menu-bar-demo';

@Component({
  selector: 'app-icons-menu-bar-demo-container',
  imports: [DemoContainer, IconsMenuBarDemo],
  template: `
    <app-demo-container
      title="With Icons"
      demoUrl="/demos/menu-bar/icons-menu-bar-demo"
      [code]="code"
    >
      <app-icons-menu-bar-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class IconsMenuBarDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScMenu,
  ScMenuBar,
  ScMenuBarItem,
  ScMenuContent,
  ScMenuGroup,
  ScMenuItem,
  ScMenuPortal,
  ScMenuSeparator,
  ScMenuShortcut,
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
  selector: 'app-icons-menu-bar-demo',
  imports: [
    ScMenuBar,
    ScMenuBarItem,
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
  template: \`
    <div scMenuBar aria-label="Editor" class="w-72">
      <div scMenuBarItem value="File">
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
      <div scMenuBarItem value="More">
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
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class IconsMenuBarDemo {}`;
}
