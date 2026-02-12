import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  input,
  model,
  output,
  signal,
  ViewEncapsulation,
  viewChild,
} from '@angular/core';
import { cn } from '../../utils';

export interface MentionUser {
  id: string;
  name: string;
  username: string;
  avatar?: string;
}

@Component({
  selector: 'sc-mention-input',
  exportAs: 'scMentionInput',
  template: `
    <div [class]="containerClass()">
      <textarea
        #textareaEl
        [class]="textareaClass()"
        [placeholder]="placeholder()"
        [disabled]="disabled()"
        [rows]="rows()"
        [value]="value()"
        (input)="onInput($event)"
        (keydown)="onKeydown($event)"
        (blur)="onBlur()"
      ></textarea>

      @if (showSuggestions() && filteredUsers().length > 0) {
        <div
          [class]="suggestionsClass()"
          [style.top.px]="suggestionsPosition().top"
          [style.left.px]="suggestionsPosition().left"
          role="listbox"
        >
          @for (user of filteredUsers(); track user.id; let i = $index) {
            <button
              type="button"
              role="option"
              [class]="suggestionItemClass(i)"
              [attr.aria-selected]="i === selectedIndex()"
              (click)="selectUser(user)"
              (mouseenter)="selectedIndex.set(i)"
            >
              @if (user.avatar) {
                <img
                  [src]="user.avatar"
                  [alt]="user.name"
                  class="size-6 rounded-full"
                />
              } @else {
                <div
                  class="size-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium"
                >
                  {{ user.name.charAt(0).toUpperCase() }}
                </div>
              }
              <div class="flex-1 text-left">
                <div class="text-sm font-medium">{{ user.name }}</div>
                <div class="text-xs text-muted-foreground">
                  &#64;{{ user.username }}
                </div>
              </div>
            </button>
          }
        </div>
      }
    </div>
  `,
  host: {
    'data-slot': 'mention-input',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScMentionInput {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly placeholder = input<string>('Type @ to mention someone...');
  readonly disabled = input<boolean>(false);
  readonly rows = input<number>(3);
  readonly users = input<MentionUser[]>([]);
  readonly trigger = input<string>('@');

  readonly value = model<string>('');
  readonly mentions = model<MentionUser[]>([]);

  readonly mentionSelect = output<MentionUser>();

  protected readonly showSuggestions = signal(false);
  protected readonly searchQuery = signal('');
  protected readonly selectedIndex = signal(0);
  protected readonly suggestionsPosition = signal({ top: 0, left: 0 });

  private readonly textareaEl =
    viewChild<ElementRef<HTMLTextAreaElement>>('textareaEl');
  private mentionStartIndex = -1;

  protected readonly filteredUsers = computed(() => {
    const query = this.searchQuery().toLowerCase();
    const mentioned = this.mentions().map((m) => m.id);

    return this.users()
      .filter((u) => !mentioned.includes(u.id))
      .filter(
        (u) =>
          u.name.toLowerCase().includes(query) ||
          u.username.toLowerCase().includes(query),
      )
      .slice(0, 5);
  });

  protected readonly containerClass = computed(() =>
    cn('relative', this.classInput()),
  );

  protected readonly textareaClass = computed(() =>
    cn(
      'flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm',
      'placeholder:text-muted-foreground',
      'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'resize-none',
    ),
  );

  protected readonly suggestionsClass = computed(() =>
    cn(
      'absolute z-50 w-64 rounded-md border bg-popover p-1 shadow-md',
      'animate-in fade-in-0 zoom-in-95',
    ),
  );

  protected suggestionItemClass(index: number): string {
    return cn(
      'flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm',
      'hover:bg-accent hover:text-accent-foreground',
      'focus-visible:outline-none',
      index === this.selectedIndex() && 'bg-accent text-accent-foreground',
    );
  }

  onInput(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    const newValue = textarea.value;
    this.value.set(newValue);

    const cursorPos = textarea.selectionStart;
    const textBeforeCursor = newValue.slice(0, cursorPos);

    // Check for trigger character
    const triggerIndex = textBeforeCursor.lastIndexOf(this.trigger());

    if (triggerIndex !== -1) {
      const textAfterTrigger = textBeforeCursor.slice(triggerIndex + 1);
      // Check if there's a space before the trigger (or it's at the start)
      const charBeforeTrigger =
        triggerIndex > 0 ? textBeforeCursor[triggerIndex - 1] : ' ';

      if (
        (charBeforeTrigger === ' ' ||
          charBeforeTrigger === '\n' ||
          triggerIndex === 0) &&
        !textAfterTrigger.includes(' ')
      ) {
        this.mentionStartIndex = triggerIndex;
        this.searchQuery.set(textAfterTrigger);
        this.selectedIndex.set(0);
        this.showSuggestions.set(true);
        this.updateSuggestionsPosition();
        return;
      }
    }

    this.closeSuggestions();
  }

  onKeydown(event: KeyboardEvent): void {
    if (!this.showSuggestions()) return;

    const filtered = this.filteredUsers();

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.selectedIndex.update((i) => (i + 1) % filtered.length);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.selectedIndex.update(
          (i) => (i - 1 + filtered.length) % filtered.length,
        );
        break;
      case 'Enter':
      case 'Tab':
        if (filtered.length > 0) {
          event.preventDefault();
          this.selectUser(filtered[this.selectedIndex()]);
        }
        break;
      case 'Escape':
        event.preventDefault();
        this.closeSuggestions();
        break;
    }
  }

  onBlur(): void {
    // Delay to allow click on suggestion
    setTimeout(() => {
      this.closeSuggestions();
    }, 150);
  }

  selectUser(user: MentionUser): void {
    const textarea = this.textareaEl()?.nativeElement;
    if (!textarea) return;

    const currentValue = this.value();
    const mentionText = `${this.trigger()}${user.username}`;

    // Replace the trigger and search query with the mention
    const beforeMention = currentValue.slice(0, this.mentionStartIndex);
    const afterMention = currentValue.slice(textarea.selectionStart);
    const newValue = `${beforeMention}${mentionText} ${afterMention}`;

    this.value.set(newValue);
    this.mentions.update((m) => [...m, user]);
    this.mentionSelect.emit(user);
    this.closeSuggestions();

    // Set cursor position after the mention
    setTimeout(() => {
      const newCursorPos = this.mentionStartIndex + mentionText.length + 1;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
      textarea.focus();
    });
  }

  private closeSuggestions(): void {
    this.showSuggestions.set(false);
    this.searchQuery.set('');
    this.mentionStartIndex = -1;
  }

  private updateSuggestionsPosition(): void {
    const textarea = this.textareaEl()?.nativeElement;
    if (!textarea) return;

    // Simple positioning below the textarea
    // For more accurate positioning, you'd need to calculate based on cursor position
    const rect = textarea.getBoundingClientRect();
    this.suggestionsPosition.set({
      top: textarea.offsetHeight + 4,
      left: 0,
    });
  }

  focus(): void {
    this.textareaEl()?.nativeElement.focus();
  }

  getMentions(): MentionUser[] {
    return this.mentions();
  }

  clearMentions(): void {
    this.mentions.set([]);
  }
}
