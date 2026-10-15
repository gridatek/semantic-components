import {
  DestroyRef,
  Directive,
  ElementRef,
  afterNextRender,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { SC_FIELD, cn } from '@semantic-components/ui';
import { SC_EDITOR, type ScEditorContentLayout } from './editor';

/**
 * Where the document is written: the editor mounts here. Name it
 * (`ariaLabel`) — the library adds no text; give a `placeholder` if you want
 * one. The document is a multi-line `textbox`, described by the surrounding
 * `scField`'s description and errors, `aria-invalid` once left invalid.
 */
@Directive({
  selector: 'div[scEditorContent]',
  host: {
    '[attr.data-layout]': 'layout()',
    '[class]': 'class()',
  },
})
export class ScEditorContent {
  protected readonly editor = inject(SC_EDITOR);
  private readonly field = inject(SC_FIELD, { optional: true });
  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly placeholder = input('');
  readonly ariaLabel = input('');
  readonly layout = input<ScEditorContentLayout>('default');
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'block outline-none overflow-y-auto min-h-[150px] max-h-[400px] text-foreground',
      this.layout() === 'page'
        ? // The column is the document's: the scrollbar stays at the box's edge.
          '[&>.ProseMirror]:mx-auto [&>.ProseMirror]:max-w-[648px] [&>.ProseMirror]:p-12 max-[480px]:[&>.ProseMirror]:px-6 max-[480px]:[&>.ProseMirror]:py-4'
        : 'p-4',
      this.editor.disabled() && 'pointer-events-none opacity-50',
      this.editor.readonly() && 'cursor-default',
      this.classInput(),
    ),
  );

  /** The document's ARIA: its name, description, state. */
  private readonly attributes = computed(() => {
    const attributes: Record<string, string> = {
      role: 'textbox',
      'aria-multiline': 'true',
    };
    const label = this.ariaLabel();
    if (label) attributes['aria-label'] = label;
    const describedBy = this.field?.descriptionIds().join(' ');
    if (describedBy) attributes['aria-describedby'] = describedBy;
    if (this.editor.readonly()) attributes['aria-readonly'] = 'true';
    if (this.editor.disabled()) attributes['aria-disabled'] = 'true';
    if (this.editor.showInvalid()) attributes['aria-invalid'] = 'true';
    return attributes;
  });

  constructor() {
    // The toolbar follows the layout.
    effect(() => this.editor.layout.set(this.layout()));

    afterNextRender(() =>
      this.editor.mount(this.element, {
        placeholder: () => this.placeholder(),
      }),
    );

    // The document's attributes follow (and the placeholder, read as it
    // changes, is redrawn).
    effect(() => {
      const attributes = this.attributes();
      this.placeholder();
      const editor = this.editor.editorInstance();
      if (!editor) return;
      editor.setOptions({ editorProps: { attributes } });
      editor.view.dispatch(editor.state.tr.setMeta('placeholder', true));
    });

    inject(DestroyRef).onDestroy(() => this.editor.unmount());
  }
}
