import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScFrame, ScSpinner } from '@semantic-components/ui';
import {
  type ScEmoji,
  ScEmojiPicker,
  ScEmojiPickerAnnouncer,
  ScEmojiPickerEmpty,
  ScEmojiPickerError,
  ScEmojiPickerFooter,
  ScEmojiPickerList,
  ScEmojiPickerLoading,
  ScEmojiPickerPreview,
  ScEmojiPickerSearch,
  ScEmojiPickerSearchField,
  ScEmojiPickerSkinTone,
  ScEmojiPickerViewport,
} from '@semantic-components/ui/emoji-picker';
import { SiLoaderCircleIcon, SiSearchIcon } from '@semantic-icons/lucide-icons';

/** The picker: search, the list, a preview of the emoji and a skin tone. */
@Component({
  selector: 'app-basic-emoji-picker-demo',
  imports: [
    ScFrame,
    ScSpinner,
    ScEmojiPicker,
    ScEmojiPickerSearchField,
    ScEmojiPickerSearch,
    ScEmojiPickerViewport,
    ScEmojiPickerLoading,
    ScEmojiPickerEmpty,
    ScEmojiPickerError,
    ScEmojiPickerAnnouncer,
    ScEmojiPickerList,
    ScEmojiPickerFooter,
    ScEmojiPickerPreview,
    ScEmojiPickerSkinTone,
    SiSearchIcon,
    SiLoaderCircleIcon,
  ],
  template: `
    <div scEmojiPicker scFrame (emojiSelect)="selected.set($event)">
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
          <svg scSpinner siLoaderCircleIcon aria-label="Loading emojis"></svg>
        </span>
        <span scEmojiPickerEmpty>No emoji found.</span>
        <span scEmojiPickerError>Couldn't load the emojis.</span>
        <span scEmojiPickerAnnouncer></span>
        <div scEmojiPickerList aria-label="Emojis"></div>
      </div>
      <div scEmojiPickerFooter>
        <div scEmojiPickerPreview>Select an emoji…</div>
        <button scEmojiPickerSkinTone #tone="scEmojiPickerSkinTone">
          {{ tone.variation() }}
          <span class="sr-only">Change skin tone</span>
        </button>
      </div>
    </div>
    <p class="text-muted-foreground mt-4 text-sm" aria-live="polite">
      @if (selected(); as emoji) {
        Selected: {{ emoji.emoji }} {{ emoji.label }}
      }
    </p>
  `,
  host: { class: 'flex w-full flex-col items-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicEmojiPickerDemo {
  private readonly selected = signal<ScEmoji | null>(null);
}
