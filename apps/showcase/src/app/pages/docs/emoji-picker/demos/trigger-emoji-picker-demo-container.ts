import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { TriggerEmojiPickerDemo } from './trigger-emoji-picker-demo';

@Component({
  selector: 'app-trigger-emoji-picker-demo-container',
  imports: [DemoContainer, TriggerEmojiPickerDemo],
  template: `
    <app-demo-container
      title="In a popover"
      demoUrl="/demos/emoji-picker/trigger-emoji-picker-demo"
      [code]="code"
    >
      <app-trigger-emoji-picker-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class TriggerEmojiPickerDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal, viewChild } from '@angular/core';
import {
  ScButton,
  type ScEmoji,
  ScEmojiPicker,
  ScEmojiPickerAnnouncer,
  ScEmojiPickerCategory,
  ScEmojiPickerCategoryHeader,
  ScEmojiPickerEmoji,
  ScEmojiPickerEmpty,
  ScEmojiPickerError,
  ScEmojiPickerFooter,
  ScEmojiPickerList,
  ScEmojiPickerLoading,
  ScEmojiPickerRow,
  ScEmojiPickerSearch,
  ScEmojiPickerSearchField,
  ScEmojiPickerSkinTone,
  ScEmojiPickerViewport,
  ScPopover,
  ScPopoverPortal,
  ScPopoverProvider,
  ScPopoverTrigger,
  ScSpinner,
} from '@semantic-components/ui';
import {
  SiLoaderCircleIcon,
  SiSearchIcon,
  SiSmilePlusIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-trigger-emoji-picker-demo',
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
    ScEmojiPickerFooter,
    ScEmojiPickerSkinTone,
    SiSearchIcon,
    SiLoaderCircleIcon,
    SiSmilePlusIcon,
  ],
  template: \`
    <div scPopoverProvider>
      <button scButton variant="outline" scPopoverTrigger>
        <svg siSmilePlusIcon></svg>
        @if (selected(); as emoji) {
          {{ emoji.emoji }}
        } @else {
          Add an emoji
        }
      </button>
      <ng-template scPopoverPortal>
        <div scPopover class="w-fit p-0">
          <div
            scEmojiPicker
            #picker="scEmojiPicker"
            (emojiSelect)="pick($event)"
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
                <svg scSpinner siLoaderCircleIcon></svg>
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
                    <div scEmojiPickerCategoryHeader>{{ category.label }}</div>
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
            <div scEmojiPickerFooter>
              @if (picker.activeEmoji(); as emoji) {
                <span
                  class="flex size-7 flex-none items-center justify-center text-lg"
                >
                  {{ emoji.emoji }}
                </span>
                <span class="text-secondary-foreground truncate text-xs">
                  {{ emoji.label }}
                </span>
              } @else {
                <span
                  class="text-muted-foreground ms-1.5 flex h-7 items-center truncate text-xs"
                >
                  Select an emoji…
                </span>
              }
              <button
                scEmojiPickerSkinTone
                #tone="scEmojiPickerSkinTone"
                class="ms-auto"
                aria-label="Change skin tone"
              >
                {{ tone.variation() }}
              </button>
            </div>
          </div>
        </div>
      </ng-template>
    </div>
  \`,
  host: { class: 'flex w-full flex-col items-center' },
  encapsulation: ViewEncapsulation.None,
})
export class TriggerEmojiPickerDemo {
  private readonly popover = viewChild.required(ScPopoverProvider);
  readonly selected = signal<ScEmoji | null>(null);

  pick(emoji: ScEmoji): void {
    this.selected.set(emoji);
    this.popover().close();
  }
}`;
}
