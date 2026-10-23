import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import {
  Component,
  ElementRef,
  ViewEncapsulation,
  signal,
  viewChild,
} from '@angular/core';
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
  ScEmojiPickerList,
  ScEmojiPickerLoading,
  ScEmojiPickerRow,
  ScEmojiPickerSearch,
  ScEmojiPickerSearchField,
  ScEmojiPickerViewport,
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
  SiLoaderCircleIcon,
  SiSearchIcon,
  SiSmileIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-input-emoji-picker-demo',
  imports: [
    CdkOverlayOrigin,
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
    ScEmojiPickerCategory,
    ScEmojiPickerCategoryHeader,
    ScEmojiPickerRow,
    ScEmojiPickerEmoji,
    SiSearchIcon,
    SiLoaderCircleIcon,
    SiSmileIcon,
  ],
  template: `
    <div class="w-full max-w-sm">
      <div scPopoverProvider [origin]="origin" align="end">
        <div scInputGroup cdkOverlayOrigin #origin="cdkOverlayOrigin">
          <input
            #message
            scInput
            aria-label="Message"
            placeholder="Type a message…"
            [value]="text()"
            (input)="text.set(message.value)"
          />
          <div scInputGroupAddon align="inline-end">
            <button scButton variant="ghost" size="icon-xs" scPopoverTrigger>
              <svg siSmileIcon></svg>
              <span class="sr-only">Insert an emoji</span>
            </button>
          </div>
        </div>
        <ng-template scPopoverPortal>
          <div scPopover class="w-fit p-0">
            <div
              scEmojiPicker
              [columns]="8"
              class="h-[300px]"
              (emojiSelect)="insert($event)"
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
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class InputEmojiPickerDemo {
  private readonly popover = viewChild.required(ScPopoverProvider);
  private readonly message =
    viewChild.required<ElementRef<HTMLInputElement>>('message');

  readonly text = signal('');

  /** Inserts the emoji where the cursor was, and puts it after it. */
  insert(emoji: ScEmoji): void {
    const field = this.message().nativeElement;
    const start = field.selectionStart ?? field.value.length;
    const end = field.selectionEnd ?? start;
    this.text.set(
      field.value.slice(0, start) + emoji.emoji + field.value.slice(end),
    );
    this.popover().close();
    const caret = start + emoji.emoji.length;
    setTimeout(() => {
      field.focus();
      field.setSelectionRange(caret, caret);
    });
  }
}
