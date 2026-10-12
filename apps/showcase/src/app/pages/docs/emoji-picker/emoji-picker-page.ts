import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicEmojiPickerDemoContainer } from './demos/basic-emoji-picker-demo-container';
import { CategoriesEmojiPickerDemoContainer } from './demos/categories-emoji-picker-demo-container';
import { CompactEmojiPickerDemoContainer } from './demos/compact-emoji-picker-demo-container';
import { InputEmojiPickerDemoContainer } from './demos/input-emoji-picker-demo-container';
import { LocaleEmojiPickerDemoContainer } from './demos/locale-emoji-picker-demo-container';
import { MessageReactionsEmojiPickerDemoContainer } from './demos/message-reactions-emoji-picker-demo-container';
import { QuickReactionsEmojiPickerDemoContainer } from './demos/quick-reactions-emoji-picker-demo-container';
import { TriggerEmojiPickerDemoContainer } from './demos/trigger-emoji-picker-demo-container';

@Component({
  selector: 'app-emoji-picker-page',
  imports: [
    BasicEmojiPickerDemoContainer,
    CategoriesEmojiPickerDemoContainer,
    LocaleEmojiPickerDemoContainer,
    CompactEmojiPickerDemoContainer,
    InputEmojiPickerDemoContainer,
    TriggerEmojiPickerDemoContainer,
    QuickReactionsEmojiPickerDemoContainer,
    MessageReactionsEmojiPickerDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Emoji Picker</h1>
        <p class="text-muted-foreground">
          A searchable emoji picker, assembled from parts: one scrolling list of
          every category with sticky headers — virtualised — through which the
          arrow keys move from the search field, skin tones, the emojis' names
          in 28 languages, and the emojis the system can't draw left out.
          Modelled on
          <a
            href="https://frimousse.liveblocks.io"
            target="_blank"
            rel="noopener noreferrer"
            class="font-medium underline underline-offset-4"
            >Frimousse</a
          >; the data is
          <a
            href="https://emojibase.dev"
            target="_blank"
            rel="noopener noreferrer"
            class="font-medium underline underline-offset-4"
          >
            Emojibase's</a
          >, fetched when first needed and kept in the browser.
        </p>
        <app-component-badges path="emoji-picker" />
      </div>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-basic-emoji-picker-demo-container />
        <app-trigger-emoji-picker-demo-container />
        <app-categories-emoji-picker-demo-container />
        <app-locale-emoji-picker-demo-container />
        <app-compact-emoji-picker-demo-container />
        <app-input-emoji-picker-demo-container />
        <app-quick-reactions-emoji-picker-demo-container />
        <app-message-reactions-emoji-picker-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class EmojiPickerPage {}
