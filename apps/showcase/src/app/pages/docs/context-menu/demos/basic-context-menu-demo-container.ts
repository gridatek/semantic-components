import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicContextMenuDemo } from './basic-context-menu-demo';

@Component({
  selector: 'app-basic-context-menu-demo-container',
  imports: [DemoContainer, BasicContextMenuDemo],
  template: `
    <app-demo-container
      title="Basic"
      demoUrl="/demos/context-menu/basic-context-menu-demo"
      [code]="code"
    >
      <app-basic-context-menu-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicContextMenuDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScContextMenuProvider,
  ScContextMenuTrigger,
  ScMenu,
  ScMenuContent,
  ScMenuGroup,
  ScMenuItem,
  ScMenuPortal,
} from '@semantic-components/ui';

/** A right-click (a long press on touch, Shift+F10 or the Menu key on the focused area) opens the menu at the pointer. */
@Component({
  selector: 'app-basic-context-menu-demo',
  imports: [
    ScContextMenuProvider,
    ScContextMenuTrigger,
    ScMenu,
    ScMenuContent,
    ScMenuGroup,
    ScMenuItem,
    ScMenuPortal,
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
              <div scMenuItem value="Back">Back</div>
              <div scMenuItem value="Forward" [disabled]="true">Forward</div>
              <div scMenuItem value="Reload">Reload</div>
            </div>
          </ng-template>
        </div>
      </ng-template>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicContextMenuDemo {}`;
}
