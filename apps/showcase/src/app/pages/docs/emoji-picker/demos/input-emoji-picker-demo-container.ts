import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { InputEmojiPickerDemo } from './input-emoji-picker-demo';

@Component({
  selector: 'app-input-emoji-picker-demo-container',
  imports: [DemoContainer, InputEmojiPickerDemo],
  template: `
    <app-demo-container
      title="Emoji Input"
      demoUrl="/demos/emoji-picker/input-emoji-picker-demo"
      [code]="code"
    >
      <app-input-emoji-picker-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputEmojiPickerDemoContainer {
  readonly code = `import { Component, signal, ViewEncapsulation } from '@angular/core';
import { ScEmojiPicker, Emoji } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-input-emoji-picker-demo',
  imports: [ScEmojiPicker],
  template: \`
    <div class="flex items-start gap-2">
      <div class="flex-1">
        <div class="relative">
          <input
            type="text"
            [value]="inputValue()"
            (input)="onInputChange($event)"
            placeholder="Type a message..."
            class="w-full rounded-md border border-input bg-transparent px-3 py-2 pr-10 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          />
          <button
            type="button"
            class="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-accent rounded"
            (click)="togglePicker()"
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
              <path d="M8 14s1.5 2 4 2 4-2 4-2" />
              <line x1="9" x2="9.01" y1="9" y2="9" />
              <line x1="15" x2="15.01" y1="9" y2="9" />
            </svg>
          </button>
        </div>
        @if (showInputPicker()) {
          <div class="mt-2">
            <sc-emoji-picker
              (emojiSelect)="insertEmoji($event)"
              [maxRecent]="6"
            />
          </div>
        }
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
})
export class InputEmojiPickerDemo {
  readonly inputValue = signal('');
  readonly showInputPicker = signal(false);

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.inputValue.set(input.value);
  }

  togglePicker(): void {
    this.showInputPicker.set(!this.showInputPicker());
  }

  insertEmoji(emoji: Emoji): void {
    this.inputValue.update((v) => v + emoji.emoji);
    this.showInputPicker.set(false);
  }
}`;
}
