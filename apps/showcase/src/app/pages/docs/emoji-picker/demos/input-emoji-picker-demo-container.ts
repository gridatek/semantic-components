import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { InputEmojiPickerDemo } from './input-emoji-picker-demo';

@Component({
  selector: 'app-input-emoji-picker-demo-container',
  imports: [DemoContainer, InputEmojiPickerDemo],
  template: `
    <app-demo-container
      title="Emoji Input"
      demoUrl="/demos/emoji-picker/input-emoji-picker-demo"
      [code]="code"
    >
      <app-input-emoji-picker-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class InputEmojiPickerDemoContainer {
  readonly code = `import { Grid, GridCell, GridCellWidget, GridRow } from '@angular/aria/grid';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { Component, ViewEncapsulation, signal, viewChild } from '@angular/core';
import {
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
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
  selector: 'app-input-emoji-picker-demo',
  imports: [
    Grid,
    GridRow,
    GridCell,
    GridCellWidget,
    CdkOverlayOrigin,
    ScInput,
    ScInputGroup,
    ScInputGroupAddon,
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
  template: \`
    <div class="w-full max-w-sm">
      <div scPopoverProvider [origin]="origin" align="start">
        <div scInputGroup cdkOverlayOrigin #origin="cdkOverlayOrigin">
          <input
            scInput
            type="text"
            [value]="inputValue()"
            (input)="onInputChange($event)"
            placeholder="Type a message..."
          />
          <div scInputGroupAddon align="inline-end">
            <button scEmojiPickerTrigger scPopoverTrigger>
              <svg siSmileIcon class="size-4"></svg>
            </button>
          </div>
        </div>
        <ng-template scPopoverPortal>
          <div scPopover class="w-auto p-0 ring-0">
            <div
              scEmojiPicker
              (emojiSelect)="insertEmoji($event)"
              [maxRecent]="6"
            >
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
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class InputEmojiPickerDemo {
  private readonly popoverProvider = viewChild.required(ScPopoverProvider);

  readonly inputValue = signal('');

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.inputValue.set(input.value);
  }

  insertEmoji(emoji: Emoji): void {
    this.inputValue.update((v) => v + emoji.emoji);
    this.popoverProvider().close();
  }
}`;
}
