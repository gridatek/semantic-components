import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { MessageReactionsEmojiPickerDemo } from './message-reactions-emoji-picker-demo';

@Component({
  selector: 'app-message-reactions-emoji-picker-demo-container',
  imports: [DemoContainer, MessageReactionsEmojiPickerDemo],
  template: `
    <app-demo-container
      title="Reactions to a message"
      demoUrl="/demos/emoji-picker/message-reactions-emoji-picker-demo"
      [code]="code"
    >
      <app-message-reactions-emoji-picker-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class MessageReactionsEmojiPickerDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal, viewChild } from '@angular/core';
import {
  ScButton,
  ScPopover,
  ScPopoverPortal,
  ScPopoverProvider,
  ScPopoverTrigger,
  ScSpinner,
} from '@semantic-components/ui';
import {
  type ScEmoji,
  ScEmojiPicker,
  ScEmojiPickerAnnouncer,
  ScEmojiPickerCategory,
  ScEmojiPickerCategoryHeader,
  ScEmojiPickerEmoji,
  ScEmojiPickerEmpty,
  ScEmojiPickerError,
  ScEmojiPickerList,
  ScEmojiPickerLoading,
  ScEmojiPickerRow,
  ScEmojiPickerSearch,
  ScEmojiPickerSearchField,
  ScEmojiPickerViewport,
} from '@semantic-components/ui-lab';
import {
  SiLoaderCircleIcon,
  SiSearchIcon,
  SiSmilePlusIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-message-reactions-emoji-picker-demo',
  imports: [
    ScButton,
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
    ScEmojiPickerCategory,
    ScEmojiPickerCategoryHeader,
    ScEmojiPickerRow,
    ScEmojiPickerEmoji,
    SiSearchIcon,
    SiLoaderCircleIcon,
    SiSmilePlusIcon,
  ],
  template: \`
    <div class="w-full max-w-md rounded-lg border p-4">
      <p class="text-sm">
        This is a sample message that can have emoji reactions.
      </p>
      <div class="mt-2 flex flex-wrap items-center gap-1" scPopoverProvider>
        @for (reaction of reactions(); track reaction.emoji) {
          <button
            scButton
            variant="outline"
            size="xs"
            class="rounded-full"
            [attr.aria-label]="reaction.label + ', ' + reaction.count"
            (click)="add(reaction)"
          >
            {{ reaction.emoji }}
            <span class="text-muted-foreground">{{ reaction.count }}</span>
          </button>
        }
        <button
          scButton
          variant="ghost"
          size="icon-xs"
          class="rounded-full"
          scPopoverTrigger
          aria-label="Add a reaction"
        >
          <svg siSmilePlusIcon></svg>
        </button>
        <ng-template scPopoverPortal>
          <div scPopover class="w-fit p-0">
            <div
              scEmojiPicker
              class="h-[300px]"
              [columns]="8"
              (emojiSelect)="add($event); popover().close()"
            >
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
                  <svg scSpinner siLoaderCircleIcon class="size-4"></svg>
                  <span class="sr-only">Loading emojis…</span>
                </span>
                <span scEmojiPickerEmpty>No emoji found.</span>
                <span scEmojiPickerError>Couldn't load the emojis.</span>
                <span scEmojiPickerAnnouncer></span>
                <div
                  scEmojiPickerList
                  aria-label="Emojis"
                  #list="scEmojiPickerList"
                >
                  @for (category of list.categories(); track category.key) {
                    <div [scEmojiPickerCategory]="category">
                      <div scEmojiPickerCategoryHeader>
                        {{ category.label }}
                      </div>
                    </div>
                  }
                  @for (row of list.rows(); track row.index) {
                    <div [scEmojiPickerRow]="row">
                      @for (emoji of row.emojis; track emoji.columnIndex) {
                        <button [scEmojiPickerEmoji]="emoji">
                          {{ emoji.emoji }}
                        </button>
                      }
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </ng-template>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class MessageReactionsEmojiPickerDemo {
  protected readonly popover = viewChild.required(ScPopoverProvider);

  readonly reactions = signal<(ScEmoji & { count: number })[]>([
    { emoji: '👍', label: 'Thumbs up', count: 3 },
    { emoji: '❤️', label: 'Red heart', count: 1 },
  ]);

  add(emoji: ScEmoji): void {
    this.reactions.update((reactions) =>
      reactions.some((r) => r.emoji === emoji.emoji)
        ? reactions.map((r) =>
            r.emoji === emoji.emoji ? { ...r, count: r.count + 1 } : r,
          )
        : [...reactions, { ...emoji, count: 1 }],
    );
  }
}`;
}
