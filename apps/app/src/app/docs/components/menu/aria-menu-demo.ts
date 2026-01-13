import { Menu } from '@angular/aria/menu';
import { ConnectedOverlayPositionChange, OverlayModule } from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  signal,
  viewChild,
} from '@angular/core';

import {
  ScAriaMenu,
  ScAriaMenuContent,
  ScAriaMenuItem,
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
    ScAriaMenuSeparator,
    ScAriaMenuTrigger,
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
      scAriaMenuTrigger
    >
      Open Menu
    </button>
    <ng-template
      [cdkConnectedOverlayOpen]="trigger.expanded()"
      [cdkConnectedOverlay]="{ origin, usePopover: 'inline' }"
      [cdkConnectedOverlayPositions]="[
        { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 4 },
        { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: -4 },
        { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top', offsetY: 4 },
        { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom', offsetY: -4 },
      ]"
      (positionChange)="onMainMenuPositionChange($event)"
      cdkAttachPopoverAsChild
    >
      <div
        #formatMenu="ngMenu"
        [animate.enter]="mainMenuEnterAnimation()"
        [animate.leave]="mainMenuLeaveAnimation()"
        scAriaMenu
      >
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
            [cdkConnectedOverlayOpen]="formatMenu.visible()"
            [cdkConnectedOverlay]="{ origin: categorizeItem, usePopover: 'inline' }"
            [cdkConnectedOverlayPositions]="[
              { originX: 'end', originY: 'top', overlayX: 'start', overlayY: 'top', offsetX: 6 },
              { originX: 'start', originY: 'top', overlayX: 'end', overlayY: 'top', offsetX: -6 },
              {
                originX: 'end',
                originY: 'bottom',
                overlayX: 'start',
                overlayY: 'bottom',
                offsetX: 6,
              },
              {
                originX: 'start',
                originY: 'bottom',
                overlayX: 'end',
                overlayY: 'bottom',
                offsetX: -6,
              },
            ]"
            (positionChange)="onSubMenuPositionChange($event)"
            cdkAttachPopoverAsChild
          >
            <div
              #categorizeMenu="ngMenu"
              [animate.enter]="subMenuEnterAnimation()"
              [animate.leave]="subMenuLeaveAnimation()"
              scAriaMenu
            >
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

  // Track position for main menu (vertical: top/bottom)
  private readonly mainMenuPosition = signal<'top' | 'bottom'>('bottom');

  // Track position for submenu (horizontal: left/right)
  private readonly subMenuPosition = signal<'left' | 'right'>('right');

  // Dynamic animations for main menu based on position
  mainMenuEnterAnimation = computed(() => {
    const position = this.mainMenuPosition();
    const slideDirection = position === 'bottom' ? 'slide-in-from-top-2' : 'slide-in-from-bottom-2';
    return `animate-in fade-in-0 zoom-in-95 ${slideDirection}`;
  });

  mainMenuLeaveAnimation = computed(() => {
    const position = this.mainMenuPosition();
    const slideDirection = position === 'bottom' ? 'slide-out-to-top-2' : 'slide-out-to-bottom-2';
    return `animate-out fade-out-0 zoom-out-95 ${slideDirection}`;
  });

  // Dynamic animations for submenu based on position
  subMenuEnterAnimation = computed(() => {
    const position = this.subMenuPosition();
    const slideDirection = position === 'right' ? 'slide-in-from-left-2' : 'slide-in-from-right-2';
    return `animate-in fade-in-0 zoom-in-95 ${slideDirection}`;
  });

  subMenuLeaveAnimation = computed(() => {
    const position = this.subMenuPosition();
    const slideDirection = position === 'right' ? 'slide-out-to-left-2' : 'slide-out-to-right-2';
    return `animate-out fade-out-0 zoom-out-95 ${slideDirection}`;
  });

  onMainMenuPositionChange(event: ConnectedOverlayPositionChange): void {
    // overlayY === 'top' means overlay is below the trigger (opening downward)
    // overlayY === 'bottom' means overlay is above the trigger (opening upward)
    const position = event.connectionPair.overlayY === 'top' ? 'bottom' : 'top';
    this.mainMenuPosition.set(position);
  }

  onSubMenuPositionChange(event: ConnectedOverlayPositionChange): void {
    // overlayX === 'start' means overlay is to the right of the trigger
    // overlayX === 'end' means overlay is to the left of the trigger
    const position = event.connectionPair.overlayX === 'start' ? 'right' : 'left';
    this.subMenuPosition.set(position);
  }
}
