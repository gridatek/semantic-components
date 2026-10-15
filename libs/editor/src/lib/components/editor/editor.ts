import { type ChainedCommands, Editor, type JSONContent } from '@tiptap/core';
import { CharacterCount, Placeholder, Selection } from '@tiptap/extensions';
import {
  Directive,
  InjectionToken,
  booleanAttribute,
  computed,
  effect,
  inject,
  input,
  model,
  output,
  signal,
  untracked,
} from '@angular/core';
import type { FormValueControl } from '@angular/forms/signals';
import { editorContentExtensions } from './editor-extensions';
import { SC_EDITOR_FEATURES } from './editor-features';
import { editorMarkdown, textToDocument } from './editor-format';

/**
 * How the document sits in its box: `default`, padded edge to edge; `page`, a
 * centred column of readable width with page margins (narrower on phones).
 */
export type ScEditorContentLayout = 'default' | 'page';

/** The format the editor writes its value in (`format`). */
export type ScEditorFormat = 'html' | 'json' | 'text' | 'markdown';

/**
 * The document, as the form holds it: HTML or plain text (a string, '' when
 * empty), or Tiptap's JSON (an object, `null` when empty).
 */
export type ScEditorValue = string | JSONContent | null;

/** A command, written on Tiptap's chain: `(chain) => chain.toggleBold()`. */
export type ScEditorCommand = (chain: ChainedCommands) => ChainedCommands;

export const SC_EDITOR = new InjectionToken<ScEditor>('SC_EDITOR');

/** What `scEditorContent` gives the editor when it mounts it. */
export interface ScEditorMountOptions {
  /** The placeholder of an empty document (read as it changes). */
  placeholder: () => string;
}

/**
 * A rich text editor (Tiptap): holds the document — its HTML is the value —
 * and runs its commands. A Signal Forms control: bind `[formField]` here
 * (`disabled`, `readonly` and errors come from the schema). Its parts:
 * `scEditorContent` (where it's written), the toolbar and its buttons, the
 * counts. The buttons run commands (`run`) and read state (`isActive`);
 * each part holds its own state (`exportAs`).
 * Tables, images, search and more are features: `provideEditor(withTables())`.
 */
@Directive({
  selector: '[scEditor]',
  exportAs: 'scEditor',
  providers: [{ provide: SC_EDITOR, useExisting: ScEditor }],
  host: {
    '[attr.data-disabled]': 'disabled() || null',
    '[attr.data-readonly]': 'readonly() || null',
    '[attr.data-invalid]': 'showInvalid() || null',
  },
})
export class ScEditor implements FormValueControl<ScEditorValue> {
  private readonly features = inject(SC_EDITOR_FEATURES);

  // Set by [formField] — the document's HTML, its state, its errors.
  readonly value = model<ScEditorValue>('');
  /**
   * The value's format: `html` (the default), `json` (Tiptap's JSON),
   * `markdown`, or `text` (plain text, a line per paragraph — the formatting
   * isn't kept). The editor reads any of them; changing it rewrites the value
   * in the new one.
   */
  readonly format = input<ScEditorFormat>('html');
  /**
   * The most characters the document takes (its text, not its HTML): typing
   * or pasting stops there. None: no limit.
   */
  readonly characterLimit = input<number | null>(null);
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly readonly = input(false, { transform: booleanAttribute });
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly touched = input(false, { transform: booleanAttribute });

  /** Focus left the document (Signal Forms marks it touched). */
  readonly touch = output<void>();

  /** The Tiptap editor, once `scEditorContent` has mounted it. */
  readonly editorInstance = signal<Editor | null>(null);
  /**
   * Moves on with every transaction (content or selection): read it in a
   * computed that reads the document, so it follows it.
   */
  readonly contentVersion = signal(0);

  /** The content's layout (`scEditorContent` sets it): the toolbar follows. */
  readonly layout = signal<ScEditorContentLayout>('default');

  readonly editable = computed(() => !this.disabled() && !this.readonly());
  /** Invalid once touched: the document's `aria-invalid`, `data-invalid`. */
  readonly showInvalid = computed(() => this.invalid() && this.touched());

