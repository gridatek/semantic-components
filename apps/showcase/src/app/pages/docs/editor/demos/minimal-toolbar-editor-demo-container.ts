import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { MinimalToolbarEditorDemo } from './minimal-toolbar-editor-demo';

@Component({
  selector: 'app-minimal-toolbar-editor-demo-container',
  imports: [DemoContainer, MinimalToolbarEditorDemo],
  template: `
    <app-demo-container
      title="Minimal Toolbar"
      [code]="code"
      demoUrl="/demos/editor/minimal-toolbar-editor-demo"
    >
      <app-minimal-toolbar-editor-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MinimalToolbarEditorDemoContainer {
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
  ScEditorFooter,
  ScEditorCount,
  ScEditorWordCount,
  ScEditorCharCount,
} from '@semantic-components/editor';
import { SiBoldIcon, SiItalicIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-minimal-toolbar-editor-demo',
  imports: [
    ScEditor,
    ScEditorContent,
    ScEditorToolbar,
    ScEditorToolbarGroup,
    ScEditorBoldButton,
    ScEditorItalicButton,
    ScEditorFooter,
    ScEditorCount,
    ScEditorWordCount,
    ScEditorCharCount,
    SiBoldIcon,
    SiItalicIcon,
  ],
  template: \`
    <div scEditor class="border rounded-lg overflow-hidden">
      <div scEditorToolbar>
        <div scEditorToolbarGroup>
          <button scEditorBold>
            <svg si-bold-icon></svg>
            <span class="sr-only">Bold</span>
          </button>
          <button scEditorItalic>
            <svg si-italic-icon></svg>
            <span class="sr-only">Italic</span>
          </button>
        </div>
      </div>

      <div
        scEditorContent
        [(value)]="content"
        placeholder="Simple text formatting only..."
      ></div>

      <div scEditorFooter>
        <div scEditorCount>
          <span scEditorWordCount></span>
          <span scEditorCharCount></span>
        </div>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MinimalToolbarEditorDemo {
  readonly content = signal('');
}`;
}
