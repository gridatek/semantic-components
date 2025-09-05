import { DOCUMENT } from '@angular/common';
import { Injectable, afterNextRender, inject } from '@angular/core';

import { Editor } from '@tiptap/core';

export interface ShortcutMapping {
  key: string;
  ctrlOrCmd?: boolean;
  shift?: boolean;
  alt?: boolean;
  action: (editor: Editor) => void;
  description: string;
}

@Injectable()
export class ScKeyboardShortcuts {
  private readonly document = inject(DOCUMENT);
  private editor!: Editor;
  private shortcuts: ShortcutMapping[] = [];

  private readonly defaultShortcuts: ShortcutMapping[] = [
    {
      key: 'b',
      ctrlOrCmd: true,
      action: (editor) => editor.chain().focus().toggleBold().run(),
      description: 'Toggle Bold',
    },
    {
      key: 'i',
      ctrlOrCmd: true,
      action: (editor) => editor.chain().focus().toggleItalic().run(),
      description: 'Toggle Italic',
    },
    {
      key: 'u',
      ctrlOrCmd: true,
      action: (editor) => editor.chain().focus().toggleUnderline().run(),
      description: 'Toggle Underline',
    },
    {
      key: 'z',
      ctrlOrCmd: true,
      action: (editor) => editor.chain().focus().undo().run(),
      description: 'Undo',
    },
    {
      key: 'y',
      ctrlOrCmd: true,
      action: (editor) => editor.chain().focus().redo().run(),
      description: 'Redo',
    },
    {
      key: 'z',
      ctrlOrCmd: true,
      shift: true,
      action: (editor) => editor.chain().focus().redo().run(),
      description: 'Redo (Alt)',
    },
    {
      key: '`',
      ctrlOrCmd: true,
      action: (editor) => editor.chain().focus().toggleCode().run(),
      description: 'Toggle Inline Code',
    },
    {
      key: 'k',
      ctrlOrCmd: true,
      action: (editor) => {
        const url = window.prompt('Enter URL:');
        if (url) {
          editor.chain().focus().setLink({ href: url }).run();
        }
      },
      description: 'Insert Link',
    },
    {
      key: 'Enter',
      ctrlOrCmd: true,
      shift: true,
      action: (editor) => editor.chain().focus().toggleCodeBlock().run(),
      description: 'Insert Code Block',
    },
    {
      key: '1',
      ctrlOrCmd: true,
      action: (editor) => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      description: 'Heading 1',
    },
    {
      key: '2',
      ctrlOrCmd: true,
      action: (editor) => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      description: 'Heading 2',
    },
    {
      key: '3',
      ctrlOrCmd: true,
      action: (editor) => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      description: 'Heading 3',
    },
    {
      key: 'l',
      ctrlOrCmd: true,
      shift: true,
      action: (editor) => editor.chain().focus().toggleBulletList().run(),
      description: 'Toggle Bullet List',
    },
    {
      key: 'o',
      ctrlOrCmd: true,
      shift: true,
      action: (editor) => editor.chain().focus().toggleOrderedList().run(),
      description: 'Toggle Ordered List',
    },
    {
      key: 'q',
      ctrlOrCmd: true,
      shift: true,
      action: (editor) => editor.chain().focus().toggleBlockquote().run(),
      description: 'Toggle Blockquote',
    },
    {
      key: 'e',
      ctrlOrCmd: true,
      shift: true,
      action: (editor) => editor.chain().focus().setTextAlign('center').run(),
      description: 'Center Align',
    },
    {
      key: 'l',
      ctrlOrCmd: true,
      alt: true,
      action: (editor) => editor.chain().focus().setTextAlign('left').run(),
      description: 'Left Align',
    },
    {
      key: 'r',
      ctrlOrCmd: true,
      alt: true,
      action: (editor) => editor.chain().focus().setTextAlign('right').run(),
      description: 'Right Align',
    },
  ];

  constructor() {
    afterNextRender(() => {
      this.setupEventListeners();
    });
  }

  setEditor(editor: Editor) {
    this.editor = editor;
    this.shortcuts = [...this.defaultShortcuts];
  }

  addShortcut(shortcut: ShortcutMapping) {
    this.shortcuts.push(shortcut);
  }

  getShortcuts(): ShortcutMapping[] {
    return [...this.shortcuts];
  }

  private setupEventListeners() {
    this.document.addEventListener('keydown', this.handleKeydown.bind(this));
  }

  private handleKeydown(event: KeyboardEvent) {
    if (!this.editor || !this.editor.isFocused) {
      return;
    }

    const matchingShortcut = this.shortcuts.find((shortcut) =>
      this.matchesShortcut(event, shortcut),
    );

    if (matchingShortcut) {
      event.preventDefault();
      event.stopPropagation();
      matchingShortcut.action(this.editor);
    }
  }

  private matchesShortcut(event: KeyboardEvent, shortcut: ShortcutMapping): boolean {
    const key = event.key.toLowerCase();
    const ctrlOrCmd = event.ctrlKey || event.metaKey;
    const shift = event.shiftKey;
    const alt = event.altKey;

    return (
      key === shortcut.key.toLowerCase() &&
      !!ctrlOrCmd === !!shortcut.ctrlOrCmd &&
      !!shift === !!shortcut.shift &&
      !!alt === !!shortcut.alt
    );
  }

  destroy() {
    this.document.removeEventListener('keydown', this.handleKeydown.bind(this));
  }
}
