import { getSchema } from '@tiptap/core';
import { DOMParser, DOMSerializer, type Schema } from '@tiptap/pm/model';
import {
  DOCUMENT,
  Directive,
  ElementRef,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import type { ScEditorContentLayout } from './editor';
import { editorContentExtensions } from './editor-extensions';

let schema: Schema | null = null;

/**
 * Displays the editor's HTML — a saved post, a preview — as the editor shows
 * it: the same styles, without an editor. The HTML is read through the
 * editor's schema, so only what the editor can hold is shown (no scripts, no
 * unsafe links). Task checkboxes are shown, not changed. `layout="page"`
 * centres it in a column of readable width, as `scEditorContent` does.
 */
@Directive({
  selector: '[scEditorView]',
  host: {
    'data-slot': 'editor-document',
    '[attr.data-layout]': 'layout()',
    '[class]': 'class()',
  },
})
export class ScEditorView {
  private readonly document = inject(DOCUMENT);
  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  /** The HTML to display. */
  readonly html = input.required<string>({ alias: 'scEditorView' });
  readonly layout = input<ScEditorContentLayout>('default');
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'block text-foreground',
      this.layout() === 'page' &&
        'mx-auto max-w-[648px] p-12 max-[480px]:px-6 max-[480px]:py-4',
      this.classInput(),
    ),
  );

  constructor() {
    effect(() => this.element.replaceChildren(this.render(this.html())));
  }

  private render(html: string): DocumentFragment | HTMLElement {
    schema ??= getSchema(editorContentExtensions());
    // Parsed in a document of its own: nothing in it runs or loads.
    const inert = this.document.implementation.createHTMLDocument('');
    inert.body.innerHTML = html;
    const doc = DOMParser.fromSchema(schema).parse(inert.body);
    const fragment = DOMSerializer.fromSchema(schema).serializeFragment(
      doc.content,
      { document: this.document },
    );
    // Tasks: their checkboxes show the state, named by the task.
    for (const task of fragment.querySelectorAll('li[data-type="taskItem"]')) {
      const checkbox = task.querySelector('input');
      if (!checkbox) continue;
      checkbox.disabled = true;
      checkbox.setAttribute(
        'aria-label',
        task.querySelector(':scope > div')?.textContent ?? '',
      );
    }
    return fragment;
  }
}
