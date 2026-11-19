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
  private readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScContextMenu,
  ScContextMenuTrigger,
  ScFrame,
  ScMenu,
  ScMenuContent,
  ScMenuGroup,
  ScMenuItem,
  ScMenuPortal,
  ScMenuSeparator,
  ScKbd,
} from '@semantic-components/ui';

/** A keyboard hint at the end of each item; the text is yours. */
@Component({
  selector: 'app-shortcuts-context-menu-demo',
  imports: [
    ScContextMenu,
    ScContextMenuTrigger,
    ScFrame,
    ScMenu,
    ScMenuContent,
    ScMenuGroup,
    ScMenuItem,
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
              <div scMenuItem value="Back">
                Back
                <kbd scKbd>⌘[</kbd>
              </div>
              <div scMenuItem value="Forward" [disabled]="true">
                Forward
                <kbd scKbd>⌘]</kbd>
              </div>
              <div scMenuItem value="Reload">
                Reload
                <kbd scKbd>⌘R</kbd>
              </div>
            </div>
            <div scMenuSeparator></div>
            <div scMenuGroup>
              <div scMenuItem value="Save">
                Save
                <kbd scKbd>⌘S</kbd>
              </div>
              <div scMenuItem value="Save As...">
                Save As...
                <kbd scKbd>⇧⌘S</kbd>
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
export class ShortcutsContextMenuDemo {}`;
}
