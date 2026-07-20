import { Grid, GridCell, GridCellWidget, GridRow } from '@angular/aria/grid';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScPopover,
  ScPopoverPortal,
  ScPopoverProvider,
  ScPopoverTrigger,
} from '@semantic-components/ui';
import {
  Emoji,
  ScEmojiPicker,
  ScEmojiPickerCategoryTab,
  ScEmojiPickerCategoryTabs,
  ScEmojiPickerGrid,
  ScEmojiPickerItem,
  ScEmojiPickerRecent,
  ScEmojiPickerSearch,
  ScEmojiPickerTrigger,
} from '@semantic-components/ui-lab';
import { SiSmileIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-trigger-emoji-picker-demo',
  imports: [
    Grid,
    GridRow,
    GridCell,
    GridCellWidget,
    ScPopoverProvider,
    ScPopoverTrigger,
    ScPopoverPortal,
    ScPopover,
    SiSmileIcon,
    ScEmojiPicker,
    ScEmojiPickerSearch,
    ScEmojiPickerCategoryTabs,
    ScEmojiPickerCategoryTab,
    ScEmojiPickerGrid,
    ScEmojiPickerItem,
    ScEmojiPickerRecent,
    ScEmojiPickerTrigger,
  ],
  template: `
    <div scPopoverProvider>
      <button scEmojiPickerTrigger scPopoverTrigger>
        <svg siSmileIcon class="size-4"></svg>
      </button>
      <ng-template scPopoverPortal>
        <div scPopover class="w-auto p-0 ring-0">
          <div scEmojiPicker (emojiSelect)="onEmojiSelect($event)">
            <div class="p-2">
              <input scEmojiPickerSearch />
            </div>
            <div scEmojiPickerCategoryTabs #tabs="scEmojiPickerCategoryTabs">
              @for (category of tabs.state.categories(); track category.id) {
                <button scEmojiPickerCategoryTab [category]="category">
                  {{ category.icon }}
                </button>
              }
            </div>
            <div scEmojiPickerGrid #grid="scEmojiPickerGrid">
              @if (grid.isEmpty()) {
                <div class="text-muted-foreground p-4 text-center text-sm">
                  No emoji found
                </div>
              } @else {
                <table
                  ngGrid
                  tabindex="0"
                  aria-label="Emoji grid"
                  class="w-full table-fixed border-collapse"
                  colWrap="continuous"
                  rowWrap="continuous"
                >
                  <tbody>
                    @for (row of grid.rows(); track $index) {
                      <tr ngGridRow>
                        @for (emoji of row; track emoji.emoji) {
                          <td ngGridCell class="p-0 text-center">
                            <button
                              ngGridCellWidget
                              scEmojiPickerItem
                              [emoji]="emoji"
                            >
                              {{ emoji.emoji }}
                            </button>
                          </td>
                        }
                      </tr>
                    }
                  </tbody>
                </table>
              }
            </div>
            <div scEmojiPickerRecent #recent="scEmojiPickerRecent">
              @for (emoji of recent.state.recentEmojis(); track emoji.emoji) {
                <button scEmojiPickerItem [emoji]="emoji">
                  {{ emoji.emoji }}
                </button>
              }
            </div>
          </div>
        </div>
      </ng-template>
    </div>
    @if (selectedEmoji()) {
      <p class="text-muted-foreground mt-4 text-sm">
        Selected: {{ selectedEmoji()?.emoji }} ({{ selectedEmoji()?.name }})
      </p>
    }
  `,
  host: { class: 'flex w-full flex-col items-center' },
  changeDetection: ChangeDetectionStrategy.Eager,
  encapsulation: ViewEncapsulation.None,
})
export class TriggerEmojiPickerDemo {
  readonly selectedEmoji = signal<Emoji | null>(null);

  onEmojiSelect(emoji: Emoji): void {
    this.selectedEmoji.set(emoji);
  }
}
