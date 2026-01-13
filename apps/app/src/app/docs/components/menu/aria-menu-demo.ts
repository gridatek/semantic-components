import { Menu } from '@angular/aria/menu';
import { ChangeDetectionStrategy, Component, ViewEncapsulation, viewChild } from '@angular/core';

import {
  ScAriaMenu,
  ScAriaMenuContent,
  ScAriaMenuItem,
  ScAriaMenuOverlay,
  ScAriaMenuSeparator,
  ScAriaMenuTrigger,
} from '@semantic-components/ui';
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
    ScAriaMenu,
    ScAriaMenuContent,
    ScAriaMenuItem,
    ScAriaMenuOverlay,
    ScAriaMenuSeparator,
    ScAriaMenuTrigger,
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
      scAriaMenuTrigger
    >
      Open Menu
    </button>
    <ng-template
      #mainOverlay="scAriaMenuOverlay"
      [open]="trigger.expanded()"
      [origin]="{ origin, usePopover: 'inline' }"
      [positions]="mainOverlay.positions()"
      scAriaMenuOverlay
    >
      <div #formatMenu="ngMenu" scAriaMenu>
        <ng-template scAriaMenuContent>
          <div scAriaMenuItem value="Mark as read">
            <svg si-mail-check-icon aria-hidden="true"></svg>
            <span class="flex-1">Mark as read</span>
          </div>
          <div scAriaMenuItem value="Snooze">
            <svg si-clock-icon aria-hidden="true"></svg>
            <span class="flex-1">Snooze</span>
          </div>
          <sc-aria-menu-separator />
          <div #categorizeItem [submenu]="categorizeMenu()" scAriaMenuItem value="Categorize">
            <svg si-tag-icon aria-hidden="true"></svg>
            <span class="flex-1">Categorize</span>
            <svg class="ml-auto" si-chevron-right-icon aria-hidden="true"></svg>
          </div>
          <ng-template
            #subOverlay="scAriaMenuOverlay"
            [open]="formatMenu.visible()"
            [origin]="{ origin: categorizeItem, usePopover: 'inline' }"
            [positions]="subOverlay.positions()"
            scAriaMenuOverlay
            variant="submenu"
          >
            <div #categorizeMenu="ngMenu" scAriaMenu>
              <ng-template scAriaMenuContent>
                <div scAriaMenuItem value="Mark as important">
                  <svg si-star-icon aria-hidden="true"></svg>
                  <span class="flex-1">Mark as important</span>
                </div>
                <div scAriaMenuItem value="Star">
                  <svg si-star-icon aria-hidden="true"></svg>
                  <span class="flex-1">Star</span>
                </div>
                <div scAriaMenuItem value="Label">
                  <svg si-tag-icon aria-hidden="true"></svg>
                  <span class="flex-1">Label</span>
                </div>
              </ng-template>
            </div>
          </ng-template>
          <sc-aria-menu-separator />
          <div scAriaMenuItem value="Archive">
            <svg si-archive-icon aria-hidden="true"></svg>
            <span class="flex-1">Archive</span>
          </div>
          <div scAriaMenuItem value="Report spam">
            <svg si-flag-icon aria-hidden="true"></svg>
            <span class="flex-1">Report spam</span>
          </div>
          <div scAriaMenuItem value="Delete">
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
