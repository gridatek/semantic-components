import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BubbleMenuEditorDemo } from './bubble-menu-editor-demo';

@Component({
  selector: 'app-bubble-menu-editor-demo-container',
  imports: [DemoContainer, BubbleMenuEditorDemo],
  template: `
    <app-demo-container
      title="A comment with a floating toolbar"
      [code]="code"
      demoUrl="/demos/editor/bubble-menu-editor-demo"
    >
      <app-bubble-menu-editor-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class BubbleMenuEditorDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScEditor,
  ScEditorBold,
  ScEditorCode,
  ScEditorContent,
  ScEditorItalic,
  ScEditorStrikethrough,
  ScEditorToolbarGroup,
  ScEditorUnderline,
} from '@semantic-components/ui/editor';
import { ScEditorBubbleMenu } from '@semantic-components/ui/editor/bubble-menu';
import {
  SiBoldIcon,
  SiCodeIcon,
  SiItalicIcon,
  SiStrikethroughIcon,
  SiUnderlineIcon,
} from '@semantic-icons/lucide-icons';

const COMMENT =
  '<p>Select some of this text: the floating toolbar shows above it.</p>';

/**
 * No toolbar, only a floating one by the selected text — the bubble menu
 * needs no provider: it adds itself to the editor.
 */
@Component({
  selector: 'app-bubble-menu-editor-demo',
  imports: [
    FormField,
    ScEditor,
    ScEditorBold,
    ScEditorBubbleMenu,
    ScEditorCode,
    ScEditorContent,
    ScEditorItalic,
    ScEditorStrikethrough,
    ScEditorToolbarGroup,
    ScEditorUnderline,
    SiBoldIcon,
    SiCodeIcon,
    SiItalicIcon,
    SiStrikethroughIcon,
    SiUnderlineIcon,
  ],
  template: \`
    <div class="w-full">
      <div
        scEditor
        [formField]="editorForm.body"
        class="overflow-hidden rounded-lg border"
      >
        <div scEditorBubbleMenu aria-label="Selection">
          <div scEditorToolbarGroup>
            <button scEditorBold value="bold">
              <svg siBoldIcon></svg>
              <span class="sr-only">Bold</span>
            </button>
            <button scEditorItalic value="italic">
              <svg siItalicIcon></svg>
              <span class="sr-only">Italic</span>
            </button>
            <button scEditorUnderline value="underline">
              <svg siUnderlineIcon></svg>
              <span class="sr-only">Underline</span>
            </button>
            <button scEditorStrikethrough value="strikethrough">
              <svg siStrikethroughIcon></svg>
              <span class="sr-only">Strikethrough</span>
            </button>
            <button scEditorCode value="code">
              <svg siCodeIcon></svg>
              <span class="sr-only">Code</span>
            </button>
          </div>
        </div>

        <div scEditorContent ariaLabel="Comment"></div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BubbleMenuEditorDemo {
  private readonly model = signal({ body: COMMENT });
  readonly editorForm = form(this.model);
}`;
}
