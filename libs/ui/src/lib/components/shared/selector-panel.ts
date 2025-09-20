import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  ViewEncapsulation,
  computed,
  contentChild,
  contentChildren,
  input,
  output,
  signal,
} from '@angular/core';

import { SearchableItem } from './search-behavior';
import { ScSelectorOption } from './selector-option';

@Component({
  selector: 'sc-selector-panel',
  imports: [CommonModule, ScSelectorOption],
  template: `
    <div class="max-h-60 overflow-y-auto p-1" role="listbox">
      @if (isLoading()) {
        <div class="px-2 py-3 text-sm text-muted-foreground text-center">
          {{ loadingMessage() }}
        </div>
      } @else if (isEmpty()) {
        <div class="px-2 py-3 text-sm text-muted-foreground text-center">
          {{ emptyMessage() }}
        </div>
      } @else {
        @if (grouped()) {
          @for (group of groupedItems(); track group.group) {
            @if (group.group !== 'Other') {
              <div
                class="px-2 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wider"
              >
                {{ group.group }}
              </div>
            }
            @for (item of group.items; track getItemId(item); let i = $index) {
              @if (customItemTemplate()) {
                <div
                  [item]="item"
                  [isSelected]="isItemSelected(item)"
                  [disabled]="isItemDisabled(item)"
                  (click)="onItemClick(item)"
                  (mouseenter)="onItemHover(item)"
                  scSelectorOption
                >
                  <ng-container
                    [ngTemplateOutlet]="customItemTemplate()!"
                    [ngTemplateOutletContext]="{
                      $implicit: item,
                      index: i,
                      selected: isItemSelected(item),
                    }"
                  />
                </div>
              } @else {
                <div
                  [item]="item"
                  [isSelected]="isItemSelected(item)"
                  [disabled]="isItemDisabled(item)"
                  (click)="onItemClick(item)"
                  (mouseenter)="onItemHover(item)"
                  scSelectorOption
                >
                  <div class="flex-1">
                    <div class="font-medium">{{ getItemLabel(item) }}</div>
                    @if (getItemSubtitle(item)) {
                      <div class="text-xs text-muted-foreground">{{ getItemSubtitle(item) }}</div>
                    }
                  </div>
                  @if (multiple() && isItemSelected(item)) {
                    <svg class="h-4 w-4 text-current" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  }
                </div>
              }
            }
          }
        } @else {
          @for (item of items(); track getItemId(item); let i = $index) {
            @if (customItemTemplate()) {
              <div
                [item]="item"
                [isSelected]="isItemSelected(item)"
                [disabled]="isItemDisabled(item)"
                (click)="onItemClick(item)"
                (mouseenter)="onItemHover(item)"
                scSelectorOption
              >
                <ng-container
                  [ngTemplateOutlet]="customItemTemplate()!"
                  [ngTemplateOutletContext]="{
                    $implicit: item,
                    index: i,
                    selected: isItemSelected(item),
                  }"
                />
              </div>
            } @else {
              <div
                [item]="item"
                [isSelected]="isItemSelected(item)"
                [disabled]="isItemDisabled(item)"
                (click)="onItemClick(item)"
                (mouseenter)="onItemHover(item)"
                scSelectorOption
              >
                <div class="flex-1">
                  <div class="font-medium">{{ getItemLabel(item) }}</div>
                  @if (getItemSubtitle(item)) {
                    <div class="text-xs text-muted-foreground">{{ getItemSubtitle(item) }}</div>
                  }
                </div>
                @if (multiple() && isItemSelected(item)) {
                  <svg class="h-4 w-4 text-current" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                }
              </div>
            }
          }
        }
      }
    </div>
  `,
  host: {
    class: 'rounded-md border bg-popover text-popover-foreground shadow-md',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScSelectorPanel {
  // Required inputs
  readonly items = input.required<(string | SearchableItem)[]>();

  // Optional configuration
  readonly multiple = input<boolean>(false);
  readonly grouped = input<boolean>(false);
  readonly isLoading = input<boolean>(false);
  readonly selectedValues = input<Set<string>>(new Set());
  readonly disabledValues = input<Set<string>>(new Set());

  // Messages
  readonly loadingMessage = input<string>('Loading...');
  readonly emptyMessage = input<string>('No options found');

  // Custom templates
  readonly customItemTemplate = contentChild<
    TemplateRef<{
      $implicit: string | SearchableItem;
      index: number;
      selected: boolean;
    }>
  >('itemTemplate');

  // Outputs
  readonly itemSelected = output<string | SearchableItem>();
  readonly itemHovered = output<string | SearchableItem>();

  // Content children for key manager
  readonly options = contentChildren(ScSelectorOption);

  // Computed properties
  protected readonly isEmpty = computed(() => {
    return this.items().length === 0 && !this.isLoading();
  });

  protected readonly groupedItems = computed(() => {
    if (!this.grouped()) return [];

    const groups = new Map<string, (string | SearchableItem)[]>();

    this.items().forEach((item) => {
      const group = typeof item === 'string' ? 'Other' : item.group || 'Other';
      if (!groups.has(group)) {
        groups.set(group, []);
      }
      groups.get(group)!.push(item);
    });

    return Array.from(groups.entries()).map(([group, items]) => ({
      group,
      items,
    }));
  });

  // Item helper methods
  protected getItemId(item: string | SearchableItem): string {
    return typeof item === 'string' ? item : item.id;
  }

  protected getItemLabel(item: string | SearchableItem): string {
    return typeof item === 'string' ? item : item.label;
  }

  protected getItemSubtitle(item: string | SearchableItem): string | undefined {
    return typeof item === 'string' ? undefined : item.subtitle;
  }

  protected isItemSelected(item: string | SearchableItem): boolean {
    const itemId = this.getItemId(item);
    return this.selectedValues().has(itemId);
  }

  protected isItemDisabled(item: string | SearchableItem): boolean {
    const itemId = this.getItemId(item);
    return this.disabledValues().has(itemId);
  }

  // Event handlers
  protected onItemClick(item: string | SearchableItem): void {
    if (!this.isItemDisabled(item)) {
      this.itemSelected.emit(item);
    }
  }

  protected onItemHover(item: string | SearchableItem): void {
    if (!this.isItemDisabled(item)) {
      this.itemHovered.emit(item);
    }
  }

  // Method to scroll to active item (for key manager)
  scrollToActiveItem(): void {
    const activeOption = this.options().find((option) => option.isActive);
    if (activeOption) {
      activeOption.setActiveStyles();
    }
  }
}
