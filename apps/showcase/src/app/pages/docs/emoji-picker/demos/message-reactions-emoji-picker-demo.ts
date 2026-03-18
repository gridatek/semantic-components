import { Component, ViewEncapsulation, signal, viewChild } from '@angular/core';
import {
  ScPopover,
  ScPopoverPortal,
  ScPopoverProvider,
  ScPopoverTrigger,
} from '@semantic-components/ui';
import {
  Emoji,
  ScEmojiPicker,
  ScEmojiPickerCategoryTab,
  ScEmojiPickerCategoryTabs,
  ScEmojiPickerGrid,
  ScEmojiPickerItem,
} from '@semantic-components/ui-lab';
import { SiCirclePlusIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-message-reactions-emoji-picker-demo',
  imports: [
    ScPopoverProvider,
    ScPopoverTrigger,
    ScPopoverPortal,
    ScPopover,
    SiCirclePlusIcon,
    ScEmojiPicker,
    ScEmojiPickerCategoryTabs,
    ScEmojiPickerCategoryTab,
    ScEmojiPickerGrid,
    ScEmojiPickerItem,
  ],
  template: `
    <div class="max-w-md rounded-lg border p-4">
      <p class="text-sm">
        This is a sample message that can have emoji reactions.
      </p>
      <div class="mt-2 flex items-center gap-1" scPopoverProvider>
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
          scPopoverTrigger
        >
          <svg siCirclePlusIcon class="text-muted-foreground size-4"></svg>
        </button>
        <ng-template scPopoverPortal>
          <div scPopover class="w-auto p-0 ring-0">
            <div
              scEmojiPicker
              class="w-64"
              [columns]="6"
              (emojiSelect)="addReaction($event)"
            >
              <div scEmojiPickerCategoryTabs #tabs="scEmojiPickerCategoryTabs">
                @for (category of tabs.state.categories(); track category.id) {
                  <button scEmojiPickerCategoryTab [category]="category">
                    {{ category.icon }}
                  </button>
                }
              </div>
              <div scEmojiPickerGrid #grid="scEmojiPickerGrid">
                @if (grid.isEmpty()) {
                  <p
                    class="text-muted-foreground col-span-full p-2 text-center text-sm"
                  >
                    No emoji found
                  </p>
                } @else {
                  @for (emoji of grid.emojis(); track emoji.emoji) {
                    <button scEmojiPickerItem [emoji]="emoji">
                      {{ emoji.emoji }}
                    </button>
                  }
                }
              </div>
            </div>
          </div>
        </ng-template>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class MessageReactionsEmojiPickerDemo {
  private readonly popoverProvider = viewChild.required(ScPopoverProvider);

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
    this.popoverProvider().close();
  }

  incrementReaction(emoji: string): void {
    this.messageReactions.update((reactions) =>
      reactions.map((r) =>
        r.emoji === emoji ? { ...r, count: r.count + 1 } : r,
      ),
    );
  }
}
