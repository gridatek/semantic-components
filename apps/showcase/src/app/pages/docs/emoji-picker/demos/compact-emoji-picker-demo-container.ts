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
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScFrame, ScSpinner } from '@semantic-components/ui';
import {
  type ScEmoji,
  ScEmojiPicker,
  ScEmojiPickerError,
  ScEmojiPickerList,
  ScEmojiPickerLoading,
  ScEmojiPickerViewport,
} from '@semantic-components/ui/emoji-picker';
import { SiLoaderCircleIcon } from '@semantic-icons/lucide-icons';

/** Just the list: fewer columns, no search, no footer. */
@Component({
  selector: 'app-compact-emoji-picker-demo',
  imports: [
    ScFrame,
    ScEmojiPicker,
    ScEmojiPickerViewport,
    ScEmojiPickerLoading,
    ScEmojiPickerError,
    ScEmojiPickerList,
    ScSpinner,
    SiLoaderCircleIcon,
  ],
  template: \`
    <div
      scEmojiPicker
      scFrame
      class="h-56"
      [columns]="8"
      (emojiSelect)="selected.set($event)"
    >
      <div scEmojiPickerViewport aria-label="Emojis">
        <span scEmojiPickerLoading>
          <svg scSpinner siLoaderCircleIcon aria-label="Loading emojis"></svg>
        </span>
        <span scEmojiPickerError>Couldn't load the emojis.</span>
        <div scEmojiPickerList aria-label="Emojis"></div>
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
  private readonly selected = signal<ScEmoji | null>(null);
}`;
}
