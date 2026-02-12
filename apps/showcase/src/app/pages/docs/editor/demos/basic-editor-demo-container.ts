import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicEditorDemo } from './basic-editor-demo';

@Component({
  selector: 'app-basic-editor-demo-container',
  imports: [DemoContainer, BasicEditorDemo],
  template: `
    <app-demo-container
      title="Basic Editor"
      [code]="code"
      demoUrl="/demos/editor/basic-editor-demo"
    >
      <app-basic-editor-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicEditorDemoContainer {
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
  selector: 'app-basic-editor-demo',
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

      <div
        sc-editor-content
        [(value)]="content"
        placeholder="Start writing your content..."
      ></div>

      <div sc-editor-footer>
        <div sc-editor-count>
          <span sc-editor-word-count></span>
          <span sc-editor-char-count></span>
        </div>
      </div>
    </div>

    <div class="mt-4">
      <h4 class="text-sm font-medium mb-2">HTML Output:</h4>
      <pre class="p-3 bg-muted rounded-lg text-xs overflow-x-auto max-h-32">{{
        content()
      }}</pre>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicEditorDemo {
  readonly content = signal('');
}`;
}
