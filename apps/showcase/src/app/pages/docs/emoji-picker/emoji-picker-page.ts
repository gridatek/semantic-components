import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicEmojiPickerDemoContainer } from './demos/basic-emoji-picker-demo-container';
import { NoSearchEmojiPickerDemoContainer } from './demos/no-search-emoji-picker-demo-container';
import { NoCategoriesEmojiPickerDemoContainer } from './demos/no-categories-emoji-picker-demo-container';
import { NoRecentEmojiPickerDemoContainer } from './demos/no-recent-emoji-picker-demo-container';
import { CompactEmojiPickerDemoContainer } from './demos/compact-emoji-picker-demo-container';
import { InputEmojiPickerDemoContainer } from './demos/input-emoji-picker-demo-container';
import { TriggerEmojiPickerDemoContainer } from './demos/trigger-emoji-picker-demo-container';
import { QuickReactionsEmojiPickerDemoContainer } from './demos/quick-reactions-emoji-picker-demo-container';
import { MessageReactionsEmojiPickerDemoContainer } from './demos/message-reactions-emoji-picker-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentBadges } from '../../../components/component-badges/component-badges';

import { ScHeading } from '@semantic-components/ui';

@Component({
  selector: 'app-emoji-picker-page',
  imports: [
    BasicEmojiPickerDemoContainer,
    NoSearchEmojiPickerDemoContainer,
    NoCategoriesEmojiPickerDemoContainer,
    NoRecentEmojiPickerDemoContainer,
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
        <h1 scHeading>EmojiPicker</h1>
        <p class="text-muted-foreground">
          A searchable emoji picker with categories and recently used emojis.
        </p>
        <app-component-badges path="emoji-picker" />
      </div>

      <section class="space-y-8">
        <h2 scHeading toc>Examples</h2>
        <app-basic-emoji-picker-demo-container />
        <app-no-search-emoji-picker-demo-container />
        <app-no-categories-emoji-picker-demo-container />
        <app-no-recent-emoji-picker-demo-container />
        <app-compact-emoji-picker-demo-container />
        <app-input-emoji-picker-demo-container />
        <app-trigger-emoji-picker-demo-container />
        <app-quick-reactions-emoji-picker-demo-container />
        <app-message-reactions-emoji-picker-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class EmojiPickerPage {}
