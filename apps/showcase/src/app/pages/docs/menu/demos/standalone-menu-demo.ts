import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScFrame,
  ScMenu,
  ScMenuContent,
  ScMenuItem,
  ScMenuPortal,
  ScMenuSeparator,
} from '@semantic-components/ui';
import {
  SiChevronRightIcon,
  SiClipboardPasteIcon,
  SiCopyIcon,
  SiScissorsIcon,
  SiShareIcon,
  SiTrashIcon,
} from '@semantic-icons/lucide-icons';

/**
 * A menu shown on the page, with no trigger: one tab stop, the arrows inside,
 * a submenu beside it.
 * Its name is yours (aria-label); itemSelected gives the chosen item's value.
 */
@Component({
  selector: 'app-standalone-menu-demo',
  imports: [
    ScFrame,
    ScMenu,
    ScMenuContent,
    ScMenuItem,
    ScMenuPortal,
    ScMenuSeparator,
    SiChevronRightIcon,
    SiClipboardPasteIcon,
    SiCopyIcon,
    SiScissorsIcon,
    SiShareIcon,
    SiTrashIcon,
  ],
  template: `
    <div class="flex flex-col items-center gap-4">
      <div
        scMenu
        aria-label="Edit"
        class="w-48"
        (itemSelected)="chosen.set($event)"
      >
        <ng-template scMenuContent>
          <div scMenuItem value="Cut">
            <svg siScissorsIcon></svg>
            Cut
          </div>
          <div scMenuItem value="Copy">
            <svg siCopyIcon></svg>
            Copy
          </div>
          <div scMenuItem value="Paste">
            <svg siClipboardPasteIcon></svg>
            Paste
          </div>
          <div scMenuSeparator></div>
          <div scMenuItem value="Share">
            <svg siShareIcon></svg>
            Share
            <svg siChevronRightIcon></svg>
            <ng-template scMenuPortal>
              <div scMenu>
                <ng-template scMenuContent>
                  <div scMenuItem value="Email">Email</div>
                  <div scMenuItem value="Message">Message</div>
                  <div scMenuItem value="Copy link">Copy link</div>
                </ng-template>
              </div>
            </ng-template>
          </div>
          <div scMenuSeparator></div>
          <div scMenuItem value="Delete" variant="destructive">
            <svg siTrashIcon></svg>
            Delete
          </div>
        </ng-template>
      </div>
      <p scFrame class="w-48 p-4 text-sm">
        Chosen: {{ chosen() ?? 'nothing yet' }}
      </p>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class StandaloneMenuDemo {
  protected readonly chosen = signal<string | null>(null);
}
