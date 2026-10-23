import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { CompactEmojiPickerDemo } from './compact-emoji-picker-demo';

@Component({
  selector: 'app-compact-emoji-picker-demo-container',
  imports: [DemoContainer, CompactEmojiPickerDemo],
  template: `
    <app-demo-container
      title="Compact (8 columns, no search)"
      demoUrl="/demos/emoji-picker/compact-emoji-picker-demo"
      [code]="code"
    >
      <app-compact-emoji-picker-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class CompactEmojiPickerDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScSpinner, type ScEmoji, ScEmojiPicker, ScEmojiPickerCategory, ScEmojiPickerCategoryHeader, ScEmojiPickerEmoji, ScEmojiPickerError, ScEmojiPickerList, ScEmojiPickerLoading, ScEmojiPickerRow, ScEmojiPickerViewport } from '@semantic-components/ui';
import { SiLoaderCircleIcon } from '@semantic-icons/lucide-icons';

/** Just the list: fewer columns, no search, no footer. */
@Component({
  selector: 'app-compact-emoji-picker-demo',
  imports: [
    ScEmojiPicker,
    ScEmojiPickerViewport,
    ScEmojiPickerLoading,
    ScEmojiPickerError,
    ScEmojiPickerList,
    ScEmojiPickerCategory,
    ScEmojiPickerCategoryHeader,
    ScEmojiPickerRow,
    ScEmojiPickerEmoji,
    ScSpinner,
    SiLoaderCircleIcon,
  ],
  template: \`
    <div
      scEmojiPicker
      class="h-56 rounded-lg border shadow-md"
      [columns]="8"
      (emojiSelect)="selected.set($event)"
    >
      <div scEmojiPickerViewport aria-label="Emojis">
        <span scEmojiPickerLoading>
          <svg scSpinner siLoaderCircleIcon></svg>
          <span class="sr-only">Loading emojis…</span>
        </span>
        <span scEmojiPickerError>Couldn't load the emojis.</span>
        <div scEmojiPickerList aria-label="Emojis" #list="scEmojiPickerList">
          @for (category of list.categories(); track category.key) {
            <div [scEmojiPickerCategory]="category">
              <div scEmojiPickerCategoryHeader>{{ category.label }}</div>
            </div>
          }
          @for (row of list.rows(); track row.index) {
            <div [scEmojiPickerRow]="row">
              @for (emoji of row.emojis; track emoji.columnIndex) {
                <button [scEmojiPickerEmoji]="emoji">{{ emoji.emoji }}</button>
              }
            </div>
          }
        </div>
      </div>
    </div>
    <p class="text-muted-foreground mt-4 text-sm" aria-live="polite">
      @if (selected(); as emoji) {
        Selected: {{ emoji.emoji }} {{ emoji.label }}
      }
    </p>
  \`,
  host: { class: 'flex w-full flex-col items-center' },
  encapsulation: ViewEncapsulation.None,
})
export class CompactEmojiPickerDemo {
  readonly selected = signal<ScEmoji | null>(null);
}`;
}
