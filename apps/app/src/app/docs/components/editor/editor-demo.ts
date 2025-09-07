import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

import {
  ScEditor,
  ScEditorBlockquote,
  ScEditorBold,
  ScEditorBulletList,
  ScEditorCode,
  ScEditorCodeBlock,
  ScEditorColor,
  ScEditorContent,
  ScEditorExport,
  ScEditorFontFamily,
  ScEditorFontSize,
  ScEditorFooter,
  ScEditorGroup,
  ScEditorHeadingAndParagraphFormat,
  ScEditorHighlight,
  ScEditorHorizontalRule,
  ScEditorImageInsert,
  ScEditorImport,
  ScEditorItalic,
  ScEditorKeyboardShortcutsHelp,
  ScEditorLinkInsert,
  ScEditorLinkRemove,
  ScEditorOrderedList,
  ScEditorRedo,
  ScEditorStrike,
  ScEditorTableAddCellAttribute,
  ScEditorTableAddColumn,
  ScEditorTableAddColumnBefore,
  ScEditorTableAddRow,
  ScEditorTableAddRowBefore,
  ScEditorTableDelete,
  ScEditorTableFix,
  ScEditorTableGoToNextCell,
  ScEditorTableGoToPreviousCell,
  ScEditorTableInsert,
  ScEditorTableMergeCells,
  ScEditorTableMergeOrSplit,
  ScEditorTableRemoveColumn,
  ScEditorTableRemoveRow,
  ScEditorTableSplitCells,
  ScEditorTableToggleHeaderCell,
  ScEditorTableToggleHeaderColumn,
  ScEditorTableToggleHeaderRow,
  ScEditorTextAlignCenter,
  ScEditorTextAlignLeft,
  ScEditorTextAlignRight,
  ScEditorToolbar,
  ScEditorUnderline,
  ScEditorUndo,
  ScEditorVideoInsert,
  ScEditorWordCount,
} from '@semantic-components/editor';
import { ScSeparator } from '@semantic-components/ui';

