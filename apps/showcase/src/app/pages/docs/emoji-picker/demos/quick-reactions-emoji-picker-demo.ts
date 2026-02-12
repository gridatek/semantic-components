import { Component, signal, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-quick-reactions-emoji-picker-demo',
  imports: [],
  template: `
    <div
      class="inline-flex gap-1 rounded-full border bg-background p-1 shadow-sm"
    >
      @for (emoji of quickReactions; track emoji) {
        <button
          type="button"
          class="rounded-full p-2 text-xl hover:bg-accent transition-colors"
          (click)="onQuickReaction(emoji)"
        >
          {{ emoji }}
        </button>
      }
    </div>
    @if (lastReaction()) {
      <p class="text-sm text-muted-foreground mt-4">
        You reacted with: {{ lastReaction() }}
      </p>
    }
  `,
  encapsulation: ViewEncapsulation.None,
})
export class QuickReactionsEmojiPickerDemo {
  readonly lastReaction = signal('');
  readonly quickReactions = ['👍', '❤️', '😂', '😮', '😢', '😡'];

  onQuickReaction(emoji: string): void {
    this.lastReaction.set(emoji);
  }
}
