import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { NoCountEditorDemo } from './no-count-editor-demo';

@Component({
  selector: 'app-no-count-editor-demo-container',
  imports: [DemoContainer, NoCountEditorDemo],
  template: `
    <app-demo-container
      title="Without Word Count"
      [code]="code"
      demoUrl="/demos/editor/no-count-editor-demo"
    >
      <app-no-count-editor-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoCountEditorDemoContainer {
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
} from '@semantic-components/editor';
import {
  SiBoldIcon,
  SiItalicIcon,
  SiUnderlineIcon,
  SiListIcon,
  SiListOrderedIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-no-count-editor-demo',
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
    SiBoldIcon,
    SiItalicIcon,
    SiUnderlineIcon,
    SiListIcon,
    SiListOrderedIcon,
  ],
  template: \`
    <div scEditor class="border rounded-lg overflow-hidden">
      <div scEditorToolbar>
        <div scEditorToolbarGroup>
          <button scEditorBold>
            <svg siBoldIcon></svg>
            <span class="sr-only">Bold</span>
          </button>
          <button scEditorItalic>
            <svg siItalicIcon></svg>
            <span class="sr-only">Italic</span>
          </button>
          <button scEditorUnderline>
            <svg siUnderlineIcon></svg>
            <span class="sr-only">Underline</span>
          </button>
        </div>

        <div scEditorSeparator></div>

        <div scEditorToolbarGroup>
          <button scEditorBulletList>
            <svg siListIcon></svg>
            <span class="sr-only">Bullet list</span>
          </button>
          <button scEditorNumberedList>
            <svg siListOrderedIcon></svg>
            <span class="sr-only">Numbered list</span>
          </button>
        </div>
      </div>

      <div scEditorContent [(value)]="content" minHeight="100px"></div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoCountEditorDemo {
  readonly content = signal('');
}`;
}
