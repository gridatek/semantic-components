import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SubmenuMenubarDemo } from './submenu-menubar-demo';

@Component({
  selector: 'app-submenu-menubar-demo-container',
  imports: [DemoContainer, SubmenuMenubarDemo],
  template: `
    <app-demo-container
      title="Submenu"
      demoUrl="/demos/menubar/submenu-menubar-demo"
      [code]="code"
    >
      <app-submenu-menubar-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SubmenuMenubarDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScMenu,
  ScMenubar,
  ScMenubarItem,
  ScMenuContent,
  ScMenuItem,
  ScMenuPortal,
  ScMenuSeparator,
  ScMenuShortcut,
} from '@semantic-components/ui';
import { SiChevronRightIcon } from '@semantic-icons/lucide-icons';

/** An item holding a portal opens a submenu beside it. */
@Component({
  selector: 'app-submenu-menubar-demo',
  imports: [
    ScMenubar,
    ScMenubarItem,
    ScMenu,
    ScMenuContent,
    ScMenuItem,
    ScMenuPortal,
    ScMenuSeparator,
    ScMenuShortcut,
    SiChevronRightIcon,
  ],
  template: \`
    <div scMenubar aria-label="Editor" class="w-72">
      <div scMenubarItem value="File">
        File
        <ng-template scMenuPortal>
          <div scMenu>
            <ng-template scMenuContent>
              <div scMenuItem value="Share">
                Share
                <svg siChevronRightIcon></svg>
                <ng-template scMenuPortal>
                  <div scMenu>
                    <ng-template scMenuContent>
                      <div scMenuItem value="Email link">Email link</div>
                      <div scMenuItem value="Messages">Messages</div>
                      <div scMenuItem value="Notes">Notes</div>
                    </ng-template>
                  </div>
                </ng-template>
              </div>
              <div scMenuSeparator></div>
              <div scMenuItem value="Print...">
                Print...
                <span scMenuShortcut>⌘P</span>
              </div>
            </ng-template>
          </div>
        </ng-template>
      </div>
      <div scMenubarItem value="Edit">
        Edit
        <ng-template scMenuPortal>
          <div scMenu>
            <ng-template scMenuContent>
              <div scMenuItem value="Undo">
                Undo
                <span scMenuShortcut>⌘Z</span>
              </div>
              <div scMenuItem value="Redo">
                Redo
                <span scMenuShortcut>⇧⌘Z</span>
              </div>
              <div scMenuSeparator></div>
              <div scMenuItem value="Find">
                Find
                <svg siChevronRightIcon></svg>
                <ng-template scMenuPortal>
                  <div scMenu>
                    <ng-template scMenuContent>
                      <div scMenuItem value="Find...">Find...</div>
                      <div scMenuItem value="Find Next">Find Next</div>
                      <div scMenuItem value="Find Previous">Find Previous</div>
                    </ng-template>
                  </div>
                </ng-template>
              </div>
              <div scMenuSeparator></div>
              <div scMenuItem value="Cut">Cut</div>
              <div scMenuItem value="Copy">Copy</div>
              <div scMenuItem value="Paste">Paste</div>
            </ng-template>
          </div>
        </ng-template>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SubmenuMenubarDemo {}`;
}
