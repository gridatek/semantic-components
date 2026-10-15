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
import type {
  ScEditorContentLayout,
  ScEditorFormat,
  ScEditorValue,
} from './editor';
import { editorContentExtensions } from './editor-extensions';
import { SC_EDITOR_FEATURES } from './editor-features';
import { editorMarkdown, textToDocument } from './editor-format';

/** The schema of each set of features (made once). */
const schemas = new WeakMap<object, Schema>();

/**
 * Displays what the editor wrote — a saved post, a preview — as the editor
 * shows it: the same styles, without an editor. Give it the editor's `format`:
 * HTML (the default), Markdown or plain text as a string, Tiptap's JSON as an
 * object (an object is read as JSON whatever the format). Any is read through
 * the editor's schema — with the features of `provideEditor` — so only what
 * the editor can hold is shown (no scripts, no unsafe links). Task checkboxes are shown, not changed. `layout="page"`
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
  private readonly features = inject(SC_EDITOR_FEATURES);
  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  /** The document to display: HTML or Tiptap's JSON. */
  readonly content = input.required<ScEditorValue>({ alias: 'scEditorView' });
  /** The format the content is in, as the editor's. */
  readonly format = input<ScEditorFormat>('html');
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
    let schema = schemas.get(this.features);
    if (!schema) {
      schema = getSchema(editorContentExtensions(this.features));
      schemas.set(this.features, schema);
    }
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
    // Code blocks scroll sideways: the keyboard can reach and scroll them.
    for (const code of fragment.querySelectorAll('pre')) code.tabIndex = 0;
    return fragment;
  }

  /** The document, from HTML or JSON; what the schema can't hold is dropped. */
  private parse(schema: Schema, content: ScEditorValue): ProseMirrorNode {
    const format = this.format();
    if (
      typeof content !== 'string' ||
      format === 'text' ||
      format === 'markdown'
    ) {
      try {
        const doc = schema.nodeFromJSON(
          typeof content !== 'string'
            ? (content ?? { type: 'doc', content: [] })
            : format === 'text'
              ? textToDocument(content)
              : editorMarkdown(this.features).parse(content),
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
