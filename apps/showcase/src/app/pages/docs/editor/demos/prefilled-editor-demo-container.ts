import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { PrefilledEditorDemo } from './prefilled-editor-demo';

@Component({
  selector: 'app-prefilled-editor-demo-container',
  imports: [DemoContainer, PrefilledEditorDemo],
  template: `
    <app-demo-container
      title="With Initial Content"
      [code]="code"
      demoUrl="/demos/editor/prefilled-editor-demo"
    >
      <app-prefilled-editor-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrefilledEditorDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScEditor,
  ScEditorContent,
  ScEditorToolbar,
  ScEditorToolbarGroup,
  ScEditorBoldButton,
  ScEditorItalicButton,
  ScEditorUnderlineButton,
  ScEditorSeparator,
  ScEditorBulletListButton,
  ScEditorNumberedListButton,
  ScEditorFooter,
  ScEditorCount,
  ScEditorWordCount,
  ScEditorCharCount,
} from '@semantic-components/ui-lab';
import {
  SiBoldIcon,
  SiItalicIcon,
  SiUnderlineIcon,
  SiListIcon,
  SiListOrderedIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-prefilled-editor-demo',
  imports: [
    ScEditor,
    ScEditorContent,
    ScEditorToolbar,
    ScEditorToolbarGroup,
    ScEditorBoldButton,
    ScEditorItalicButton,
    ScEditorUnderlineButton,
    ScEditorSeparator,
    ScEditorBulletListButton,
    ScEditorNumberedListButton,
    ScEditorFooter,
    ScEditorCount,
    ScEditorWordCount,
    ScEditorCharCount,
    SiBoldIcon,
    SiItalicIcon,
    SiUnderlineIcon,
    SiListIcon,
    SiListOrderedIcon,
  ],
  template: \`
    <div sc-editor class="border rounded-lg overflow-hidden">
      <div sc-editor-toolbar>
        <div sc-editor-toolbar-group>
          <button sc-editor-bold>
            <svg si-bold-icon></svg>
            <span class="sr-only">Bold</span>
          </button>
          <button sc-editor-italic>
            <svg si-italic-icon></svg>
            <span class="sr-only">Italic</span>
          </button>
          <button sc-editor-underline>
            <svg si-underline-icon></svg>
            <span class="sr-only">Underline</span>
          </button>
        </div>

        <div sc-editor-separator></div>

        <div sc-editor-toolbar-group>
          <button sc-editor-bullet-list>
            <svg si-list-icon></svg>
            <span class="sr-only">Bullet list</span>
          </button>
          <button sc-editor-numbered-list>
            <svg si-list-ordered-icon></svg>
            <span class="sr-only">Numbered list</span>
          </button>
        </div>
      </div>

      <div sc-editor-content [(value)]="content"></div>

      <div sc-editor-footer>
        <div sc-editor-count>
          <span sc-editor-word-count></span>
          <span sc-editor-char-count></span>
        </div>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrefilledEditorDemo {
  readonly content = signal(\`
    <h2>Welcome to the Rich Text Editor</h2>
    <p>This is a <strong>full-featured</strong> WYSIWYG editor with support for:</p>
    <ul>
      <li><strong>Bold</strong>, <em>italic</em>, and <u>underline</u> text</li>
      <li>Multiple heading levels</li>
      <li>Ordered and unordered lists</li>
      <li><a href="https://example.com">Hyperlinks</a></li>
      <li>And much more!</li>
    </ul>
    <blockquote>
      This is a blockquote for highlighting important information.
    </blockquote>
    <p>You can also add <code>inline code</code> snippets.</p>
  \`);
}`;
}
