import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScFrame,
  ScPopover,
  ScPopoverPortal,
  ScPopoverProvider,
  ScPopoverTrigger,
  ScSpinner,
  ScToggle,
} from '@semantic-components/ui';
import {
  type ScEmoji,
  ScEmojiPicker,
  ScEmojiPickerAnnouncer,
  ScEmojiPickerEmpty,
  ScEmojiPickerError,
  ScEmojiPickerList,
  ScEmojiPickerLoading,
  ScEmojiPickerSearch,
  ScEmojiPickerSearchField,
  ScEmojiPickerViewport,
} from '@semantic-components/ui/emoji-picker';
import {
  SiLoaderCircleIcon,
  SiSearchIcon,
  SiSmilePlusIcon,
} from '@semantic-icons/lucide-icons';

interface Reaction extends ScEmoji {
  count: number;
  /** You reacted with it. */
  mine: boolean;
}

/**
 * Reactions to a message: a few quick ones, the rest from the picker. A
 * reaction is a toggle — yours or not — with its count.
 */
@Component({
  selector: 'app-reactions-emoji-picker-demo',
  imports: [
    ScFrame,
    ScButton,
    ScToggle,
    ScPopoverProvider,
    ScPopoverTrigger,
    ScPopoverPortal,
    ScPopover,
    ScSpinner,
    ScEmojiPicker,
    ScEmojiPickerSearchField,
    ScEmojiPickerSearch,
    ScEmojiPickerViewport,
    ScEmojiPickerLoading,
    ScEmojiPickerEmpty,
    ScEmojiPickerError,
    ScEmojiPickerAnnouncer,
    ScEmojiPickerList,
    SiSearchIcon,
    SiLoaderCircleIcon,
    SiSmilePlusIcon,
  ],
  template: `
    <article scFrame class="w-full max-w-md space-y-3 p-4">
      <div class="flex items-start justify-between gap-2">
        <div>
          <p class="text-sm font-medium">Maya</p>
          <p class="text-sm">The release is out — thanks, everyone!</p>
        </div>
        <div class="flex gap-0.5" role="group" aria-label="Quick reactions">
          @for (quick of quickReactions; track quick.emoji) {
            <button
              scButton
              variant="ghost"
              size="icon-sm"
              (click)="react(quick)"
            >
              <span aria-hidden="true">{{ quick.emoji }}</span>
              <span class="sr-only">{{ quick.label }}</span>
            </button>
          }
        </div>
      </div>
      <div
        class="flex flex-wrap items-center gap-1"
        role="group"
        aria-label="Reactions"
      >
        @for (reaction of reactions(); track reaction.emoji) {
          <button
            scToggle
            variant="outline"
            size="sm"
            [pressed]="reaction.mine"
            (pressedChange)="react(reaction)"
          >
            <span aria-hidden="true">{{ reaction.emoji }}</span>
            <span class="sr-only">{{ reaction.label }}:</span>
            {{ reaction.count }}
          </button>
        }
        <div scPopoverProvider>
          <button scButton variant="ghost" size="icon-sm" scPopoverTrigger>
            <svg siSmilePlusIcon></svg>
            <span class="sr-only">More reactions</span>
          </button>
          <ng-template scPopoverPortal>
            <div scPopover class="w-fit p-0">
              <div scEmojiPicker (emojiSelect)="react($event)">
                <div scEmojiPickerSearchField>
                  <svg siSearchIcon></svg>
                  <input
                    scEmojiPickerSearch
                    placeholder="Search…"
                    aria-label="Search emojis"
                  />
                </div>
                <div scEmojiPickerViewport>
                  <span scEmojiPickerLoading>
                    <svg
                      scSpinner
                      siLoaderCircleIcon
                      aria-label="Loading emojis"
                    ></svg>
                  </span>
                  <span scEmojiPickerEmpty>No emoji found.</span>
                  <span scEmojiPickerError>Couldn't load the emojis.</span>
                  <span scEmojiPickerAnnouncer></span>
                  <div scEmojiPickerList aria-label="Emojis"></div>
                </div>
              </div>
            </div>
          </ng-template>
        </div>
      </div>
    </article>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ReactionsEmojiPickerDemo {
  private readonly quickReactions: ScEmoji[] = [
    { emoji: '👍', label: 'Thumbs up' },
    { emoji: '❤️', label: 'Red heart' },
    { emoji: '🎉', label: 'Party popper' },
  ];

  private readonly reactions = signal<Reaction[]>([
    { emoji: '👍', label: 'Thumbs up', count: 3, mine: false },
    { emoji: '🚀', label: 'Rocket', count: 1, mine: true },
  ]);

  /** Your reaction: added, or taken back if it was yours already. */
  private react(emoji: ScEmoji): void {
    this.reactions.update((reactions) => {
      const found = reactions.find((r) => r.emoji === emoji.emoji);
      if (!found) {
        return [...reactions, { ...emoji, count: 1, mine: true }];
      }
      const count = found.count + (found.mine ? -1 : 1);
      return count
        ? reactions.map((r) =>
            r === found ? { ...r, count, mine: !found.mine } : r,
          )
        : reactions.filter((r) => r !== found);
    });
  }
}
