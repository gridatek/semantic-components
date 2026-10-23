import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScSpinner } from '@semantic-components/ui';
import {
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
  type ScEmojiSkinTone,
} from '@semantic-components/ui-lab';
import { SiLoaderCircleIcon, SiSearchIcon } from '@semantic-icons/lucide-icons';

/** In French: the emojis' names, the search and your text; a skin tone. */
@Component({
  selector: 'app-locale-emoji-picker-demo',
  imports: [
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
    ScEmojiPickerCategory,
    ScEmojiPickerCategoryHeader,
    ScEmojiPickerRow,
    ScEmojiPickerEmoji,
    ScEmojiPickerFooter,
    ScEmojiPickerSkinTone,
    SiSearchIcon,
    SiLoaderCircleIcon,
  ],
  template: `
    <div
      scEmojiPicker
      class="rounded-lg border shadow-md"
      locale="fr"
      [(skinTone)]="skinTone"
      #picker="scEmojiPicker"
    >
      <div scEmojiPickerSearchField>
        <svg siSearchIcon></svg>
        <input
          scEmojiPickerSearch
          placeholder="Rechercher…"
          aria-label="Rechercher un emoji"
        />
      </div>
      <div scEmojiPickerViewport>
        <span scEmojiPickerLoading>
          <svg scSpinner siLoaderCircleIcon></svg>
          <span class="sr-only">Chargement…</span>
        </span>
        <span scEmojiPickerEmpty>Aucun emoji trouvé.</span>
        <span scEmojiPickerError>Impossible de charger les emojis.</span>
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
                <button [scEmojiPickerEmoji]="emoji">
                  {{ emoji.emoji }}
                </button>
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
            Choisissez un emoji…
          </span>
        }
        <button
          scEmojiPickerSkinTone
          #tone="scEmojiPickerSkinTone"
          class="ms-auto"
          [attr.aria-label]="
            'Teint : ' +
            (skinTone() === 'none'
              ? 'par défaut'
              : picker.skinToneNames()[skinTone()])
          "
        >
          {{ tone.variation() }}
        </button>
      </div>
    </div>
  `,
  host: { class: 'flex w-full flex-col items-center' },
  encapsulation: ViewEncapsulation.None,
})
export class LocaleEmojiPickerDemo {
  readonly skinTone = signal<ScEmojiSkinTone>('medium');
}
