import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { LocaleEmojiPickerDemo } from './locale-emoji-picker-demo';

@Component({
  selector: 'app-locale-emoji-picker-demo-container',
  imports: [DemoContainer, LocaleEmojiPickerDemo],
  template: `
    <app-demo-container
      title="In French, with a skin tone"
      demoUrl="/demos/emoji-picker/locale-emoji-picker-demo"
      [code]="code"
    >
      <app-locale-emoji-picker-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class LocaleEmojiPickerDemoContainer {
  private readonly code = `import { Component, LOCALE_ID, ViewEncapsulation, signal } from '@angular/core';
import { ScFrame, ScSpinner } from '@semantic-components/ui';
import {
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
  type ScEmojiSkinTone,
} from '@semantic-components/ui/emoji-picker';
import { SiLoaderCircleIcon, SiSearchIcon } from '@semantic-icons/lucide-icons';

/** In French: the emojis' names, the search and your text; a skin tone. */
@Component({
  selector: 'app-locale-emoji-picker-demo',
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
    ScEmojiPickerPreview,
    ScEmojiPickerFooter,
    ScEmojiPickerSkinTone,
    SiSearchIcon,
    SiLoaderCircleIcon,
  ],
  template: \`
    <div scEmojiPicker scFrame [(skinTone)]="skinTone" #picker="scEmojiPicker">
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
          <svg scSpinner siLoaderCircleIcon aria-label="Chargement"></svg>
        </span>
        <span scEmojiPickerEmpty>Aucun emoji trouvé.</span>
        <span scEmojiPickerError>Impossible de charger les emojis.</span>
        <span scEmojiPickerAnnouncer></span>
        <div scEmojiPickerList aria-label="Emojis"></div>
      </div>
      <div scEmojiPickerFooter>
        <div scEmojiPickerPreview>Choisissez un emoji…</div>
        <button scEmojiPickerSkinTone #tone="scEmojiPickerSkinTone">
          {{ tone.variation() }}
          <span class="sr-only">
            Teint :
            {{
              skinTone() === 'none'
                ? 'par défaut'
                : picker.skinToneNames()[skinTone()]
            }}
          </span>
        </button>
      </div>
    </div>
  \`,
  providers: [{ provide: LOCALE_ID, useValue: 'fr' }],
  host: { class: 'flex w-full flex-col items-center' },
  encapsulation: ViewEncapsulation.None,
})
export class LocaleEmojiPickerDemo {
  private readonly skinTone = signal<ScEmojiSkinTone>('medium');
}`;
}