  constructor() {
    // Editable follows the form: disabled or read-only, now or later.
    effect(() => {
      const editable = this.editable();
      untracked(() => this.editorInstance())?.setEditable(editable, false);
    });

    // The value from outside (the form, a reset): into the document — not a
    // change to undo.
    effect(() => {
      const value = this.value();
      const editor = this.editorInstance();
      untracked(() => {
        if (editor && !this.holds(editor, value)) {
          editor
            .chain()
            .setMeta('addToHistory', false)
            .setContent(this.toContent(value), { emitUpdate: false })
            .run();
        }
      });
    });

    // The limit follows its input (the extension reads it at each change).
    effect(() => {
      const limit = this.characterLimit();
      const characterCount =
        this.editorInstance()?.extensionManager.extensions.find(
          (extension) => extension.name === 'characterCount',
        );
      if (characterCount) characterCount.options.limit = limit;
    });

    // A new format: the value, rewritten in it.
    let previousFormat: ScEditorFormat | undefined;
    effect(() => {
      const format = this.format();
      const editor = this.editorInstance();
      if (!editor) return;
      if (previousFormat && previousFormat !== format) {
        untracked(() => this.value.set(this.serialize(editor)));
      }
      previousFormat = format;
    });
  }

  /** Whether a mark or node (with these attributes) is at the selection. */
  isActive(
    nameOrAttributes: string | Record<string, unknown>,
    attributes?: Record<string, unknown>,
  ): boolean {
    this.contentVersion();
    const editor = this.editorInstance();
    if (!editor) return false;
    return typeof nameOrAttributes === 'string'
      ? editor.isActive(nameOrAttributes, attributes)
      : editor.isActive(nameOrAttributes);
  }

  /** Whether a command can run now (undo, redo…). */
  can(command: ScEditorCommand): boolean {
    this.contentVersion();
    const editor = this.editorInstance();
    return !!editor && this.editable() && command(editor.can().chain()).run();
  }

  /** Runs a command on the document, focused (when it can be edited). */
  run(command: ScEditorCommand): void {
    const editor = this.editorInstance();
    if (!editor || !this.editable()) return;
    command(editor.chain().focus()).run();
  }

  /** Called by `scEditorContent`: makes its element the editor. */
  mount(element: HTMLElement, options: ScEditorMountOptions): Editor {
    const editor = new Editor({
      element,
      extensions: [
        ...editorContentExtensions(this.features),
        Placeholder.configure({ placeholder: () => options.placeholder() }),
        // The selection stays visible while a popover or the search has focus.
        Selection,
        // Counts characters and words; holds the document to the limit.
        CharacterCount.configure({ limit: this.characterLimit() }),
        ...this.features.flatMap((feature) => feature.behaviour?.(this) ?? []),
      ],
      content: this.toContent(this.value()),
      editable: this.editable(),
      onTransaction: () => this.contentVersion.update((v) => v + 1),
      onUpdate: ({ editor }) => {
        if (!this.holds(editor, this.value())) {
          this.value.set(this.serialize(editor));
        }
      },
      onBlur: () => this.touch.emit(),
    });
    this.editorInstance.set(editor);
    return editor;
  }

  /** Called by `scEditorContent` when it goes. */
  unmount(): void {
    this.editorInstance()?.destroy();
    this.editorInstance.set(null);
  }

  /** The document in the editor's format; empty: '' (HTML, text) or null. */
  private serialize(editor: Editor): ScEditorValue {
    switch (this.format()) {
      case 'json':
        return editor.isEmpty ? null : editor.getJSON();
      case 'text':
        return editor.isEmpty ? '' : editor.getText({ blockSeparator: '\n' });
      case 'markdown':
        return editor.isEmpty
          ? ''
          : editorMarkdown(this.features).serialize(editor.getJSON());
      default:
        return editor.isEmpty ? '' : editor.getHTML();
    }
  }

  /**
   * A value as content for the editor: JSON as it is; a string as plain text
   * or Markdown in those formats, HTML otherwise (so HTML loads into a JSON
   * editor).
   */
  private toContent(value: ScEditorValue): string | JSONContent {
    if (value === null) return '';
    if (typeof value !== 'string') return value;
    switch (this.format()) {
      case 'text':
        return textToDocument(value);
      case 'markdown':
        return editorMarkdown(this.features).parse(value);
      default:
        return value;
    }
  }

  /** Whether the document already is this value. */
  private holds(editor: Editor, value: ScEditorValue): boolean {
    const current = this.serialize(editor);
    return typeof value === 'string'
      ? value === current
      : JSON.stringify(value) === JSON.stringify(current);
  }
}
