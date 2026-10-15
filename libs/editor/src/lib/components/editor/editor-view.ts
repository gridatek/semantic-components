import { getSchema } from '@tiptap/core';
import {
  DOMParser,
  DOMSerializer,
  type Node as ProseMirrorNode,
  type Schema,
} from '@tiptap/pm/model';
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
import type { ScEditorContentLayout, ScEditorValue } from './editor';
import { editorContentExtensions } from './editor-extensions';

let schema: Schema | null = null;

/**
 * Displays what the editor wrote — a saved post, a preview — as the editor
 * shows it: the same styles, without an editor. Takes either format the editor
 * gives: HTML (a string) or Tiptap's JSON (an object). Either is read through
 * the editor's schema, so only what the editor can hold is shown (no scripts,
 * no unsafe links). Task checkboxes are shown, not changed. `layout="page"`
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

  /** The document to display: HTML or Tiptap's JSON. */
  readonly content = input.required<ScEditorValue>({ alias: 'scEditorView' });
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
    effect(() => this.element.replaceChildren(this.render(this.content())));
  }

  private render(content: ScEditorValue): DocumentFragment | HTMLElement {
    schema ??= getSchema(editorContentExtensions());
    const doc = this.parse(schema, content);
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

  /** The document, from HTML or JSON; what the schema can't hold is dropped. */
  private parse(schema: Schema, content: ScEditorValue): ProseMirrorNode {
    if (content === null || typeof content === 'object') {
      try {
        const doc = schema.nodeFromJSON(
          content ?? { type: 'doc', content: [] },
        );
        // Its structure too: a list item in a heading isn't shown half-built.
        doc.check();
        return doc;
      } catch {
        // Not a document the editor could have written: nothing to show.
        // (Unsafe link addresses are emptied when rendered, from JSON or HTML.)
        return schema.topNodeType.createAndFill() ?? schema.node('doc');
      }
    }
    // Parsed in a document of its own: nothing in it runs or loads.
    const inert = this.document.implementation.createHTMLDocument('');
    inert.body.innerHTML = content;
    return DOMParser.fromSchema(schema).parse(inert.body);
  }
}
