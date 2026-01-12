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
      class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
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
        class="z-50 min-w-[8rem] overflow-x-hidden overflow-y-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
        #formatMenu="ngMenu"
        [attr.data-state]="trigger.expanded() ? 'open' : 'closed'"
        [attr.data-side]="'bottom'"
        ngMenu
      >
        <ng-template ngMenuContent>
          <div
            class="focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
            ngMenuItem
            value="Mark as read"
          >
            <svg si-mail-check-icon aria-hidden="true"></svg>
            <span class="flex-1">Mark as read</span>
          </div>
          <div
            class="focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
            ngMenuItem
            value="Snooze"
          >
            <svg si-clock-icon aria-hidden="true"></svg>
            <span class="flex-1">Snooze</span>
          </div>
          <div
            class="-mx-1 my-1 h-px bg-border"
            role="separator"
            aria-orientation="horizontal"
          ></div>
          <div
            class="focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
            #categorizeItem
            [submenu]="categorizeMenu()"
            ngMenuItem
            value="Categorize"
          >
            <svg si-tag-icon aria-hidden="true"></svg>
            <span class="flex-1">Categorize</span>
            <svg class="ml-auto" si-chevron-right-icon aria-hidden="true"></svg>
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
              class="z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
              #categorizeMenu="ngMenu"
              [attr.data-state]="formatMenu.visible() ? 'open' : 'closed'"
              [attr.data-side]="'right'"
              ngMenu
            >
              <ng-template ngMenuContent>
                <div
                  class="focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
                  ngMenuItem
                  value="Mark as important"
                >
                  <svg si-star-icon aria-hidden="true"></svg>
                  <span class="flex-1">Mark as important</span>
                </div>
                <div
                  class="focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
                  ngMenuItem
                  value="Star"
                >
                  <svg si-star-icon aria-hidden="true"></svg>
                  <span class="flex-1">Star</span>
                </div>
                <div
                  class="focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
                  ngMenuItem
                  value="Label"
                >
                  <svg si-tag-icon aria-hidden="true"></svg>
                  <span class="flex-1">Label</span>
                </div>
              </ng-template>
            </div>
          </ng-template>
          <div
            class="-mx-1 my-1 h-px bg-border"
            role="separator"
            aria-orientation="horizontal"
          ></div>
          <div
            class="focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
            ngMenuItem
            value="Archive"
          >
            <svg si-archive-icon aria-hidden="true"></svg>
            <span class="flex-1">Archive</span>
          </div>
          <div
            class="focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
            ngMenuItem
            value="Report spam"
          >
            <svg si-flag-icon aria-hidden="true"></svg>
            <span class="flex-1">Report spam</span>
          </div>
          <div
            class="focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
            ngMenuItem
            value="Delete"
          >
            <svg si-trash-2-icon aria-hidden="true"></svg>
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
