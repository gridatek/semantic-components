import { type ChainedCommands, Editor } from '@tiptap/core';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import StarterKit from '@tiptap/starter-kit';
import {
  Directive,
  InjectionToken,
  booleanAttribute,
  computed,
  effect,
  input,
  model,
  output,
  signal,
  untracked,
} from '@angular/core';
import type { FormValueControl } from '@angular/forms/signals';

export type ScEditorAlignment = 'left' | 'center' | 'right' | 'justify';
export type ScEditorHeadingLevel =
  'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

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
 * `scEditorContent` (where it's written), the toolbar and its toggles, the
 * counts. The toggles run commands (`run`) and read state (`isActive`).
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
export class ScEditor implements FormValueControl<string> {
  // Set by [formField] — the document's HTML, its state, its errors.
  readonly value = model<string>('');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly readonly = input(false, { transform: booleanAttribute });
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly touched = input(false, { transform: booleanAttribute });

  /** Focus left the document (Signal Forms marks it touched). */
  readonly touch = output<void>();

  /** The Tiptap editor, once `scEditorContent` has mounted it. */
  readonly editorInstance = signal<Editor | null>(null);
  /** Moves on with every transaction (content or selection): state reads it. */
  readonly contentVersion = signal(0);

  readonly editable = computed(() => !this.disabled() && !this.readonly());
  /** Invalid once touched: the document's `aria-invalid`, `data-invalid`. */
  readonly showInvalid = computed(() => this.invalid() && this.touched());

  readonly alignment = computed<ScEditorAlignment>(() => {
    for (const align of ['center', 'right', 'justify'] as const) {
      if (this.isActive({ textAlign: align })) return align;
    }
    return 'left';
  });

  readonly heading = computed<ScEditorHeadingLevel>(() => {
    for (let level = 1; level <= 6; level++) {
      if (this.isActive('heading', { level })) {
        return `h${level}` as ScEditorHeadingLevel;
      }
    }
    return 'p';
  });

  /** The link at the selection, or ''. */
  readonly linkHref = computed(() => {
    this.contentVersion();
    const href = this.editorInstance()?.getAttributes('link')['href'];
    return typeof href === 'string' ? href : '';
  });

  constructor() {
    // Editable follows the form: disabled or read-only, now or later.
    effect(() => {
      const editable = this.editable();
      untracked(() => this.editorInstance())?.setEditable(editable, false);
    });

    // The value from outside (the form, a reset): into the document.
    effect(() => {
      const value = this.value();
      const editor = this.editorInstance();
      if (editor && value !== this.html(editor)) {
        editor.commands.setContent(value, { emitUpdate: false });
      }
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

  /**
   * Links the selection to `href` — or, with nothing selected, writes `text`
   * (or the address) as a link. Inside a link, changes its address.
   */
  setLink(href: string, text?: string): void {
    const editor = this.editorInstance();
    const address = href.trim();
    if (!editor || !address) return;
    if (editor.state.selection.empty && !this.isActive('link')) {
      this.run((chain) =>
        chain.insertContent({
          type: 'text',
          text: text?.trim() || address,
          marks: [{ type: 'link', attrs: { href: address } }],
        }),
      );
    } else {
      this.run((chain) =>
        chain.extendMarkRange('link').setLink({ href: address }),
      );
    }
  }

  /** Removes the link at the selection. */
  unsetLink(): void {
    this.run((chain) => chain.extendMarkRange('link').unsetLink());
  }

  /** Called by `scEditorContent`: makes its element the editor. */
  mount(element: HTMLElement, options: ScEditorMountOptions): Editor {
    const editor = new Editor({
      element,
      extensions: [
        StarterKit.configure({
          link: {
            openOnClick: false,
            HTMLAttributes: {
              target: '_blank',
              rel: 'noopener noreferrer',
            },
          },
        }),
        TextAlign.configure({ types: ['heading', 'paragraph'] }),
        Placeholder.configure({ placeholder: () => options.placeholder() }),
      ],
      content: this.value(),
      editable: this.editable(),
      onTransaction: () => this.contentVersion.update((v) => v + 1),
      onUpdate: ({ editor }) => {
        const html = this.html(editor);
        if (html !== this.value()) this.value.set(html);
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

  /** The document's HTML ('' when it's empty). */
  private html(editor: Editor): string {
    return editor.isEmpty ? '' : editor.getHTML();
  }
}
