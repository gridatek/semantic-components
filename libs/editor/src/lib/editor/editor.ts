import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  ViewEncapsulation,
  afterNextRender,
  computed,
  contentChild,
  effect,
  forwardRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { cn } from '@semantic-components/utils';
import { Editor } from '@tiptap/core';
import Document from '@tiptap/extension-document';
import Heading from '@tiptap/extension-heading';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';

import { ScImportExport } from './actions/import-export/import-export.service';
import { ScKeyboardShortcuts } from './actions/keyboard-shortcuts/keyboard-shortcuts.service';
import { ScEditorContent } from './editor-content';
import { ScEditorExtensions } from './editor-extensions';
import { ScWordCount } from './word-count/word-count.service';

@Component({
  selector: 'sc-editor',
  imports: [],
  template: `
    @if (isLoading()) {
      <div class="flex items-center justify-center py-8">
        <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
        <span class="ml-2 text-muted-foreground">Loading editor...</span>
      </div>
    } @else if (loadingError()) {
      <div class="flex items-center justify-center py-8">
        <div class="text-destructive">
          <span class="text-sm">Failed to load editor: {{ loadingError() }}</span>
        </div>
      </div>
    } @else {
      <ng-content />
    }
  `,
  host: {
    '[class]': 'class()',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ScEditor),
      multi: true,
    },
    ScEditorExtensions,
    ScKeyboardShortcuts,
    ScWordCount,
    ScImportExport,
  ],
})
export class ScEditor implements ControlValueAccessor, OnDestroy {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly keyboardShortcuts = inject(ScKeyboardShortcuts);
  private readonly wordCount = inject(ScWordCount);
  private readonly importExport = inject(ScImportExport);

  readonly editorContent = contentChild.required(ScEditorContent);

  readonly value = signal('');
  readonly isEditable = signal(true);
  readonly isLoading = signal(true);
  readonly loadingError = signal<string | null>(null);

  readonly classInput = input<string>('', {
    alias: 'class',
  });

  readonly characterLimit = input<number | null>(null);
  readonly wordLimit = input<number | null>(null);

  protected readonly class = computed(() =>
    cn('block border border-input rounded-md overflow-hidden', this.classInput()),
  );

  onChange: (value: string) => void = () => {};

  onTouched: () => void = () => {};

  editor!: Editor;

  readonly extensions = inject(ScEditorExtensions);

  constructor() {
    afterNextRender(async () => {
      try {
        await this.createEditor();
      } catch (error) {
        this.loadingError.set(
          error instanceof Error ? error.message : 'Failed to initialize editor',
        );
        this.isLoading.set(false);
      }
    });

    // Update word count limits when they change
    effect(() => {
      if (this.editor) {
        this.wordCount.setCharacterLimit(this.characterLimit());
        this.wordCount.setWordLimit(this.wordLimit());
      }
    });
  }

  async createEditor() {
    const extensions = [];
    extensions.push(Document);
    extensions.push(Heading);
    extensions.push(Paragraph);
    extensions.push(Text);

    // Load extensions from consolidated packages
    if (this.extensions.highlight()) {
      const Highlight = (await import('@tiptap/extension-highlight')).Highlight;
      extensions.push(Highlight);
    }

    if (this.extensions.textStyle()) {
      const TextStyle = (await import('@tiptap/extension-text-style')).TextStyle;
      extensions.push(TextStyle);
    }

    if (this.extensions.color()) {
      const Color = (await import('@tiptap/extension-color')).Color;
      extensions.push(Color);
    }

    if (this.extensions.fontFamily()) {
      const FontFamily = (await import('@tiptap/extension-font-family')).FontFamily;
      extensions.push(FontFamily);
    }

    if (this.extensions.underline()) {
      const Underline = (await import('@tiptap/extension-underline')).Underline;
      extensions.push(Underline);
    }

    if (this.extensions.image()) {
      const Image = (await import('@tiptap/extension-image')).Image;
      extensions.push(Image);
    }

    if (this.extensions.youtube()) {
      const Youtube = (await import('@tiptap/extension-youtube')).Youtube;
      extensions.push(Youtube);
    }

    if (this.extensions.link()) {
      const Link = (await import('@tiptap/extension-link')).Link;
      extensions.push(Link);
    }

    if (this.extensions.textAlign()) {
      const TextAlign = (await import('@tiptap/extension-text-align')).TextAlign;
      extensions.push(
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
      );
    }

    // Use consolidated list extensions
    if (this.extensions.list()) {
      const { BulletList, OrderedList, ListItem } = await import('@tiptap/extension-list');

      extensions.push(ListItem);
      extensions.push(BulletList);
      extensions.push(OrderedList);
    }

    if (this.extensions.strike()) {
      const Strike = (await import('@tiptap/extension-strike')).Strike;
      extensions.push(Strike);
    }

    if (this.extensions.italic()) {
      const Italic = (await import('@tiptap/extension-italic')).Italic;
      extensions.push(Italic);
    }

    if (this.extensions.bold()) {
      const Bold = (await import('@tiptap/extension-bold')).Bold;
      extensions.push(Bold);
    }

    if (this.extensions.horizontalRule()) {
      const HorizontalRule = (await import('@tiptap/extension-horizontal-rule')).HorizontalRule;
      extensions.push(HorizontalRule);
    }

    if (this.extensions.blockquote()) {
      const Blockquote = (await import('@tiptap/extension-blockquote')).Blockquote;
      extensions.push(Blockquote);
    }

    if (this.extensions.code()) {
      const Code = (await import('@tiptap/extension-code')).Code;
      extensions.push(Code);
    }

    if (this.extensions.codeBlock()) {
      const CodeBlock = (await import('@tiptap/extension-code-block')).CodeBlock;
      extensions.push(CodeBlock);
    }

    // Use UndoRedo instead of History (v3 change)
    if (this.extensions.undoRedo()) {
      const { UndoRedo } = await import('@tiptap/extensions');
      extensions.push(UndoRedo);
    }

    // Use consolidated table extensions
    if (this.extensions.table()) {
      const { Table, TableRow, TableCell, TableHeader } = await import('@tiptap/extension-table');

      extensions.push(TableHeader);
      extensions.push(TableRow);
      extensions.push(TableCell);
      extensions.push(
        Table.configure({
          resizable: true,
        }),
      );
    }

    this.editor = new Editor({
      element: this.editorContent().nativeElement,
      extensions: extensions,
      content: this.value(),
      editable: this.isEditable(),
      editorProps: {
        attributes: {
          class: 'prose focus:outline-none max-w-full',
        },
      },
    });

    this.editor.on('update', ({ editor }) => {
      this.setHtmlContent(editor.getHTML());
    });

    this.editor.on('blur', () => {
      this.onTouched();
    });

    // Setup keyboard shortcuts
    this.keyboardShortcuts.setEditor(this.editor);

    // Setup word count
    this.wordCount.setEditor(this.editor);
    this.wordCount.setCharacterLimit(this.characterLimit());
    this.wordCount.setWordLimit(this.wordLimit());

    // Setup import/export
    this.importExport.setEditor(this.editor);

    // Editor is now fully initialized
    this.isLoading.set(false);
  }

  ngOnDestroy() {
    this.keyboardShortcuts.destroy();
    if (this.editor) {
      this.editor.destroy();
    }
  }

  writeValue(value: string): void {
    this.value.set(value);
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isEditable.set(!isDisabled);
  }

  setHtmlContent(htmlContent: string) {
    this.value.set(htmlContent);
    this.onChange(htmlContent);
    this.changeDetectorRef.markForCheck();
  }
}
