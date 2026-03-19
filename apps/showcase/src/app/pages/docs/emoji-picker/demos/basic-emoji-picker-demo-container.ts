import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicEmojiPickerDemo } from './basic-emoji-picker-demo';

@Component({
  selector: 'app-basic-emoji-picker-demo-container',
  imports: [DemoContainer, BasicEmojiPickerDemo],
  template: `
    <app-demo-container
      title="Basic"
      demoUrl="/demos/emoji-picker/basic-emoji-picker-demo"
      [code]="code"
    >
      <app-basic-emoji-picker-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicEmojiPickerDemoContainer {
  readonly code = `import { Grid, GridCell, GridCellWidget, GridRow } from '@angular/aria/grid';
import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  Emoji,
  ScEmojiPicker,
  ScEmojiPickerCategoryTab,
  ScEmojiPickerCategoryTabs,
  ScEmojiPickerGrid,
  ScEmojiPickerItem,
  ScEmojiPickerRecent,
  ScEmojiPickerSearch,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-emoji-picker-demo',
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
    ScEmojiPickerRecent,
  ],
  template: \`
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
          <button scEmojiPickerItem [emoji]="emoji">{{ emoji.emoji }}</button>
        }
      </div>
    </div>
    @if (selectedEmoji()) {
      <p class="text-muted-foreground mt-4 text-sm">
        Selected: {{ selectedEmoji()?.emoji }} ({{ selectedEmoji()?.name }})
      </p>
    }
  \`,
  host: { class: 'flex w-full flex-col items-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicEmojiPickerDemo {
  readonly selectedEmoji = signal<Emoji | null>(null);

  onEmojiSelect(emoji: Emoji): void {
    this.selectedEmoji.set(emoji);
  }
}`;
}
