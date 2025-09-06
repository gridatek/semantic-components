import { Injectable, computed, signal } from '@angular/core';

import { Editor } from '@tiptap/core';

export interface WordCountData {
  words: number;
  characters: number;
  charactersNoSpaces: number;
}

@Injectable()
export class ScWordCount {
  private readonly _wordCount = signal<WordCountData>({
    words: 0,
    characters: 0,
    charactersNoSpaces: 0,
  });
  private readonly _characterLimit = signal<number | null>(null);
  private readonly _wordLimit = signal<number | null>(null);

  // Public computed signals
  readonly wordCount = computed(() => this._wordCount());
  readonly characterLimit = computed(() => this._characterLimit());
  readonly wordLimit = computed(() => this._wordLimit());

  readonly charactersRemaining = computed(() => {
    const limit = this._characterLimit();
    return limit ? limit - this._wordCount().characters : null;
  });

  readonly wordsRemaining = computed(() => {
    const limit = this._wordLimit();
    return limit ? limit - this._wordCount().words : null;
  });

  readonly isCharacterLimitExceeded = computed(() => {
    const remaining = this.charactersRemaining();
    return remaining !== null && remaining < 0;
  });

  readonly isWordLimitExceeded = computed(() => {
    const remaining = this.wordsRemaining();
    return remaining !== null && remaining < 0;
  });

  readonly isAtLimit = computed(
    () => this.isCharacterLimitExceeded() || this.isWordLimitExceeded(),
  );

  setEditor(editor: Editor) {
    // Update word count when editor content changes
    editor.on('update', () => {
      this.updateWordCount(editor);
    });

    // Initial count
    this.updateWordCount(editor);
  }

  setCharacterLimit(limit: number | null) {
    this._characterLimit.set(limit);
  }

  setWordLimit(limit: number | null) {
    this._wordLimit.set(limit);
  }

  private updateWordCount(editor: Editor) {
    const text = editor.getText();

    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;

    // Count words - split by whitespace and filter out empty strings
    const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;

    this._wordCount.set({
      words,
      characters,
      charactersNoSpaces,
    });
  }

  getProgressPercentage(type: 'characters' | 'words'): number {
    if (type === 'characters') {
      const limit = this._characterLimit();
      if (!limit) return 0;
      return Math.min((this._wordCount().characters / limit) * 100, 100);
    } else {
      const limit = this._wordLimit();
      if (!limit) return 0;
      return Math.min((this._wordCount().words / limit) * 100, 100);
    }
  }
}
