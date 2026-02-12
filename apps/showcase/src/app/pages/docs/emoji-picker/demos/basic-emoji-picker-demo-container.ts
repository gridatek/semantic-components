import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicEmojiPickerDemo } from './basic-emoji-picker-demo';

@Component({
  selector: 'app-basic-emoji-picker-demo-container',
  imports: [DemoContainer, BasicEmojiPickerDemo],
  template: `
    <app-demo-container
      title="Basic"
      demoUrl="/demos/emoji-picker/basic-emoji-picker-demo"
      [code]="code"
    >
      <app-basic-emoji-picker-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicEmojiPickerDemoContainer {
  readonly code = `import { Component, signal, ViewEncapsulation } from '@angular/core';
import { ScEmojiPicker, Emoji } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-emoji-picker-demo',
  imports: [ScEmojiPicker],
  template: \`
    <sc-emoji-picker (emojiSelect)="onEmojiSelect($event)" />
    @if (selectedEmoji()) {
      <p class="text-sm text-muted-foreground mt-4">
        Selected: {{ selectedEmoji()?.emoji }} ({{ selectedEmoji()?.name },
        encapsulation: ViewEncapsulation.None})
      </p>
    }
  \`,
})
export class BasicEmojiPickerDemo {
  readonly selectedEmoji = signal<Emoji | null>(null);

  onEmojiSelect(emoji: Emoji): void {
    this.selectedEmoji.set(emoji);
  }
}`;
}
