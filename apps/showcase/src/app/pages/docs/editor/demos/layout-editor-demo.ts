import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import { ScToggleGroup, ScToggleGroupItem } from '@semantic-components/ui';
import {
  ScEditor,
  ScEditorBold,
  ScEditorContent,
  type ScEditorContentLayout,
  ScEditorItalic,
  ScEditorToolbar,
  ScEditorToolbarGroup,
} from '@semantic-components/ui/editor';
import { SiBoldIcon, SiItalicIcon } from '@semantic-icons/lucide-icons';

const LETTER = `<h2>A letter</h2>
<p>The page layout sets the text in a centred column of readable width, with page margins, as a document. The default layout pads it edge to edge, for a field or a comment box.</p>
<p>Switch between them: the toolbar follows, its buttons centred over the column.</p>`;

const LAYOUTS: ScEditorContentLayout[] = ['default', 'page'];

/** The same document in the two layouts of `scEditorContent`. */
@Component({
  selector: 'app-layout-editor-demo',
  imports: [
    FormField,
    ScEditor,
    ScEditorBold,
    ScEditorContent,
    ScEditorItalic,
    ScEditorToolbar,
    ScEditorToolbarGroup,
    ScToggleGroup,
    ScToggleGroupItem,
    SiBoldIcon,
    SiItalicIcon,
  ],
  template: `
    <div class="w-full space-y-4">
      <div
        scToggleGroup
        type="single"
        variant="outline"
        aria-label="Layout"
        [value]="layout()"
        (valueChange)="setLayout($event)"
      >
        @for (l of layouts; track l) {
          <button scToggleGroupItem [value]="l">{{ layoutLabels[l] }}</button>
        }
      </div>

      <div
        scEditor
        [formField]="editorForm.body"
        class="overflow-hidden rounded-lg border"
      >
        <div scEditorToolbar aria-label="Formatting">
          <div scEditorToolbarGroup>
            <button scEditorBold value="bold">
              <svg siBoldIcon></svg>
              <span class="sr-only">Bold</span>
            </button>
            <button scEditorItalic value="italic">
              <svg siItalicIcon></svg>
              <span class="sr-only">Italic</span>
            </button>
          </div>
        </div>

        <div
          scEditorContent
          ariaLabel="Letter"
          [layout]="layout()"
          class="max-h-[500px]"
        ></div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class LayoutEditorDemo {
  private readonly model = signal({ body: LETTER });
  readonly editorForm = form(this.model);

  readonly layouts = LAYOUTS;
  readonly layoutLabels: Record<ScEditorContentLayout, string> = {
    default: 'Default',
    page: 'Page',
  };
  readonly layout = signal<ScEditorContentLayout>('page');

  setLayout(value: string | string[] | null): void {
    if (LAYOUTS.includes(value as ScEditorContentLayout)) {
      this.layout.set(value as ScEditorContentLayout);
    }
  }
}
