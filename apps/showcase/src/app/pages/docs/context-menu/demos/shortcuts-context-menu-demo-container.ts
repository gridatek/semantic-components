import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ShortcutsContextMenuDemo } from './shortcuts-context-menu-demo';

@Component({
  selector: 'app-shortcuts-context-menu-demo-container',
  imports: [DemoContainer, ShortcutsContextMenuDemo],
  template: `
    <app-demo-container
      title="Shortcuts"
      demoUrl="/demos/context-menu/shortcuts-context-menu-demo"
      [code]="code"
    >
      <app-shortcuts-context-menu-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ShortcutsContextMenuDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScContextMenu,
  ScContextMenuProvider,
  ScContextMenuTrigger,
  ScMenu,
  ScMenuContent,
  ScMenuGroup,
  ScMenuItem,
  ScMenuSeparator,
  ScMenuShortcut,
} from '@semantic-components/ui';

/** A keyboard hint at the end of each item; the text is yours. */
@Component({
  selector: 'app-shortcuts-context-menu-demo',
  imports: [
    ScContextMenuProvider,
    ScContextMenuTrigger,
    ScContextMenu,
    ScMenu,
    ScMenuContent,
    ScMenuGroup,
    ScMenuItem,
    ScMenuSeparator,
    ScMenuShortcut,
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
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ShortcutsContextMenuDemo {}`;
}