@Component({
  selector: 'app-editor-demo',
  imports: [
    ScEditor,
    ScEditorContent,
    ScEditorFooter,
    ScEditorUndo,
    ScEditorRedo,
    ScEditorHighlight,
    ScEditorBold,
    ScEditorUnderline,
    ScEditorItalic,
    ScEditorBlockquote,
    ScEditorBulletList,
    ScEditorOrderedList,
    ScEditorHeadingAndParagraphFormat,
    ScSeparator,
    ScEditorGroup,
    ScEditorStrike,
    ScEditorHorizontalRule,
    ScEditorCode,
    ScEditorToolbar,
    ScEditorLinkRemove,
    ScEditorTextAlignRight,
    ScEditorTextAlignLeft,
    ScEditorTextAlignCenter,
    ReactiveFormsModule,
    ScEditorCodeBlock,
    ScEditorWordCount,
    ScEditorExport,
    ScEditorImport,
    ScEditorColor,
    ScEditorFontFamily,
    ScEditorImageInsert,
    ScEditorLinkInsert,
    ScEditorTableInsert,
    ScEditorTableDelete,
    ScEditorTableAddColumnBefore,
    ScEditorTableAddColumn,
    ScEditorTableAddRowBefore,
    ScEditorTableAddRow,
    ScEditorTableRemoveColumn,
    ScEditorTableRemoveRow,
    ScEditorTableMergeCells,
    ScEditorTableSplitCells,
    ScEditorTableMergeOrSplit,
    ScEditorTableToggleHeaderRow,
    ScEditorTableToggleHeaderColumn,
    ScEditorTableToggleHeaderCell,
    ScEditorTableAddCellAttribute,
    ScEditorTableGoToPreviousCell,
    ScEditorTableGoToNextCell,
    ScEditorTableFix,
    ScEditorFontSize,
    ScEditorVideoInsert,
    ScEditorKeyboardShortcutsHelp,
  ],
  template: `
    <div class="space-y-8">
      <!-- Editor Section -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Rich Text Editor</h3>
        <form [formGroup]="editorForm">
          <sc-editor formControlName="content">
            <sc-editor-toolbar>
              <sc-editor-group>
                <!-- History Actions -->
                <sc-editor-undo />
                <sc-editor-redo />
                <sc-separator class="h-5" orientation="vertical" />

                <!-- Text Formatting -->
                <sc-editor-bold />
                <sc-editor-italic />
                <sc-editor-underline />
                <sc-editor-strike />
                <sc-editor-highlight />
                <sc-separator class="h-5" orientation="vertical" />

                <!-- Structure -->
                <sc-editor-heading-and-paragraph-format />
                <sc-editor-blockquote />
                <sc-separator class="h-5" orientation="vertical" />

                <!-- Lists -->
                <sc-editor-bullet-list />
                <sc-editor-ordered-list />
                <sc-separator class="h-5" orientation="vertical" />

                <!-- Text Alignment -->
                <sc-editor-text-align-left />
                <sc-editor-text-align-center />
                <sc-editor-text-align-right />
                <sc-separator class="h-5" orientation="vertical" />

                <!-- Code -->
                <sc-editor-code />
                <sc-editor-code-block />
                <sc-separator class="h-5" orientation="vertical" />

                <!-- Media & Links -->
                <sc-editor-image-insert />
                <sc-editor-video-insert />
                <sc-editor-link-insert />
                <sc-editor-link-remove />
                <sc-separator class="h-5" orientation="vertical" />

                <!-- Tables -->
                <sc-editor-table-insert />
                <sc-editor-table-delete />
                <sc-editor-table-add-column-before />
                <sc-editor-table-add-column />
                <sc-editor-table-add-row-before />
                <sc-editor-table-add-row />
                <sc-editor-table-remove-column />
                <sc-editor-table-remove-row />
                <sc-editor-table-merge-cells />
                <sc-editor-table-split-cells />
                <sc-editor-table-merge-or-split />
                <sc-editor-table-toggle-header-row />
                <sc-editor-table-toggle-header-column />
                <sc-editor-table-toggle-header-cell />
                <sc-editor-table-add-cell-attribute />
                <sc-editor-table-go-to-previous-cell />
                <sc-editor-table-go-to-next-cell />
                <sc-editor-table-fix />
                <sc-separator class="h-5" orientation="vertical" />

                <!-- Styling -->
                <sc-editor-font-size />
                <sc-editor-color />
                <sc-editor-font-family />
                <sc-separator class="h-5" orientation="vertical" />

                <!-- Other Elements -->
                <sc-editor-horizontal-rule />
                <sc-separator class="h-5" orientation="vertical" />

                <!-- Import/Export & Help -->
                <sc-editor-import />
                <sc-editor-export />
                <sc-editor-keyboard-shortcuts-help />
              </sc-editor-group>
            </sc-editor-toolbar>
            <sc-editor-content />

            <sc-editor-footer>
              <div class="text-xs text-gray-500 dark:text-gray-400">Rich text editor</div>
              <div class="flex items-center space-x-4">
                <sc-editor-word-count />
              </div>
            </sc-editor-footer>
          </sc-editor>
        </form>
      </div>

      <!-- HTML Output Section -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Generated HTML</h3>
        <div class="border rounded-lg p-4 bg-muted/30">
          <pre
            class="text-sm overflow-x-auto whitespace-pre-wrap"
          ><code>{{ editorForm.get('content')?.value || '' }}</code></pre>
        </div>

        <h4 class="text-md font-semibold mt-6 mb-3">Rendered Output</h4>
        <div
          class="border rounded-lg p-4 prose prose-sm max-w-none"
          [innerHTML]="sanitizedContent()"
        ></div>
      </div>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorDemo {
  constructor(private sanitizer: DomSanitizer) {}

  protected readonly editorForm = new FormGroup({
    content: new FormControl(`
      <h1>Comprehensive Editor Demo</h1>
      <p>
        This demo showcases <strong>all available editor features</strong> including <em>italic text</em>,
        <u>underline</u>, <s>strikethrough</s>, and <mark>highlighted text</mark>.
      </p>

      <h2>Text Formatting Examples</h2>
      <p>
        You can format text with <code>inline code</code> or create code blocks:
      </p>

      <pre><code>function example() {
  console.log('Hello World!');
}</code></pre>

      <h3>Lists and Structure</h3>
      <ul>
        <li>Bullet point one</li>
        <li>Bullet point two</li>
      </ul>

      <ol>
        <li>Numbered list item</li>
        <li>Another numbered item</li>
      </ol>

      <blockquote>
        <p>This is a blockquote to demonstrate quote formatting.</p>
      </blockquote>

      <h4>Tables</h4>
      <table>
        <thead>
          <tr>
            <th>Header 1</th>
            <th>Header 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Cell 1</td>
            <td>Cell 2</td>
          </tr>
          <tr>
            <td>Cell 3</td>
            <td>Cell 4</td>
          </tr>
        </tbody>
      </table>

      <p style="text-align: center">This text is center-aligned</p>
      <p style="text-align: right">This text is right-aligned</p>

      <hr>

      <h5>Media Support</h5>
      <p>The editor supports images and YouTube videos (use the toolbar buttons to add them).</p>

      <h6>Getting Started</h6>
      <p>Use the toolbar above to test all the available formatting options!</p>
    `),
  });

  sanitizedContent() {
    const content = this.editorForm.get('content')?.value || '';
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }
}
