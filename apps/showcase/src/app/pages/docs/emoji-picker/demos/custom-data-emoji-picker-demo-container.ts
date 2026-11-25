import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { CustomDataEmojiPickerDemo } from './custom-data-emoji-picker-demo';

@Component({
  selector: 'app-custom-data-emoji-picker-demo-container',
  imports: [DemoContainer, CustomDataEmojiPickerDemo],
  template: `
    <app-demo-container
      title="Your own emojis"
      demoUrl="/demos/emoji-picker/custom-data-emoji-picker-demo"
      [code]="code"
    >
      <app-custom-data-emoji-picker-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class CustomDataEmojiPickerDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScFrame } from '@semantic-components/ui';
import {
  type ScEmoji,
  type ScEmojiData,
  type ScEmojiDataEmoji,
  ScEmojiPicker,
  ScEmojiPickerAnnouncer,
  ScEmojiPickerEmpty,
  ScEmojiPickerFooter,
  ScEmojiPickerList,
  ScEmojiPickerPreview,
  ScEmojiPickerSearch,
  ScEmojiPickerSearchField,
  ScEmojiPickerViewport,
} from '@semantic-components/ui/emoji-picker';
import { SiSearchIcon } from '@semantic-icons/lucide-icons';

/** Your categories: their emojis, names and search words. */
const SETS: Record<string, [string, string, string[]][]> = {
  Reactions: [
    ['👍', 'Agree', ['yes', 'ok', '+1']],
    ['👎', 'Disagree', ['no', '-1']],
    ['🎉', 'Celebrate', ['party', 'congrats']],
    ['👀', 'Looking', ['review', 'watching']],
    ['🙏', 'Thanks', ['please', 'grateful']],
    ['🔥', 'On fire', ['hot', 'great']],
    ['😂', 'Funny', ['laugh', 'lol']],
    ['🤔', 'Thinking', ['hmm', 'question']],
  ],
  Status: [
    ['✅', 'Done', ['complete', 'shipped']],
    ['🚧', 'In progress', ['wip', 'working']],
    ['⏸️', 'On hold', ['paused', 'blocked']],
    ['🐛', 'Bug', ['issue', 'error']],
    ['🚀', 'Released', ['deploy', 'launch']],
    ['📌', 'Pinned', ['important', 'note']],
  ],
  Away: [
    ['🏖️', 'On holiday', ['vacation', 'leave']],
    ['🤒', 'Out sick', ['ill', 'unwell']],
    ['🏠', 'Working from home', ['remote', 'wfh']],
    ['📅', 'In a meeting', ['busy', 'call']],
    ['🍽️', 'At lunch', ['eating', 'break']],
  ],
};

/** Your emojis instead of Emojibase's: the picker works the same. */
const DATA: ScEmojiData = {
  locale: 'en',
  categories: Object.keys(SETS).map((label, index) => ({
    index,
    key: label.toLowerCase(),
    label,
  })),
  emojis: Object.values(SETS).flatMap((set, category) =>
    set.map(([emoji, label, tags]): ScEmojiDataEmoji => ({
      emoji,
      label,
      tags,
      category,
      version: 0,
    })),
  ),
  skinTones: {},
};

/** A team's own set (\`data\`): its categories, names and search words. */
@Component({
  selector: 'app-custom-data-emoji-picker-demo',
  imports: [
    ScFrame,
    ScEmojiPicker,
    ScEmojiPickerSearchField,
    ScEmojiPickerSearch,
    ScEmojiPickerViewport,
    ScEmojiPickerEmpty,
    ScEmojiPickerAnnouncer,
    ScEmojiPickerList,
    ScEmojiPickerFooter,
    ScEmojiPickerPreview,
    SiSearchIcon,
  ],
  template: \`
    <div
      scEmojiPicker
      scFrame
      class="h-72"
      [columns]="8"
      [data]="data"
      (emojiSelect)="selected.set($event)"
    >
      <div scEmojiPickerSearchField>
        <svg siSearchIcon></svg>
        <input
          scEmojiPickerSearch
          placeholder="Search…"
          aria-label="Search the team's emojis"
        />
      </div>
      <div scEmojiPickerViewport>
        <span scEmojiPickerEmpty>No emoji found.</span>
        <span scEmojiPickerAnnouncer></span>
        <div scEmojiPickerList aria-label="The team's emojis"></div>
      </div>
      <div scEmojiPickerFooter>
        <div scEmojiPickerPreview>Pick a status or a reaction…</div>
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
export class CustomDataEmojiPickerDemo {
  private readonly data = DATA;
  private readonly selected = signal<ScEmoji | null>(null);
}`;
}
