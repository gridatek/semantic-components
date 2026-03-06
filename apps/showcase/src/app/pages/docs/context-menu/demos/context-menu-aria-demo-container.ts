import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ContextMenuAriaDemo } from './context-menu-aria-demo';

@Component({
  selector: 'app-context-menu-aria-demo-container',
  imports: [DemoContainer, ContextMenuAriaDemo],
  template: `
    <app-demo-container
      title="Angular Aria"
      [code]="code"
      demoUrl="/demos/context-menu/context-menu-aria-demo"
    >
      <app-context-menu-aria-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContextMenuAriaDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScContextMenu,
  ScContextMenuTrigger,
  ScMenu,
  ScMenuContent,
  ScMenuItem,
  ScMenuSeparator,
} from '@semantic-components/ui';

@Component({
  selector: 'app-context-menu-aria-demo',
  imports: [
    ScContextMenu,
    ScContextMenuTrigger,
    ScMenu,
    ScMenuContent,
    ScMenuItem,
    ScMenuSeparator,
  ],
  template: \`
    <div scContextMenu>
      <div
        scContextMenuTrigger
        class="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm"
      >
        Right click here
      </div>

      <div scMenu class="invisible fixed">
        <ng-template scMenuContent>
          <div scMenuItem value="Back">
            <span class="flex-1">Back</span>
            <span class="text-muted-foreground ml-auto text-xs">⌘[</span>
          </div>
          <div scMenuItem value="Reload">
            <span class="flex-1">Reload</span>
            <span class="text-muted-foreground ml-auto text-xs">⌘R</span>
          </div>
          <div scMenuSeparator></div>
          <div scMenuItem value="Show Bookmarks Bar">
            <span class="flex-1">Show Bookmarks Bar</span>
          </div>
        </ng-template>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContextMenuAriaDemo {}`;
}
