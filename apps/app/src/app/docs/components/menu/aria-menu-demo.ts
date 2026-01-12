import { Menu, MenuContent, MenuItem, MenuTrigger } from '@angular/aria/menu';
import { OverlayModule } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component, ViewEncapsulation, viewChild } from '@angular/core';

import {
  SiArchiveIcon,
  SiChevronRightIcon,
  SiClockIcon,
  SiFlagIcon,
  SiMailCheckIcon,
  SiStarIcon,
  SiTagIcon,
  SiTrash2Icon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-aria-menu-demo',
  imports: [
    Menu,
    MenuContent,
    MenuItem,
    MenuTrigger,
    OverlayModule,
    SiArchiveIcon,
    SiChevronRightIcon,
    SiClockIcon,
    SiFlagIcon,
    SiMailCheckIcon,
    SiStarIcon,
    SiTagIcon,
    SiTrash2Icon,
  ],
  template: `
    <button
      class="flex cursor-pointer items-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      #origin
      #trigger="ngMenuTrigger"
      [menu]="formatMenu()"
      ngMenuTrigger
    >
      Open Menu
    </button>
    <ng-template
      [cdkConnectedOverlayOpen]="trigger.expanded()"
      [cdkConnectedOverlay]="{ origin, usePopover: 'inline' }"
      [cdkConnectedOverlayPositions]="[
        { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 4 },
      ]"
      cdkAttachPopoverAsChild
    >
      <div
        class="w-56 rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md"
        #formatMenu="ngMenu"
        ngMenu
      >
        <ng-template ngMenuContent>
          <div
            class="group relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[active='true']:bg-accent data-[active='true']:text-accent-foreground"
            ngMenuItem
            value="Mark as read"
          >
            <svg class="size-4 text-muted-foreground" si-mail-check-icon aria-hidden="true"></svg>
            <span class="flex-1">Mark as read</span>
          </div>
          <div
            class="group relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[active='true']:bg-accent data-[active='true']:text-accent-foreground"
            ngMenuItem
            value="Snooze"
          >
            <svg class="size-4 text-muted-foreground" si-clock-icon aria-hidden="true"></svg>
            <span class="flex-1">Snooze</span>
          </div>
          <div class="my-1 h-px bg-border" role="separator" aria-orientation="horizontal"></div>
          <div
            class="group relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[active='true']:bg-accent data-[active='true']:text-accent-foreground"
            #categorizeItem
            [submenu]="categorizeMenu()"
            ngMenuItem
            value="Categorize"
          >
            <svg class="size-4 text-muted-foreground" si-tag-icon aria-hidden="true"></svg>
            <span class="flex-1">Categorize</span>
            <svg
              class="size-4 text-muted-foreground"
              si-chevron-right-icon
              aria-hidden="true"
            ></svg>
          </div>
          <ng-template
            [cdkConnectedOverlayOpen]="formatMenu.visible()"
            [cdkConnectedOverlay]="{ origin: categorizeItem, usePopover: 'inline' }"
            [cdkConnectedOverlayPositions]="[
              { originX: 'end', originY: 'top', overlayY: 'top', overlayX: 'start', offsetX: 6 },
            ]"
            cdkAttachPopoverAsChild
          >
            <div
              class="w-56 rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md"
              #categorizeMenu="ngMenu"
              ngMenu
            >
              <ng-template ngMenuContent>
                <div
                  class="group relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[active='true']:bg-accent data-[active='true']:text-accent-foreground"
                  ngMenuItem
                  value="Mark as important"
                >
                  <svg class="size-4 text-muted-foreground" si-star-icon aria-hidden="true"></svg>
                  <span class="flex-1">Mark as important</span>
                </div>
                <div
                  class="group relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[active='true']:bg-accent data-[active='true']:text-accent-foreground"
                  ngMenuItem
                  value="Star"
                >
                  <svg class="size-4 text-muted-foreground" si-star-icon aria-hidden="true"></svg>
                  <span class="flex-1">Star</span>
                </div>
                <div
                  class="group relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[active='true']:bg-accent data-[active='true']:text-accent-foreground"
                  ngMenuItem
                  value="Label"
                >
                  <svg class="size-4 text-muted-foreground" si-tag-icon aria-hidden="true"></svg>
                  <span class="flex-1">Label</span>
                </div>
              </ng-template>
            </div>
          </ng-template>
          <div class="my-1 h-px bg-border" role="separator" aria-orientation="horizontal"></div>
          <div
            class="group relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[active='true']:bg-accent data-[active='true']:text-accent-foreground"
            ngMenuItem
            value="Archive"
          >
            <svg class="size-4 text-muted-foreground" si-archive-icon aria-hidden="true"></svg>
            <span class="flex-1">Archive</span>
          </div>
          <div
            class="group relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[active='true']:bg-accent data-[active='true']:text-accent-foreground"
            ngMenuItem
            value="Report spam"
          >
            <svg class="size-4 text-muted-foreground" si-flag-icon aria-hidden="true"></svg>
            <span class="flex-1">Report spam</span>
          </div>
          <div
            class="group relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[active='true']:bg-accent data-[active='true']:text-accent-foreground"
            ngMenuItem
            value="Delete"
          >
            <svg class="size-4 text-muted-foreground" si-trash-2-icon aria-hidden="true"></svg>
            <span class="flex-1">Delete</span>
          </div>
        </ng-template>
      </div>
    </ng-template>
  `,
  styles: `
    [ngMenu][data-visible='false'] {
      display: none;
    }
  `,
  host: {
    class: 'flex justify-center',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AriaMenuDemo {
  formatMenu = viewChild<Menu<string>>('formatMenu');
  categorizeMenu = viewChild<Menu<string>>('categorizeMenu');
}
