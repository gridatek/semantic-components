import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { InputEmojiPickerDemo } from './input-emoji-picker-demo';

@Component({
  selector: 'app-input-emoji-picker-demo-container',
  imports: [DemoContainer, InputEmojiPickerDemo],
  template: `
    <app-demo-container
      title="Insert into a message"
      demoUrl="/demos/emoji-picker/input-emoji-picker-demo"
      [code]="code"
    >
      <app-input-emoji-picker-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class InputEmojiPickerDemoContainer {
  private readonly code = `import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScButton,
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  ScPopover,
  ScPopoverPortal,
  ScPopoverProvider,
  ScPopoverTrigger,
  ScSpinner,
} from '@semantic-components/ui';
import {
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
  SiSmileIcon,
} from '@semantic-icons/lucide-icons';

/**
 * Into a message: the emoji goes in at the caret (\`insertInto\`), the form
 * value follows, and focus is back in the field after it.
 */
@Component({
  selector: 'app-input-emoji-picker-demo',
  imports: [
    CdkOverlayOrigin,
    FormField,
    ScButton,
    ScInput,
    ScInputGroup,
    ScInputGroupAddon,
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
    SiSmileIcon,
    SiSearchIcon,
    SiLoaderCircleIcon,
  ],
  template: \`
    <div class="w-full max-w-sm">
      <div scPopoverProvider [origin]="origin" alignment="end">
        <div scInputGroup cdkOverlayOrigin #origin="cdkOverlayOrigin">
          <input
            #field
            scInput
            aria-label="Message"
            placeholder="Type a message…"
            [formField]="messageForm.text"
          />
          <div scInputGroupAddon side="inline-end">
            <button scButton variant="ghost" size="icon-xs" scPopoverTrigger>
              <svg siSmileIcon></svg>
              <span class="sr-only">Insert an emoji</span>
            </button>
          </div>
        </div>
        <ng-template scPopoverPortal>
          <div scPopover class="w-fit p-0">
            <div scEmojiPicker [insertInto]="field">
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
      <p class="text-muted-foreground mt-4 text-sm">
        Value: {{ message().text || '—' }}
      </p>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class InputEmojiPickerDemo {
  private readonly message = signal({ text: '' });
  private readonly messageForm = form(this.message);
}`;
}
