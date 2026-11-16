import { type ModelSignal, computed, signal } from '@angular/core';
import type { ScEditor } from '@semantic-components/ui/editor';

export type ScEditorSearchFlag = 'caseSensitive' | 'wholeWord' | 'useRegex';

/** An editor's search: the bar's state and what it does. */
export class ScEditorSearchState {
  /** The search bar's `open` (`scEditorSearchBar` registers it). */
  private readonly bar = signal<ModelSignal<boolean> | null>(null);
  /** Whether the search bar is open. */
  readonly open = computed(() => this.bar()?.() ?? false);
  /** Asks the search input for focus (it moves on with each request). */
  readonly focusRequest = signal(0);

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

  /** Opens the search bar, focus in its input. */
  show(): void {
    this.bar()?.set(true);
    this.focusRequest.update((n) => n + 1);
  }

  /**
   * Closes the search bar and goes back to the text — where it is: focus
   * without scrolling. Tiptap's focus() scrolls to the selection, which can be
   * far from what is on screen; and WebKit scrolls to the caret when the
   * editor writes its selection back on focus — so every scroll box around
   * the text is kept where it was.
   */
  close(): void {
    if (!this.open()) return;
    this.bar()?.set(false);
    const editor = this.editor.editorInstance();
    if (!editor) return;
    withScrollKept(editor.view.dom, () => editor.view.focus());
  }

  /** Its matches cleared: when the bar closes, however it closes. */
  clear(): void {
    this.editor.editorInstance()?.commands.clearSearch();
  }

  /** Ctrl / ⌘ + F: opens the bar when there is one. */
  shortcut(): boolean {
    if (!this.bar()) return false;
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

  /** Called by `scEditorSearchBar`: its `open`. */
  register(open: ModelSignal<boolean>): () => void {
    this.bar.set(open);
    return () => {
      if (this.bar() === open) this.bar.set(null);
    };
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

/**
 * Runs `focus` with every box `element` is in — the page too — scrolled where
 * it was before: in the same task, so nothing is seen to move.
 */
function withScrollKept(element: Element, focus: () => void): void {
  const kept: [Element, number, number][] = [];
  for (let box = element.parentElement; box; box = box.parentElement)
    kept.push([box, box.scrollTop, box.scrollLeft]);
  focus();
  for (const [box, top, left] of kept)
    if (box.scrollTop !== top || box.scrollLeft !== left)
      box.scrollTo({ top, left, behavior: 'instant' });
}
