import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { NoRecentEmojiPickerDemo } from './no-recent-emoji-picker-demo';

@Component({
  selector: 'app-no-recent-emoji-picker-demo-container',
  imports: [DemoContainer, NoRecentEmojiPickerDemo],
  template: `
    <app-demo-container
      title="Without Recently Used"
      demoUrl="/demos/emoji-picker/no-recent-emoji-picker-demo"
      [code]="code"
    >
      <app-no-recent-emoji-picker-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class NoRecentEmojiPickerDemoContainer {
  readonly code = `import { Grid, GridCell, GridCellWidget, GridRow } from '@angular/aria/grid';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScEmojiPicker,
  ScEmojiPickerCategoryTab,
  ScEmojiPickerCategoryTabs,
  ScEmojiPickerGrid,
  ScEmojiPickerItem,
  ScEmojiPickerSearch,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-no-recent-emoji-picker-demo',
  imports: [
    Grid,
    GridRow,
    GridCell,
    GridCellWidget,
    ScEmojiPicker,
    ScEmojiPickerSearch,
    ScEmojiPickerCategoryTabs,
    ScEmojiPickerCategoryTab,
    ScEmojiPickerGrid,
    ScEmojiPickerItem,
  ],
  template: \`
    <div scEmojiPicker>
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
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class NoRecentEmojiPickerDemo {}`;
}
