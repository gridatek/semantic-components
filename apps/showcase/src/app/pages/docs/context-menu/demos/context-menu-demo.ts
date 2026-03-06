import {
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
  ScMenuPortal,
  ScMenuSeparator,
} from '@semantic-components/ui';
import { SiChevronRightIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-context-menu-demo',
  imports: [
    ScContextMenu,
    ScContextMenuTrigger,
    ScMenu,
    ScMenuContent,
    ScMenuItem,
    ScMenuPortal,
    ScMenuSeparator,
    SiChevronRightIcon,
  ],
  template: `
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

          <div scMenuItem value="More Tools">
            <span class="flex-1">More Tools</span>
            <svg siChevronRightIcon class="ml-auto size-4"></svg>
            <ng-template scMenuPortal>
              <div scMenu>
                <ng-template scMenuContent>
                  <div scMenuItem value="Save Page As">
                    <span class="flex-1">Save Page As...</span>
                    <span class="text-muted-foreground ml-auto text-xs">
                      ⇧⌘S
                    </span>
                  </div>
                  <div scMenuItem value="Create Shortcut">
                    <span class="flex-1">Create Shortcut...</span>
                  </div>
                  <div scMenuItem value="Name Window">
                    <span class="flex-1">Name Window...</span>
                  </div>
                  <div scMenuSeparator></div>
                  <div scMenuItem value="Developer Tools">
                    <span class="flex-1">Developer Tools</span>
                  </div>
                </ng-template>
              </div>
            </ng-template>
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
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScContextMenuDemo {}
