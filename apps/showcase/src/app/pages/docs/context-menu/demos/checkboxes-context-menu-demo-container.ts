import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { CheckboxesContextMenuDemo } from './checkboxes-context-menu-demo';

@Component({
  selector: 'app-checkboxes-context-menu-demo-container',
  imports: [DemoContainer, CheckboxesContextMenuDemo],
  template: `
    <app-demo-container
      title="Checkboxes"
      demoUrl="/demos/context-menu/checkboxes-context-menu-demo"
      [code]="code"
    >
      <app-checkboxes-context-menu-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class CheckboxesContextMenuDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScContextMenu,
  ScContextMenuProvider,
  ScContextMenuTrigger,
  ScMenu,
  ScMenuCheckboxItem,
  ScMenuContent,
  ScMenuGroup,
  ScMenuItemIndicator,
} from '@semantic-components/ui';
import { SiCheckIcon } from '@semantic-icons/lucide-icons';

/** Items on or off, [(checked)]: a click toggles one, the menu stays open. */
@Component({
  selector: 'app-checkboxes-context-menu-demo',
  imports: [
    ScContextMenuProvider,
    ScContextMenuTrigger,
    ScContextMenu,
    ScMenu,
    ScMenuCheckboxItem,
    ScMenuContent,
    ScMenuGroup,
    ScMenuItemIndicator,
    SiCheckIcon,
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
      <div scContextMenu>
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
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class CheckboxesContextMenuDemo {
  protected readonly bookmarksBar = signal(true);
  protected readonly fullUrls = signal(false);
  protected readonly developerTools = signal(true);
}`;
}
