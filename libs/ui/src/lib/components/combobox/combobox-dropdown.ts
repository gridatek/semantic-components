import { CdkOverlayOrigin, ConnectedPosition, OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  TemplateRef,
  ViewEncapsulation,
  contentChild,
  input,
  output,
  viewChild,
} from '@angular/core';

import { ScComboboxConfig, ScComboboxItem } from './types';

@Component({
  selector: 'sc-combobox-dropdown',
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
        @if (config().showSearch !== false) {
          <div class="p-2">
            <input
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              #searchInput
              [value]="searchTerm()"
              [attr.aria-expanded]="isOpen()"
              [attr.aria-activedescendant]="'combobox-option-' + activeIndex()"
              [attr.aria-controls]="'combobox-listbox'"
              [placeholder]="config().searchPlaceholder || 'Search...'"
              (input)="searchChange.emit($event)"
              (keydown)="keydownEvent.emit($event)"
              type="text"
              role="combobox"
              aria-label="Search options"
            />
          </div>
        }
        <div
          class="max-h-60 overflow-y-auto"
          #itemListContainer
          [attr.aria-label]="'Option selection'"
          [id]="'combobox-listbox'"
          role="listbox"
        >
          @if (isLoading()) {
            <div class="px-2 py-3 text-sm text-muted-foreground text-center">
              {{ config().loadingMessage || 'Loading...' }}
            </div>
          } @else if (items().length === 0) {
            <div class="px-2 py-3 text-sm text-muted-foreground text-center">
              {{ config().emptyMessage || 'No options found' }}
            </div>
          } @else {
            @for (item of items(); track item.id; let i = $index) {
              <div
                class="relative flex cursor-default select-none items-center rounded-sm px-2 py-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground cursor-pointer"
                [class.bg-accent]="i === activeIndex()"
                [class.text-accent-foreground]="i === activeIndex()"
                [attr.aria-selected]="i === activeIndex()"
                [id]="'combobox-option-' + i"
                (click)="itemSelect.emit(item)"
                (keydown.enter)="itemSelect.emit(item)"
                (keydown.space)="itemSelect.emit(item)"
                tabindex="-1"
                role="option"
              >
                @if (itemTemplate()) {
                  <ng-container
                    [ngTemplateOutlet]="itemTemplate()!"
                    [ngTemplateOutletContext]="{ $implicit: item, index: i }"
                  />
                } @else {
                  <div class="flex-1">
                    <div class="font-medium">{{ item.label }}</div>
                    @if (item.subtitle) {
                      <div class="text-xs text-muted-foreground">{{ item.subtitle }}</div>
                    }
                  </div>
                }
              </div>
            }
          }
        </div>
      </div>
    </ng-template>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScComboboxDropdown {
  readonly overlayOrigin = input.required<CdkOverlayOrigin>();
  readonly isOpen = input<boolean>(false);
  readonly items = input.required<ScComboboxItem[]>();
  readonly searchTerm = input<string>('');
  readonly activeIndex = input<number>(-1);
  readonly overlayPositions = input.required<ConnectedPosition[]>();
  readonly overlayWidth = input<number>(400);
  readonly config = input<ScComboboxConfig>({} as ScComboboxConfig);
  readonly isLoading = input<boolean>(false);
  readonly itemTemplate = input<TemplateRef<{ $implicit: ScComboboxItem; index: number }> | null>(
    null,
  );

  readonly searchChange = output<Event>();
  readonly keydownEvent = output<KeyboardEvent>();
  readonly itemSelect = output<ScComboboxItem>();
  readonly backdropClick = output<void>();

  readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');
  readonly itemListContainer = viewChild<ElementRef<HTMLDivElement>>('itemListContainer');

  scrollToActiveItem(): void {
    const container = this.itemListContainer()?.nativeElement;
    const activeIndex = this.activeIndex();

    if (!container || activeIndex < 0) return;

    const activeElement = container.querySelector(`#combobox-option-${activeIndex}`) as HTMLElement;

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
