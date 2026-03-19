import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import {
  ElementRef,
  Injectable,
  type Signal,
  type WritableSignal,
  computed,
  signal,
} from '@angular/core';
import { getCaretOffset } from './mention-input-caret';
import type { MentionUser } from './mention-input-types';

@Injectable()
export class ScMentionInputState {
  users!: Signal<MentionUser[]>;
  trigger!: Signal<string>;
  value!: WritableSignal<string>;
  mentions!: WritableSignal<MentionUser[]>;

  onMentionSelect: ((user: MentionUser) => void) | undefined;

  textareaEl: ElementRef<HTMLTextAreaElement> | undefined;
  overlayOrigin: CdkOverlayOrigin | undefined;

  readonly showSuggestions = signal(false);
  readonly searchQuery = signal('');
  readonly selectedIndex = signal(0);
  readonly caretOffset = signal<{ x: number; y: number }>({ x: 0, y: 0 });

  private mentionStartIndex = -1;

  readonly filteredUsers = computed(() => {
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

  onInput(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    const newValue = textarea.value;
    this.value.set(newValue);

    const cursorPos = textarea.selectionStart;
    const textBeforeCursor = newValue.slice(0, cursorPos);

    const triggerIndex = textBeforeCursor.lastIndexOf(this.trigger());

    if (triggerIndex !== -1) {
      const textAfterTrigger = textBeforeCursor.slice(triggerIndex + 1);
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
        this.caretOffset.set(getCaretOffset(textarea, triggerIndex));
        this.showSuggestions.set(true);
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
    setTimeout(() => {
      this.closeSuggestions();
    }, 150);
  }

  selectUser(user: MentionUser): void {
    const textarea = this.textareaEl?.nativeElement;
    if (!textarea) return;

    const currentValue = this.value();
    const mentionText = `${this.trigger()}${user.username}`;

    const beforeMention = currentValue.slice(0, this.mentionStartIndex);
    const afterMention = currentValue.slice(textarea.selectionStart);
    const newValue = `${beforeMention}${mentionText} ${afterMention}`;

    this.value.set(newValue);
    this.mentions.update((m) => [...m, user]);
    this.onMentionSelect?.(user);
    this.closeSuggestions();

    setTimeout(() => {
      const newCursorPos = this.mentionStartIndex + mentionText.length + 1;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
      textarea.focus();
    });
  }

  focus(): void {
    this.textareaEl?.nativeElement.focus();
  }

  clearMentions(): void {
    this.mentions.set([]);
  }

  private closeSuggestions(): void {
    this.showSuggestions.set(false);
    this.searchQuery.set('');
    this.mentionStartIndex = -1;
  }
}
