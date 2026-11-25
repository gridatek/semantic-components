import { Component, ViewEncapsulation } from '@angular/core';
import { ScTypeset } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { EntryInstall } from '../../../components/entry-install/entry-install';
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
    EntryInstall,
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
    ScTypeset,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Emoji Picker</h1>
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
          >, bundled with your app: each locale is loaded the first time it's
          shown, from your app — no CDN.
        </p>
        <app-component-badges path="emoji-picker" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Installation</h2>
        <app-entry-install
          entry="emoji-picker"
          library="emojibase-data"
          href="https://emojibase.dev"
          names="ScEmojiPicker, ScEmojiPickerSearch, ScEmojiPickerViewport, ScEmojiPickerList"
        />
        <p>
          The data is bundled with your app: each of Emojibase&apos;s locales is
          a chunk of its own, downloaded the first time a picker shows it.
          Nothing is fetched from a CDN and there&apos;s nothing to host — and
          the emojis are the ones your app was built and tested with.
        </p>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
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
