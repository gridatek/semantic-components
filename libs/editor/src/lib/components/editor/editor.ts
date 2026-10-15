import { type ChainedCommands, Editor, Extension } from '@tiptap/core';
import FileHandler from '@tiptap/extension-file-handler';
import FindAndReplace from '@tiptap/extension-find-and-replace';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import { TaskItem, TaskList } from '@tiptap/extension-list';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextAlign from '@tiptap/extension-text-align';
import { Placeholder, Selection } from '@tiptap/extensions';
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
export type ScEditorListType = 'bulletList' | 'orderedList' | 'taskList';
export type ScEditorSearchFlag = 'caseSensitive' | 'wholeWord' | 'useRegex';

/** A command, written on Tiptap's chain: `(chain) => chain.toggleBold()`. */
export type ScEditorCommand = (chain: ChainedCommands) => ChainedCommands;

/**
 * Uploads an image and resolves to its address. Report progress (0 to 1)
 * with `onProgress`; stop when `signal` aborts (the upload was cancelled).
 * Handle your own errors: a rejected upload is dropped.
 */
export type ScEditorUploadHandler = (
  file: File,
  options: { onProgress: (fraction: number) => void; signal: AbortSignal },
) => Promise<string>;

/** An image being uploaded. */
export interface ScEditorUpload {
  readonly id: number;
  readonly file: File;
  /** From 0 to 1. */
  readonly progress: number;
}

export const SC_EDITOR = new InjectionToken<ScEditor>('SC_EDITOR');

/** What `scEditorContent` gives the editor when it mounts it. */
export interface ScEditorMountOptions {
  /** The placeholder of an empty document (read as it changes). */
  placeholder: () => string;
}

const LIST_TYPES: ScEditorListType[] = [
  'bulletList',
  'orderedList',
  'taskList',
];

