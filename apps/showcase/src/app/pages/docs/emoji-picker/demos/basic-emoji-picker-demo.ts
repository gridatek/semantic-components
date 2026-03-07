import { Component, ViewEncapsulation, signal } from '@angular/core';
import { Emoji, ScEmojiPicker } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-emoji-picker-demo',
  imports: [ScEmojiPicker],
  template: `
    <sc-emoji-picker (emojiSelect)="onEmojiSelect($event)" />
    @if (selectedEmoji()) {
      <p class="text-muted-foreground mt-4 text-sm">
        Selected: {{ selectedEmoji()?.emoji }} ({{ selectedEmoji()?.name }})
      </p>
    }
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicEmojiPickerDemo {
  readonly selectedEmoji = signal<Emoji | null>(null);

  onEmojiSelect(emoji: Emoji): void {
    this.selectedEmoji.set(emoji);
  }
}
