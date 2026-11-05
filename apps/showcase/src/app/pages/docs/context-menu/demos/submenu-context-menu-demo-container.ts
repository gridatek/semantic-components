import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SubmenuContextMenuDemo } from './submenu-context-menu-demo';

@Component({
  selector: 'app-submenu-context-menu-demo-container',
  imports: [DemoContainer, SubmenuContextMenuDemo],
  template: `
    <app-demo-container
      title="Submenu"
      demoUrl="/demos/context-menu/submenu-context-menu-demo"
      [code]="code"
    >
      <app-submenu-context-menu-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SubmenuContextMenuDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScContextMenuProvider,
  ScContextMenuTrigger,
  ScMenu,
  ScMenuContent,
  ScMenuGroup,
  ScMenuItem,
  ScMenuPortal,
  ScMenuSeparator,
  ScMenuShortcut,
  ScMenuSubmenuIcon,
} from '@semantic-components/ui';
import { SiChevronRightIcon } from '@semantic-icons/lucide-icons';

/** An item holding a portal opens a submenu beside it. */
@Component({
  selector: 'app-submenu-context-menu-demo',
  imports: [
    ScContextMenuProvider,
    ScContextMenuTrigger,
    ScMenuSubmenuIcon,
    ScMenu,
    ScMenuContent,
    ScMenuGroup,
    ScMenuItem,
    ScMenuPortal,
    ScMenuSeparator,
    ScMenuShortcut,
    SiChevronRightIcon,
  ],
  template: \`
    <div scContextMenuProvider class="w-full max-w-xs">
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
              <div scMenuItem value="Copy">
                Copy
                <span scMenuShortcut>⌘C</span>
              </div>
              <div scMenuItem value="Cut">
                Cut
                <span scMenuShortcut>⌘X</span>
              </div>
            </div>
            <div scMenuItem value="More Tools">
              More Tools
              <svg siChevronRightIcon scMenuSubmenuIcon></svg>
              <ng-template scMenuPortal>
                <div scMenu>
                  <ng-template scMenuContent>
                    <div scMenuGroup>
                      <div scMenuItem value="Save Page...">Save Page...</div>
                      <div scMenuItem value="Create Shortcut...">
                        Create Shortcut...
                      </div>
                      <div scMenuItem value="Name Window...">
                        Name Window...
                      </div>
                    </div>
                    <div scMenuSeparator></div>
                    <div scMenuGroup>
                      <div scMenuItem value="Developer Tools">
                        Developer Tools
                      </div>
                    </div>
                    <div scMenuSeparator></div>
                    <div scMenuGroup>
                      <div scMenuItem value="Delete" variant="destructive">
                        Delete
                      </div>
                    </div>
                  </ng-template>
                </div>
              </ng-template>
            </div>
          </ng-template>
        </div>
      </ng-template>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SubmenuContextMenuDemo {}`;
}
