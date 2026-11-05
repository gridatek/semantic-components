import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScContextMenu,
  ScContextMenuProvider,
  ScContextMenuTrigger,
  ScMenu,
  ScMenuContent,
  ScMenuGroup,
  ScMenuItem,
  ScMenuSeparator,
} from '@semantic-components/ui';
import {
  SiPencilIcon,
  SiShareIcon,
  SiTrashIcon,
} from '@semantic-icons/lucide-icons';

/** variant="destructive": in the destructive color, its icon too. */
@Component({
  selector: 'app-destructive-context-menu-demo',
  imports: [
    ScContextMenuProvider,
    ScContextMenuTrigger,
    ScContextMenu,
    ScMenu,
    ScMenuContent,
    ScMenuGroup,
    ScMenuItem,
    ScMenuSeparator,
    SiPencilIcon,
    SiShareIcon,
    SiTrashIcon,
  ],
  template: `
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
              <div scMenuItem value="Edit">
                <svg siPencilIcon></svg>
                Edit
              </div>
              <div scMenuItem value="Share">
                <svg siShareIcon></svg>
                Share
              </div>
            </div>
            <div scMenuSeparator></div>
            <div scMenuGroup>
              <div scMenuItem value="Delete" variant="destructive">
                <svg siTrashIcon></svg>
                Delete
              </div>
            </div>
          </ng-template>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DestructiveContextMenuDemo {}
