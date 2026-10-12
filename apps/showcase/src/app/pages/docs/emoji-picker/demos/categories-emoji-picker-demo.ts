import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScSpinner } from '@semantic-components/ui';
import {
  type ScEmoji,
  ScEmojiPicker,
  ScEmojiPickerAnnouncer,
  ScEmojiPickerCategory,
  ScEmojiPickerCategoryButton,
  ScEmojiPickerCategoryHeader,
  ScEmojiPickerCategoryNav,
  ScEmojiPickerEmoji,
  ScEmojiPickerEmpty,
  ScEmojiPickerError,
  ScEmojiPickerList,
  ScEmojiPickerLoading,
  ScEmojiPickerRow,
  ScEmojiPickerSearch,
  ScEmojiPickerSearchField,
  ScEmojiPickerViewport,
} from '@semantic-components/ui-lab';
import {
  SiClockIcon,
  SiFlagIcon,
  SiHandIcon,
  SiHeartIcon,
  SiLightbulbIcon,
  SiLoaderCircleIcon,
  SiPawPrintIcon,
  SiPizzaIcon,
  SiPlaneIcon,
  SiSearchIcon,
  SiSmileIcon,
  SiVolleyballIcon,
} from '@semantic-icons/lucide-icons';

/** Category buttons with your icons, and the recent emojis first. */
@Component({
  selector: 'app-categories-emoji-picker-demo',
  imports: [
    ScEmojiPicker,
    ScEmojiPickerCategoryNav,
    ScEmojiPickerCategoryButton,
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
    ScSpinner,
    SiClockIcon,
    SiSmileIcon,
    SiHandIcon,
    SiPawPrintIcon,
    SiPizzaIcon,
    SiPlaneIcon,
    SiVolleyballIcon,
    SiLightbulbIcon,
    SiHeartIcon,
    SiFlagIcon,
    SiSearchIcon,
    SiLoaderCircleIcon,
  ],
  template: `
    <div
      scEmojiPicker
      class="h-[380px] rounded-lg border shadow-md"
      recentLabel="Recently used"
      [(recent)]="recent"
      #picker="scEmojiPicker"
    >
      <div scEmojiPickerCategoryNav aria-label="Emoji categories">
        @for (category of picker.categories(); track category.key) {
          <button [scEmojiPickerCategoryButton]="category">
            @switch (category.key) {
              @case ('recent') {
                <svg siClockIcon></svg>
              }
              @case ('smileys-emotion') {
                <svg siSmileIcon></svg>
              }
              @case ('people-body') {
                <svg siHandIcon></svg>
              }
              @case ('animals-nature') {
                <svg siPawPrintIcon></svg>
              }
              @case ('food-drink') {
                <svg siPizzaIcon></svg>
              }
              @case ('travel-places') {
                <svg siPlaneIcon></svg>
              }
              @case ('activities') {
                <svg siVolleyballIcon></svg>
              }
              @case ('objects') {
                <svg siLightbulbIcon></svg>
              }
              @case ('symbols') {
                <svg siHeartIcon></svg>
              }
              @case ('flags') {
                <svg siFlagIcon></svg>
              }
            }
          </button>
        }
      </div>
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
    </div>
  `,
  host: { class: 'flex w-full flex-col items-center' },
  encapsulation: ViewEncapsulation.None,
})
export class CategoriesEmojiPickerDemo {
  /** Your recent emojis (keep them, e.g. in localStorage, to restore them). */
  readonly recent = signal<ScEmoji[]>([
    { emoji: '👋', label: 'Waving hand' },
    { emoji: '🎉', label: 'Party popper' },
  ]);
}
