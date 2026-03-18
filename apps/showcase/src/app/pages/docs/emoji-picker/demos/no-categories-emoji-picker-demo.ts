import { Grid, GridCell, GridCellWidget, GridRow } from '@angular/aria/grid';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScEmojiPicker,
  ScEmojiPickerGrid,
  ScEmojiPickerItem,
  ScEmojiPickerRecent,
  ScEmojiPickerSearch,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-no-categories-emoji-picker-demo',
  imports: [
    Grid,
    GridRow,
    GridCell,
    GridCellWidget,
    ScEmojiPicker,
    ScEmojiPickerSearch,
    ScEmojiPickerGrid,
    ScEmojiPickerItem,
    ScEmojiPickerRecent,
  ],
  template: `
    <div scEmojiPicker class="h-72">
      <div class="p-2">
        <input scEmojiPickerSearch />
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
          <button scEmojiPickerItem [emoji]="emoji">{{ emoji.emoji }}</button>
        }
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class NoCategoriesEmojiPickerDemo {}
