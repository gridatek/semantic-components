import { Component, signal, ViewEncapsulation } from '@angular/core';
import { ScEmojiPicker, Emoji } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-emoji-picker-demo',
  imports: [ScEmojiPicker],
  template: `
    <sc-emoji-picker (emojiSelect)="onEmojiSelect($event)" />
    @if (selectedEmoji()) {
      <p class="text-sm text-muted-foreground mt-4">
        Selected: {{ selectedEmoji()?.emoji }} ({{ selectedEmoji()?.name },
        encapsulation: ViewEncapsulation.None})
      </p>
    }
  `,
})
export class BasicEmojiPickerDemo {
  readonly selectedEmoji = signal<Emoji | null>(null);

  onEmojiSelect(emoji: Emoji): void {
    this.selectedEmoji.set(emoji);
  }
}