/**
 * A rich text editor (Tiptap): holds the document — its HTML is the value —
 * and runs its commands. A Signal Forms control: bind `[formField]` here
 * (`disabled`, `readonly` and errors come from the schema). Its parts:
 * `scEditorContent` (where it's written), the toolbar and its buttons, the
 * search bar, the counts. The buttons run commands (`run`) and read state
 * (`isActive`).
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

  /** Uploads images (the image button, a drop, a paste). None: no images. */
  readonly upload = input<ScEditorUploadHandler | null>(null);
  /** The image types the editor takes (picked, dropped or pasted). */
  readonly imageTypes = input<readonly string[]>([
    'image/png',
    'image/jpeg',
    'image/gif',
    'image/webp',
  ]);

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

  /** The list at the selection (the innermost), or null. */
  readonly list = computed<ScEditorListType | null>(() => {
    this.contentVersion();
    const editor = this.editorInstance();
    if (!editor) return null;
    const { $from } = editor.state.selection;
    for (let depth = $from.depth; depth > 0; depth--) {
      const name = $from.node(depth).type.name as ScEditorListType;
      if (LIST_TYPES.includes(name)) return name;
    }
    return null;
  });

  /** The link at the selection, or ''. */
  readonly linkHref = computed(() => {
    this.contentVersion();
    const href = this.editorInstance()?.getAttributes('link')['href'];
    return typeof href === 'string' ? href : '';
  });

  /** The highlight colour at the selection, or ''. */
  readonly highlightColor = computed(() => {
    this.contentVersion();
    const color = this.editorInstance()?.getAttributes('highlight')['color'];
    return typeof color === 'string' ? color : '';
  });

  // Search and replace.

  /** Whether the search bar is open (`scEditorSearch`, Ctrl / ⌘ + F). */
  readonly searchOpen = signal(false);
  /** Asks the search input for focus (it moves on with each request). */
  readonly searchFocusRequest = signal(0);
  private readonly searchState = computed(() => {
    this.contentVersion();
    return this.editorInstance()?.storage.findAndReplace ?? null;
  });
  readonly searchTerm = computed(() => this.searchState()?.searchTerm ?? '');
  readonly replaceTerm = computed(() => this.searchState()?.replaceTerm ?? '');
  readonly caseSensitive = computed(
    () => this.searchState()?.caseSensitive ?? false,
  );
  readonly wholeWord = computed(() => this.searchState()?.wholeWord ?? false);
  readonly useRegex = computed(() => this.searchState()?.useRegex ?? false);
  /** How many matches there are. */
  readonly searchResults = computed(
    () => this.searchState()?.results.length ?? 0,
  );
  /** The current match (from 0), or null. */
  readonly searchIndex = computed(
    () => this.searchState()?.currentIndex ?? null,
  );
  /** Ctrl / ⌘ + F opens the search bar only when there is one to open. */
  private readonly searchControls = signal(0);

  // Images.

  /** The images being uploaded. */
  readonly uploads = signal<readonly ScEditorUpload[]>([]);
  private nextUploadId = 0;
  private readonly uploadControllers = new Map<number, AbortController>();

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
      if (editor && value !== this.html(editor)) {
        editor
          .chain()
          .setMeta('addToHistory', false)
          .setContent(value, { emitUpdate: false })
          .run();
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

  /** Makes the selection a list of this type, or back into paragraphs. */
  toggleList(type: ScEditorListType): void {
    this.run((chain) => {
      switch (type) {
        case 'bulletList':
          return chain.toggleBulletList();
        case 'orderedList':
          return chain.toggleOrderedList();
        case 'taskList':
          return chain.toggleTaskList();
      }
    });
  }

  // Search and replace.

  openSearch(): void {
    this.searchOpen.set(true);
    this.searchFocusRequest.update((n) => n + 1);
  }

  /** Closes the search bar, clears its matches, and goes back to the text. */
  closeSearch(): void {
    if (!this.searchOpen()) return;
    this.searchOpen.set(false);
    const editor = this.editorInstance();
    editor?.commands.clearSearch();
    editor?.commands.focus();
  }

  toggleSearch(): void {
    if (this.searchOpen()) this.closeSearch();
    else this.openSearch();
  }

  /** Searches the document (as you type: it waits for a pause). */
  search(term: string): void {
    this.editorInstance()?.commands.setSearchTerm(term);
  }

  setReplaceTerm(term: string): void {
    this.editorInstance()?.commands.setReplaceTerm(term);
  }

  setSearchOption(option: ScEditorSearchFlag, on: boolean): void {
    const commands = this.editorInstance()?.commands;
    if (!commands) return;
    if (option === 'caseSensitive') commands.setCaseSensitive(on);
    else if (option === 'wholeWord') commands.setWholeWord(on);
    else commands.setUseRegex(on);
  }

  searchNext(): void {
    this.editorInstance()?.commands.goToNextResult();
  }

  searchPrevious(): void {
    this.editorInstance()?.commands.goToPreviousResult();
  }

  /** Replaces the current match and goes to the next one. */
  replace(): void {
    if (this.editable()) this.editorInstance()?.commands.replace();
  }

  replaceAll(): void {
    if (this.editable()) this.editorInstance()?.commands.replaceAll();
  }

  /** Called by `scEditorSearch`: there is a search bar to open. */
  registerSearch(): () => void {
    this.searchControls.update((n) => n + 1);
    return () => this.searchControls.update((n) => n - 1);
  }

  // Images.

  /** Uploads images and inserts them at `position` (or the selection). */
  insertImages(files: Iterable<File>, position?: number): void {
    const types = this.imageTypes();
    for (const file of files) {
      if (types.includes(file.type)) void this.uploadImage(file, position);
    }
  }

  /** Stops an upload; its image isn't inserted. */
  cancelUpload(id: number): void {
    this.uploadControllers.get(id)?.abort();
    this.removeUpload(id);
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
        TaskList,
        TaskItem.configure({
          nested: true,
          // The checkbox is named by its task.
          a11y: { checkboxLabel: (node) => node.textContent },
        }),
        Highlight.configure({ multicolor: true }),
        Superscript,
        Subscript,
        Image,
        TextAlign.configure({ types: ['heading', 'paragraph'] }),
        Placeholder.configure({ placeholder: () => options.placeholder() }),
        // The selection stays visible while a popover or the search has focus.
        Selection,
        FindAndReplace.configure({ injectCSS: false }),
        FileHandler.configure({
          onDrop: (_editor, files, position) =>
            this.insertImages(files, position),
          onPaste: (_editor, files) => this.insertImages(files),
        }),
        Extension.create({
          name: 'scEditorSearchShortcut',
          addKeyboardShortcuts: () => ({
            'Mod-f': () => {
              if (!this.searchControls()) return false;
              this.openSearch();
              return true;
            },
          }),
        }),
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
    for (const controller of this.uploadControllers.values()) {
      controller.abort();
    }
    this.uploadControllers.clear();
    this.uploads.set([]);
    this.editorInstance()?.destroy();
    this.editorInstance.set(null);
  }

  private async uploadImage(file: File, position?: number): Promise<void> {
    const upload = this.upload();
    if (!upload || !this.editable()) return;
    const id = this.nextUploadId++;
    const controller = new AbortController();
    this.uploadControllers.set(id, controller);
    this.uploads.update((uploads) => [...uploads, { id, file, progress: 0 }]);
    try {
      const src = await upload(file, {
        onProgress: (fraction) =>
          this.uploads.update((uploads) =>
            uploads.map((u) =>
              u.id === id
                ? { ...u, progress: Math.min(1, Math.max(0, fraction)) }
                : u,
            ),
          ),
        signal: controller.signal,
      });
      const editor = this.editorInstance();
      if (!editor || controller.signal.aborted || !this.editable()) return;
      const at = Math.min(
        position ?? editor.state.selection.to,
        editor.state.doc.content.size,
      );
      editor
        .chain()
        .insertContentAt(at, {
          type: 'image',
          // Named after its file; the consumer can change it in the HTML.
          attrs: { src, alt: file.name.replace(/\.[^.]+$/, '') },
        })
        .run();
    } catch {
      // The upload handler reports its own errors; the image is dropped.
    } finally {
      this.removeUpload(id);
    }
  }

  private removeUpload(id: number): void {
    this.uploadControllers.delete(id);
    this.uploads.update((uploads) => uploads.filter((u) => u.id !== id));
  }

  /** The document's HTML ('' when it's empty). */
  private html(editor: Editor): string {
    return editor.isEmpty ? '' : editor.getHTML();
  }
}
