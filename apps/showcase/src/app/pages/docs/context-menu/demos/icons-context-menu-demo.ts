import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScContextMenuProvider,
  ScContextMenuTrigger,
  ScMenu,
  ScMenuContent,
  ScMenuGroup,
  ScMenuItem,
  ScMenuPortal,
  ScMenuSeparator,
} from '@semantic-components/ui';
import {
  SiClipboardPasteIcon,
  SiCopyIcon,
  SiScissorsIcon,
  SiTrashIcon,
} from '@semantic-icons/lucide-icons';

/** Your icons, sized by the menu. */
@Component({
  selector: 'app-icons-context-menu-demo',
  imports: [
    ScContextMenuProvider,
    ScContextMenuTrigger,
    ScMenu,
    ScMenuContent,
    ScMenuGroup,
    ScMenuItem,
    ScMenuPortal,
    ScMenuSeparator,
    SiClipboardPasteIcon,
    SiCopyIcon,
    SiScissorsIcon,
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
      <ng-template scMenuPortal>
        <div scMenu>
          <ng-template scMenuContent>
            <div scMenuGroup>
              <div scMenuItem value="Copy">
                <svg siCopyIcon></svg>
                Copy
              </div>
              <div scMenuItem value="Cut">
                <svg siScissorsIcon></svg>
                Cut
              </div>
              <div scMenuItem value="Paste">
                <svg siClipboardPasteIcon></svg>
                Paste
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
      </ng-template>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class IconsContextMenuDemo {}
