import { Component, signal, ViewEncapsulation } from '@angular/core';
import { ScEmojiPicker, Emoji } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-message-reactions-emoji-picker-demo',
  imports: [ScEmojiPicker],
  template: `
    <div class="max-w-md rounded-lg border p-4">
      <p class="text-sm">
        This is a sample message that can have emoji reactions.
      </p>
      <div class="mt-2 flex items-center gap-1">
        @for (reaction of messageReactions(); track reaction.emoji) {
          <button
            type="button"
            class="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-sm hover:bg-accent"
            (click)="incrementReaction(reaction.emoji)"
          >
            <span>{{ reaction.emoji }}</span>
            <span class="text-xs text-muted-foreground">
              {{ reaction.count }}
            </span>
          </button>
        }
        <button
          type="button"
          class="rounded-full p-1 hover:bg-accent"
          (click)="showReactionPicker.set(!showReactionPicker())"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            class="size-4 text-muted-foreground"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" x2="12" y1="8" y2="16" />
            <line x1="8" x2="16" y1="12" y2="12" />
          </svg>
        </button>
      </div>
      @if (showReactionPicker()) {
        <div class="mt-2">
          <sc-emoji-picker
            [showSearch]="false"
            [showRecent]="false"
            class="w-64"
            [columns]="6"
            (emojiSelect)="addReaction($event)"
          />
        </div>
      }
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class MessageReactionsEmojiPickerDemo {
  readonly showReactionPicker = signal(false);
  readonly messageReactions = signal<{ emoji: string; count: number }[]>([
    { emoji: '👍', count: 3 },
    { emoji: '❤️', count: 1 },
  ]);

  addReaction(emoji: Emoji): void {
    const reactions = this.messageReactions();
    const existing = reactions.find((r) => r.emoji === emoji.emoji);
    if (existing) {
      this.messageReactions.set(
        reactions.map((r) =>
          r.emoji === emoji.emoji ? { ...r, count: r.count + 1 } : r,
        ),
      );
    } else {
      this.messageReactions.set([
        ...reactions,
        { emoji: emoji.emoji, count: 1 },
      ]);
    }
    this.showReactionPicker.set(false);
  }

  incrementReaction(emoji: string): void {
    this.messageReactions.update((reactions) =>
      reactions.map((r) =>
        r.emoji === emoji ? { ...r, count: r.count + 1 } : r,
      ),
    );
  }
}
