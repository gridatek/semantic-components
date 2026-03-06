import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { MessageReactionsEmojiPickerDemo } from './message-reactions-emoji-picker-demo';

@Component({
  selector: 'app-message-reactions-emoji-picker-demo-container',
  imports: [DemoContainer, MessageReactionsEmojiPickerDemo],
  template: `
    <app-demo-container
      title="Message with Reactions"
      demoUrl="/demos/emoji-picker/message-reactions-emoji-picker-demo"
      [code]="code"
    >
      <app-message-reactions-emoji-picker-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageReactionsEmojiPickerDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { Emoji, ScEmojiPicker } from '@semantic-components/ui-lab';
import { SiCirclePlusIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-message-reactions-emoji-picker-demo',
  imports: [ScEmojiPicker, SiCirclePlusIcon],
  template: \`
    <div class="max-w-md rounded-lg border p-4">
      <p class="text-sm">
        This is a sample message that can have emoji reactions.
      </p>
      <div class="mt-2 flex items-center gap-1">
        @for (reaction of messageReactions(); track reaction.emoji) {
          <button
            type="button"
            class="hover:bg-accent inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-sm"
            (click)="incrementReaction(reaction.emoji)"
          >
            <span>{{ reaction.emoji }}</span>
            <span class="text-muted-foreground text-xs">
              {{ reaction.count }}
            </span>
          </button>
        }
        <button
          type="button"
          class="hover:bg-accent rounded-full p-1"
          (click)="showReactionPicker.set(!showReactionPicker())"
        >
          <svg siCirclePlusIcon class="text-muted-foreground size-4"></svg>
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
  \`,
  host: { class: 'block w-full' },
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
}`;
}
