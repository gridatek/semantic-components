import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScContextMenu,
  ScContextMenuProvider,
  ScContextMenuTrigger,
  ScMenu,
  ScMenuContent,
  ScMenuGroup,
  ScMenuItem,
} from '@semantic-components/ui';

/** side: where the menu opens from the pointer — its reading end (default), its start, above or below. */
@Component({
  selector: 'app-sides-context-menu-demo',
  imports: [
    ScContextMenuProvider,
    ScContextMenuTrigger,
    ScContextMenu,
    ScMenu,
    ScMenuContent,
    ScMenuGroup,
    ScMenuItem,
  ],
  template: `
    <div class="grid w-full max-w-sm grid-cols-2 gap-4">
      <div scContextMenuProvider class="w-full max-w-xs">
        <div
          scContextMenuTrigger
          class="flex aspect-video w-full items-center justify-center rounded-xl border border-dashed text-sm"
        >
          <span class="hidden pointer-fine:inline-block"
            >Right click (top)</span
          >
          <span class="hidden pointer-coarse:inline-block"
            >Long press (top)</span
          >
        </div>
        <div scContextMenu side="top">
          <div scMenu>
            <ng-template scMenuContent>
              <div scMenuGroup>
                <div scMenuItem value="Back">Back</div>
                <div scMenuItem value="Forward">Forward</div>
                <div scMenuItem value="Reload">Reload</div>
              </div>
            </ng-template>
          </div>
        </div>
      </div>
      <div scContextMenuProvider class="w-full max-w-xs">
        <div
          scContextMenuTrigger
          class="flex aspect-video w-full items-center justify-center rounded-xl border border-dashed text-sm"
        >
          <span class="hidden pointer-fine:inline-block"
            >Right click (end)</span
          >
          <span class="hidden pointer-coarse:inline-block"
            >Long press (end)</span
          >
        </div>
        <div scContextMenu side="end">
          <div scMenu>
            <ng-template scMenuContent>
              <div scMenuGroup>
                <div scMenuItem value="Back">Back</div>
                <div scMenuItem value="Forward">Forward</div>
                <div scMenuItem value="Reload">Reload</div>
              </div>
            </ng-template>
          </div>
        </div>
      </div>
      <div scContextMenuProvider class="w-full max-w-xs">
        <div
          scContextMenuTrigger
          class="flex aspect-video w-full items-center justify-center rounded-xl border border-dashed text-sm"
        >
          <span class="hidden pointer-fine:inline-block"
            >Right click (bottom)</span
          >
          <span class="hidden pointer-coarse:inline-block"
            >Long press (bottom)</span
          >
        </div>
        <div scContextMenu side="bottom">
          <div scMenu>
            <ng-template scMenuContent>
              <div scMenuGroup>
                <div scMenuItem value="Back">Back</div>
                <div scMenuItem value="Forward">Forward</div>
                <div scMenuItem value="Reload">Reload</div>
              </div>
            </ng-template>
          </div>
        </div>
      </div>
      <div scContextMenuProvider class="w-full max-w-xs">
        <div
          scContextMenuTrigger
          class="flex aspect-video w-full items-center justify-center rounded-xl border border-dashed text-sm"
        >
          <span class="hidden pointer-fine:inline-block"
            >Right click (start)</span
          >
          <span class="hidden pointer-coarse:inline-block"
            >Long press (start)</span
          >
        </div>
        <div scContextMenu side="start">
          <div scMenu>
            <ng-template scMenuContent>
              <div scMenuGroup>
                <div scMenuItem value="Back">Back</div>
                <div scMenuItem value="Forward">Forward</div>
                <div scMenuItem value="Reload">Reload</div>
              </div>
            </ng-template>
          </div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SidesContextMenuDemo {}
