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
  host: { class: 'block w-full' },
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
    <div scContextMenu class="h-[150px] w-[300px]">
      <div scContextMenuTrigger>Right click here</div>

      <div scMenu>
        <ng-template scMenuContent>
          <div scMenuItem value="Back">
            <span class="flex-1">Back</span>
            <span class="text-muted-foreground ml-auto text-xs">⌘[</span>
          </div>
          <div scMenuItem value="Forward" [disabled]="true">
            <span class="flex-1">Forward</span>
            <span class="text-muted-foreground ml-auto text-xs">⌘]</span>
          </div>
          <div scMenuItem value="Reload">
            <span class="flex-1">Reload</span>
            <span class="text-muted-foreground ml-auto text-xs">⌘R</span>
          </div>

          <div scMenuSeparator></div>

          <div scMenuItem value="Save Page As">
            <span class="flex-1">Save Page As...</span>
            <span class="text-muted-foreground ml-auto text-xs">⇧⌘S</span>
          </div>
          <div scMenuItem value="Create Shortcut">
            <span class="flex-1">Create Shortcut...</span>
          </div>
          <div scMenuItem value="Name Window">
            <span class="flex-1">Name Window...</span>
          </div>

          <div scMenuSeparator></div>

          <div scMenuItem value="Show Bookmarks Bar">
            <span class="flex-1">Show Bookmarks Bar</span>
            <span class="text-muted-foreground ml-auto text-xs">⇧⌘B</span>
          </div>
          <div scMenuItem value="Show Full URLs">
            <span class="flex-1">Show Full URLs</span>
          </div>
        </ng-template>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContextMenuAriaDemo {}`;
}
