import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ScContextMenuDemo } from './context-menu-demo';

@Component({
  selector: 'app-context-menu-demo-container',
  imports: [DemoContainer, ScContextMenuDemo],
  template: `
    <app-demo-container title="Context" [code]="code">
      <app-context-menu-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScContextMenuDemoContainer {
  readonly code = `import {
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
  template: \`
    <div sc-context-menu>
      <div
        sc-context-menu-trigger
        class="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm"
      >
        Right click here
      </div>

      <sc-context-menu-content>
        <span sc-context-menu-label>My Account</span>
        <div sc-context-menu-separator></div>

        <div sc-context-menu-item (select)="onSelect('Back')">
          Back
          <span sc-context-menu-shortcut>⌘[</span>
        </div>
        <div sc-context-menu-item [disabled]="true">
          Forward
          <span sc-context-menu-shortcut>⌘]</span>
        </div>
        <div sc-context-menu-item (select)="onSelect('Reload')">
          Reload
          <span sc-context-menu-shortcut>⌘R</span>
        </div>

        <div sc-context-menu-separator></div>

        <!-- Submenu -->
        <div sc-context-menu-sub>
          <div sc-context-menu-sub-trigger>More Tools</div>
          <div sc-context-menu-sub-content>
            <div sc-context-menu-item (select)="onSelect('Save Page As')">
              Save Page As...
              <span sc-context-menu-shortcut>⇧⌘S</span>
            </div>
            <div sc-context-menu-item (select)="onSelect('Create Shortcut')">
              Create Shortcut...
            </div>
            <div sc-context-menu-item (select)="onSelect('Name Window')">
              Name Window...
            </div>
            <div sc-context-menu-separator></div>
            <div sc-context-menu-item (select)="onSelect('Developer Tools')">
              Developer Tools
            </div>
          </div>
        </div>

        <div sc-context-menu-separator></div>

        <div sc-context-menu-item (select)="onSelect('Show Bookmarks Bar')">
          Show Bookmarks Bar
          <span sc-context-menu-shortcut>⇧⌘B</span>
        </div>
        <div sc-context-menu-item (select)="onSelect('Show Full URLs')">
          Show Full URLs
        </div>
      </sc-context-menu-content>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScContextMenuDemo {
  onSelect(item: string): void {
    console.log('Selected:', item);
  }
}`;
}
