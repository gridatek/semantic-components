import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicEmojiPickerDemo } from './basic-emoji-picker-demo';

@Component({
  selector: 'app-basic-emoji-picker-demo-container',
  imports: [DemoContainer, BasicEmojiPickerDemo],
  template: `
    <app-demo-container
      title="Emoji picker"
      demoUrl="/demos/emoji-picker/basic-emoji-picker-demo"
      [code]="code"
    >
      <app-basic-emoji-picker-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicEmojiPickerDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScSpinner } from '@semantic-components/ui';
import {
  type ScEmoji,
  ScEmojiPicker,
  ScEmojiPickerAnnouncer,
  ScEmojiPickerCategory,
  ScEmojiPickerCategoryHeader,
  ScEmojiPickerEmoji,
  ScEmojiPickerEmpty,
  ScEmojiPickerError,
  ScEmojiPickerFooter,
  ScEmojiPickerList,
  ScEmojiPickerLoading,
  ScEmojiPickerRow,
  ScEmojiPickerSearch,
  ScEmojiPickerSearchField,
  ScEmojiPickerSkinTone,
  ScEmojiPickerViewport,
} from '@semantic-components/ui-lab';
import { SiLoaderCircleIcon, SiSearchIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-basic-emoji-picker-demo',
  imports: [
    ScEmojiPicker,
    ScEmojiPickerSearchField,
    ScEmojiPickerSearch,
    ScEmojiPickerViewport,
    ScEmojiPickerLoading,
    ScEmojiPickerEmpty,
    ScEmojiPickerError,
    ScEmojiPickerAnnouncer,
    ScEmojiPickerList,
    ScEmojiPickerCategory,
    ScEmojiPickerCategoryHeader,
    ScEmojiPickerRow,
    ScEmojiPickerEmoji,
    ScEmojiPickerFooter,
    ScEmojiPickerSkinTone,
    ScSpinner,
    SiSearchIcon,
    SiLoaderCircleIcon,
  ],
  template: \`
    <div
      scEmojiPicker
      class="rounded-lg border shadow-md"
      #picker="scEmojiPicker"
      (emojiSelect)="selected.set($event)"
    >
      <div scEmojiPickerSearchField>
        <svg siSearchIcon></svg>
        <input
          scEmojiPickerSearch
          placeholder="Search…"
          aria-label="Search emojis"
        />
      </div>
      <div scEmojiPickerViewport>
        <span scEmojiPickerLoading>
          <svg scSpinner siLoaderCircleIcon class="size-4"></svg>
          <span class="sr-only">Loading emojis…</span>
        </span>
        <span scEmojiPickerEmpty>No emoji found.</span>
        <span scEmojiPickerError>Couldn't load the emojis.</span>
        <span scEmojiPickerAnnouncer></span>
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
      <div scEmojiPickerFooter>
        @if (picker.activeEmoji(); as emoji) {
          <span
            class="flex size-7 flex-none items-center justify-center text-lg"
          >
            {{ emoji.emoji }}
          </span>
          <span class="text-secondary-foreground truncate text-xs">
            {{ emoji.label }}
          </span>
        } @else {
          <span
            class="text-muted-foreground ms-1.5 flex h-7 items-center truncate text-xs"
          >
            Select an emoji…
          </span>
        }
        <button
          scEmojiPickerSkinTone
          #tone="scEmojiPickerSkinTone"
          class="ms-auto"
          aria-label="Change skin tone"
        >
          {{ tone.variation() }}
        </button>
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
export class BasicEmojiPickerDemo {
  readonly selected = signal<ScEmoji | null>(null);
}`;
}
