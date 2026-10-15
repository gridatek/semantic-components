import { computed, signal } from '@angular/core';
import type { ScEditor } from '@semantic-components/editor';

export type ScEditorSearchFlag = 'caseSensitive' | 'wholeWord' | 'useRegex';

/** An editor's search: the bar's state and what it does. */
export class ScEditorSearchState {
  /** Whether the search bar is open (`scEditorSearch`, Ctrl / ⌘ + F). */
  readonly open = signal(false);
  /** Asks the search input for focus (it moves on with each request). */
  readonly focusRequest = signal(0);
  /** Ctrl / ⌘ + F opens the search bar only when there is one to open. */
  private readonly controls = signal(0);

  // The same object, changed in place: never equal to itself, so what reads
  // it reads it again.
  private readonly storage = computed(
    () => {
      this.editor.contentVersion();
      return this.editor.editorInstance()?.storage.findAndReplace ?? null;
    },
    { equal: () => false },
  );
  readonly term = computed(() => this.storage()?.searchTerm ?? '');
  readonly replaceTerm = computed(() => this.storage()?.replaceTerm ?? '');
  readonly caseSensitive = computed(
    () => this.storage()?.caseSensitive ?? false,
  );
  readonly wholeWord = computed(() => this.storage()?.wholeWord ?? false);
  readonly useRegex = computed(() => this.storage()?.useRegex ?? false);
  /** How many matches there are. */
  readonly count = computed(() => this.storage()?.results.length ?? 0);
  /** The current match (from 0), or null. */
  readonly index = computed(() => this.storage()?.currentIndex ?? null);

  constructor(readonly editor: ScEditor) {}

  show(): void {
    this.open.set(true);
    this.focusRequest.update((n) => n + 1);
  }

  /** Closes the search bar, clears its matches, and goes back to the text. */
  close(): void {
    if (!this.open()) return;
    this.open.set(false);
    const editor = this.editor.editorInstance();
    editor?.commands.clearSearch();
    editor?.commands.focus();
  }

  toggle(): void {
    if (this.open()) this.close();
    else this.show();
  }

  /** Ctrl / ⌘ + F: opens the bar when there is one. */
  shortcut(): boolean {
    if (!this.controls()) return false;
    this.show();
    return true;
  }

  /** Searches the document (as you type: it waits for a pause). */
  search(term: string): void {
    this.editor.editorInstance()?.commands.setSearchTerm(term);
  }

  setReplaceTerm(term: string): void {
    this.editor.editorInstance()?.commands.setReplaceTerm(term);
  }

  setOption(option: ScEditorSearchFlag, on: boolean): void {
    const commands = this.editor.editorInstance()?.commands;
    if (!commands) return;
    if (option === 'caseSensitive') commands.setCaseSensitive(on);
    else if (option === 'wholeWord') commands.setWholeWord(on);
    else commands.setUseRegex(on);
  }

  next(): void {
    this.editor.editorInstance()?.commands.goToNextResult();
  }

  previous(): void {
    this.editor.editorInstance()?.commands.goToPreviousResult();
  }

  /** Replaces the current match and goes to the next one. */
  replace(): void {
    if (this.editor.editable()) {
      this.editor.editorInstance()?.commands.replace();
    }
  }

  replaceAll(): void {
    if (this.editor.editable()) {
      this.editor.editorInstance()?.commands.replaceAll();
    }
  }

  /** Called by `scEditorSearch`: there is a search bar to open. */
  register(): () => void {
    this.controls.update((n) => n + 1);
    return () => this.controls.update((n) => n - 1);
  }
}

const states = new WeakMap<ScEditor, ScEditorSearchState>();

/** The editor's search (made with it, shared by its search parts). */
export function editorSearch(editor: ScEditor): ScEditorSearchState {
  let state = states.get(editor);
  if (!state) {
    state = new ScEditorSearchState(editor);
    states.set(editor, state);
  }
  return state;
}
