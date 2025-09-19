import { CdkOverlayOrigin, ConnectedPosition, OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  input,
  output,
  viewChild,
} from '@angular/core';

import { ScTimezone } from './types';

@Component({
  selector: 'sc-timezone-dropdown',
  imports: [CommonModule, OverlayModule],
  template: `
    <ng-template
      [cdkConnectedOverlayOrigin]="overlayOrigin()"
      [cdkConnectedOverlayOpen]="isOpen()"
      [cdkConnectedOverlayPositions]="overlayPositions()"
      [cdkConnectedOverlayHasBackdrop]="true"
      [cdkConnectedOverlayBackdropClass]="'cdk-overlay-transparent-backdrop'"
      [cdkConnectedOverlayWidth]="overlayWidth() + 'px'"
      [cdkConnectedOverlayMinWidth]="overlayWidth() + 'px'"
      (backdropClick)="backdropClick.emit()"
      cdkConnectedOverlay
      cdkConnectedOverlayPanelClass="z-50"
    >
      <div class="rounded-md border bg-popover p-0 text-popover-foreground shadow-md">
        <div class="p-2">
          <input
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            #searchInput
            [value]="searchTerm()"
            [attr.aria-expanded]="isOpen()"
            [attr.aria-activedescendant]="'timezone-option-' + activeIndex()"
            [attr.aria-controls]="'timezone-listbox'"
            (input)="searchChange.emit($event)"
            (keydown)="keydownEvent.emit($event)"
            type="text"
            placeholder="Search timezones..."
            role="combobox"
            aria-label="Search timezones"
          />
        </div>
        <div
          class="max-h-60 overflow-y-auto"
          #timezoneListContainer
          [attr.aria-label]="'Timezone selection'"
          [id]="'timezone-listbox'"
          role="listbox"
        >
          @if (timezones().length === 0) {
            <div class="px-2 py-3 text-sm text-muted-foreground text-center">
              No timezones found
            </div>
          }
          @for (timezone of timezones(); track timezone.id; let i = $index) {
            <div
              class="relative flex cursor-default select-none items-center rounded-sm px-2 py-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground cursor-pointer"
              [class.bg-accent]="i === activeIndex()"
              [class.text-accent-foreground]="i === activeIndex()"
              [attr.aria-selected]="i === activeIndex()"
              [id]="'timezone-option-' + i"
              (click)="timezoneSelect.emit(timezone)"
              (keydown.enter)="timezoneSelect.emit(timezone)"
              (keydown.space)="timezoneSelect.emit(timezone)"
              tabindex="-1"
              role="option"
            >
              <div class="flex items-center space-x-3 w-full">
                <div
                  class="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0"
                >
                  <svg
                    class="w-3 h-3 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12,6 12,12 16,14" />
                  </svg>
                </div>
                <div class="flex-1 overflow-hidden">
                  <div class="font-medium">{{ timezone.city }}</div>
                  <div class="text-xs text-muted-foreground">{{ timezone.id }}</div>
                </div>
                <div class="text-xs text-muted-foreground font-mono flex-shrink-0">
                  {{ timezone.offset }}
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </ng-template>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScTimezoneDropdown {
  readonly overlayOrigin = input.required<CdkOverlayOrigin>();
  readonly isOpen = input<boolean>(false);
  readonly timezones = input.required<ScTimezone[]>();
  readonly searchTerm = input<string>('');
  readonly activeIndex = input<number>(-1);
  readonly overlayPositions = input.required<ConnectedPosition[]>();
  readonly overlayWidth = input<number>(400);

  readonly searchChange = output<Event>();
  readonly keydownEvent = output<KeyboardEvent>();
  readonly timezoneSelect = output<ScTimezone>();
  readonly backdropClick = output<void>();

  readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');
  readonly timezoneListContainer = viewChild<ElementRef<HTMLDivElement>>('timezoneListContainer');

  scrollToActiveTimezone(): void {
    const container = this.timezoneListContainer()?.nativeElement;
    const activeIndex = this.activeIndex();

    if (!container || activeIndex < 0) return;

    const activeElement = container.querySelector(`#timezone-option-${activeIndex}`) as HTMLElement;

    if (activeElement) {
      activeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest',
      });
    }
  }

  focusSearchInput(): void {
    setTimeout(() => {
      this.searchInput()?.nativeElement.focus();
    }, 50);
  }
}
