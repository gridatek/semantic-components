import { Directive, InjectionToken, input, signal } from '@angular/core';
import { Editor } from '@tiptap/core';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import StarterKit from '@tiptap/starter-kit';

export type ScEditorAlignment = 'left' | 'center' | 'right' | 'justify';
export type ScEditorHeading = 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export const SC_EDITOR = new InjectionToken<ScEditor>('SC_EDITOR');

@Directive({
  selector: '[sc-editor]',
  exportAs: 'scEditor',
  providers: [{ provide: SC_EDITOR, useExisting: ScEditor }],
  host: {
    'data-slot': 'editor',
    '[attr.data-disabled]': 'disabled() || null',
  },
})
export class ScEditor {
  readonly disabled = input<boolean>(false);
  readonly readonly = input<boolean>(false);

  // State signals
  readonly isBold = signal(false);
  readonly isItalic = signal(false);
  readonly isUnderline = signal(false);
  readonly isStrikethrough = signal(false);
  readonly isOrderedList = signal(false);
  readonly isUnorderedList = signal(false);
  readonly isBlockquote = signal(false);
  readonly alignment = signal<ScEditorAlignment>('left');
  readonly currentHeading = signal<ScEditorHeading>('p');
  readonly canUndo = signal(false);
  readonly canRedo = signal(false);

  // Reference to content element
  readonly contentElement = signal<HTMLElement | null>(null);

  // Tiptap editor instance
  readonly editorInstance = signal<Editor | null>(null);

  // Initialize Tiptap editor
  initializeEditor(
    element: HTMLElement,
    initialContent: string,
    placeholder = 'Start typing...',
  ): void {
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
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
        Placeholder.configure({
          placeholder,
        }),
      ],
      content: initialContent,
      editable: !this.disabled() && !this.readonly(),
      onUpdate: () => {
        this.updateToolbarState();
      },
      onSelectionUpdate: () => {
        this.updateToolbarState();
      },
    });

    this.editorInstance.set(editor);
    this.contentElement.set(element);
  }

  // Execute a formatting command
  execCommand(command: string, value?: string): void {
    if (this.disabled() || this.readonly()) return;

    const editor = this.editorInstance();
    if (!editor) return;

    editor.chain().focus();

    switch (command) {
      case 'bold':
        editor.chain().focus().toggleBold().run();
        break;
      case 'italic':
        editor.chain().focus().toggleItalic().run();
        break;
      case 'underline':
        editor.chain().focus().toggleUnderline().run();
        break;
      case 'strikethrough':
        editor.chain().focus().toggleStrike().run();
        break;
      case 'insertUnorderedList':
        editor.chain().focus().toggleBulletList().run();
        break;
      case 'insertOrderedList':
        editor.chain().focus().toggleOrderedList().run();
        break;
      case 'justifyLeft':
        editor.chain().focus().setTextAlign('left').run();
        break;
      case 'justifyCenter':
        editor.chain().focus().setTextAlign('center').run();
        break;
      case 'justifyRight':
        editor.chain().focus().setTextAlign('right').run();
        break;
      case 'justifyFull':
        editor.chain().focus().setTextAlign('justify').run();
        break;
      case 'formatBlock':
        if (value === 'blockquote') {
          editor.chain().focus().toggleBlockquote().run();
        } else if (value && value !== 'p') {
          const level = parseInt(value.replace('h', '')) as
            | 1
            | 2
            | 3
            | 4
            | 5
            | 6;
          editor.chain().focus().setHeading({ level }).run();
        } else {
          editor.chain().focus().setParagraph().run();
        }
        break;
      case 'createLink':
        if (value) {
          editor.chain().focus().setLink({ href: value }).run();
        }
        break;
      case 'insertHTML':
        if (value) {
          editor.chain().focus().insertContent(value).run();
        }
        break;
      case 'insertHorizontalRule':
        editor.chain().focus().setHorizontalRule().run();
        break;
      case 'removeFormat':
        editor.chain().focus().clearNodes().unsetAllMarks().run();
        break;
      case 'undo':
        editor.chain().focus().undo().run();
        break;
      case 'redo':
        editor.chain().focus().redo().run();
        break;
    }
  }

  // Destroy editor
  destroyEditor(): void {
    this.editorInstance()?.destroy();
    this.editorInstance.set(null);
  }

  // Update toolbar state based on current selection
  updateToolbarState(): void {
    const editor = this.editorInstance();
    if (!editor) return;

    this.isBold.set(editor.isActive('bold'));
    this.isItalic.set(editor.isActive('italic'));
    this.isUnderline.set(editor.isActive('underline'));
    this.isStrikethrough.set(editor.isActive('strike'));
    this.isOrderedList.set(editor.isActive('orderedList'));
    this.isUnorderedList.set(editor.isActive('bulletList'));
    this.isBlockquote.set(editor.isActive('blockquote'));

    // Check alignment
    if (editor.isActive({ textAlign: 'left' })) {
      this.alignment.set('left');
    } else if (editor.isActive({ textAlign: 'center' })) {
      this.alignment.set('center');
    } else if (editor.isActive({ textAlign: 'right' })) {
      this.alignment.set('right');
    } else if (editor.isActive({ textAlign: 'justify' })) {
      this.alignment.set('justify');
    } else {
      this.alignment.set('left'); // default
    }

    // Check heading level
    for (let level = 1; level <= 6; level++) {
      if (editor.isActive('heading', { level })) {
        this.currentHeading.set(`h${level}` as ScEditorHeading);
        this.canUndo.set(editor.can().undo());
        this.canRedo.set(editor.can().redo());
        return;
      }
    }
    this.currentHeading.set('p');

    // Check undo/redo availability
    this.canUndo.set(editor.can().undo());
    this.canRedo.set(editor.can().redo());
  }
}
