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
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
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
  ScEmojiPickerEmpty,
  ScEmojiPickerError,
  ScEmojiPickerFooter,
  ScEmojiPickerList,
  ScEmojiPickerLoading,
  ScEmojiPickerPreview,
  ScEmojiPickerSearch,
  ScEmojiPickerSearchField,
  ScEmojiPickerSkinTone,
  ScEmojiPickerViewport,
} from '@semantic-components/ui/emoji-picker';
import {
  SiLoaderCircleIcon,
  SiSearchIcon,
  SiSmilePlusIcon,
} from '@semantic-icons/lucide-icons';

/** In a popover: the search field takes focus, a pick closes it. */
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
    ScEmojiPickerFooter,
    ScEmojiPickerPreview,
    ScEmojiPickerSkinTone,
    SiSearchIcon,
    SiLoaderCircleIcon,
    SiSmilePlusIcon,
  ],
  template: \`
    <div scPopoverProvider>
      <button scButton variant="outline" scPopoverTrigger>
        @if (selected(); as emoji) {
          <span aria-hidden="true">{{ emoji.emoji }}</span>
          <span class="sr-only">{{ emoji.label }}</span>
        } @else {
          <svg siSmilePlusIcon></svg>
        }
        Status
      </button>
      <ng-template scPopoverPortal>
        <div scPopover class="w-fit p-0">
          <div scEmojiPicker (emojiSelect)="selected.set($event)">
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
            <div scEmojiPickerFooter>
              <div scEmojiPickerPreview>Select an emoji…</div>
              <button scEmojiPickerSkinTone #tone="scEmojiPickerSkinTone">
                {{ tone.variation() }}
                <span class="sr-only">Change skin tone</span>
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
  private readonly selected = signal<ScEmoji | null>(null);
}`;
}
