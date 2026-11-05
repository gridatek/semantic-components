import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScContextMenuProvider,
  ScContextMenuTrigger,
  ScMenu,
  ScMenuContent,
  ScMenuGroup,
  ScMenuItem,
  ScMenuPortal,
} from '@semantic-components/ui';

/** side: where the menu opens from the pointer — its reading end (default), its start, above or below. */
@Component({
  selector: 'app-sides-context-menu-demo',
  imports: [
    ScContextMenuProvider,
    ScContextMenuTrigger,
    ScMenu,
    ScMenuContent,
    ScMenuGroup,
    ScMenuItem,
    ScMenuPortal,
  ],
  template: `
    <div class="grid w-full max-w-sm grid-cols-2 gap-4">
      <div scContextMenuProvider side="top" class="w-full max-w-xs">
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
        <ng-template scMenuPortal>
          <div scMenu>
            <ng-template scMenuContent>
              <div scMenuGroup>
                <div scMenuItem value="Back">Back</div>
                <div scMenuItem value="Forward">Forward</div>
                <div scMenuItem value="Reload">Reload</div>
              </div>
            </ng-template>
          </div>
        </ng-template>
      </div>
      <div scContextMenuProvider side="end" class="w-full max-w-xs">
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
        <ng-template scMenuPortal>
          <div scMenu>
            <ng-template scMenuContent>
              <div scMenuGroup>
                <div scMenuItem value="Back">Back</div>
                <div scMenuItem value="Forward">Forward</div>
                <div scMenuItem value="Reload">Reload</div>
              </div>
            </ng-template>
          </div>
        </ng-template>
      </div>
      <div scContextMenuProvider side="bottom" class="w-full max-w-xs">
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
        <ng-template scMenuPortal>
          <div scMenu>
            <ng-template scMenuContent>
              <div scMenuGroup>
                <div scMenuItem value="Back">Back</div>
                <div scMenuItem value="Forward">Forward</div>
                <div scMenuItem value="Reload">Reload</div>
              </div>
            </ng-template>
          </div>
        </ng-template>
      </div>
      <div scContextMenuProvider side="start" class="w-full max-w-xs">
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
        <ng-template scMenuPortal>
          <div scMenu>
            <ng-template scMenuContent>
              <div scMenuGroup>
                <div scMenuItem value="Back">Back</div>
                <div scMenuItem value="Forward">Forward</div>
                <div scMenuItem value="Reload">Reload</div>
              </div>
            </ng-template>
          </div>
        </ng-template>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SidesContextMenuDemo {}
