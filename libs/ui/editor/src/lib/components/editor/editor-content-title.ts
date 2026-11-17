import { Plugin, PluginKey, Selection } from '@tiptap/pm/state';
import type { EditorView } from '@tiptap/pm/view';
import {
  Directive,
  ElementRef,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';
import { SC_EDITOR } from './editor';

const key = new PluginKey('scEditorContentTitle');

/**
 * The document's title, in a textarea of yours above the text: its value is
 * your field (`[formField]`), not part of the document. Set as a heading of
 * the text — the preset's Typeset heading: its font, weight, tracking, case,
 * and the space after it — with no box. Enter, or ↓ / → at its end, goes to
 * the start of the text (no line break in a title); Backspace, ↑ or ← at the
 * very start of the text come back to its end. Right to left, → and ← swap.
 * Name it (`aria-label`); a placeholder if you want one.
 */
@Directive({
  selector: 'textarea[scEditorContentTitle]',
  host: {
    'data-slot': 'editor-content-title',
    rows: '1',
    '[class]': 'class()',
    '(keydown)': 'onKeydown($event)',
  },
})
export class ScEditorContentTitle {
  private readonly editor = inject(SC_EDITOR);
  private readonly element =
    inject<ElementRef<HTMLTextAreaElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));

  constructor() {
    // From the text back to the title: a key at the text's very start.
    effect((onCleanup) => {
      const editor = this.editor.editorInstance();
      if (!editor) return;
      editor.registerPlugin(
        new Plugin({
          key,
          props: {
            handleKeyDown: (view, event) =>
              this.fromText(view, event) && (event.preventDefault(), true),
          },
        }),
      );
      onCleanup(() => {
        if (!editor.isDestroyed) editor.unregisterPlugin(key);
      });
    });
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (event.isComposing || hasModifier(event)) return;
    const { value, selectionStart, selectionEnd } = this.element;
    const atEnd =
      selectionStart === value.length && selectionEnd === value.length;
    const toText =
      event.key === 'Enter' ||
      (atEnd &&
        (event.key === 'ArrowDown' || event.key === forward(this.element)));
    if (!toText) return;
    event.preventDefault();
    this.editor.editorInstance()?.commands.focus('start');
  }

  /** Whether a key at the text's very start goes to the title (and does). */
  private fromText(view: EditorView, event: KeyboardEvent): boolean {
    if (event.isComposing || hasModifier(event)) return false;
    // Back: ← in left-to-right text, → in right-to-left.
    const back =
      forward(view.dom) === 'ArrowRight' ? 'ArrowLeft' : 'ArrowRight';
    if (![back, 'ArrowUp', 'Backspace'].includes(event.key)) return false;
    // Where the caret is now — the browser's selection: right after a click,
    // the editor's own hasn't caught up yet (it follows on selectionchange).
    const caret = caretPos(view);
    if (caret === null) return false;
    const { doc } = view.state;
    const $caret = doc.resolve(caret);
    const atStart = caret === Selection.atStart(doc).from;
    // On the first line of the first block: level with that block's start.
    const firstLine =
      $caret.index(0) === 0 &&
      Math.abs(
        view.coordsAtPos(caret).top - view.coordsAtPos($caret.start()).top,
      ) < 2;
    const goes =
      (event.key === back && atStart) ||
      // Backspace keeps its own work on a heading or a list (it turns them
      // into a paragraph first).
      (event.key === 'Backspace' &&
        atStart &&
        $caret.parent.type.name === 'paragraph') ||
      (event.key === 'ArrowUp' && firstLine);
    if (!goes) return false;
    const end = this.element.value.length;
    this.element.focus();
    this.element.setSelectionRange(end, end);
    return true;
  }
}

/** The collapsed caret's position in the document, from the browser's selection. */
function caretPos(view: EditorView): number | null {
  const root = view.root as Document | ShadowRoot;
  const selection =
    'getSelection' in root && typeof root.getSelection === 'function'
      ? root.getSelection()
      : view.dom.ownerDocument.getSelection();
  if (!selection?.isCollapsed || !selection.anchorNode) return null;
  if (!view.dom.contains(selection.anchorNode)) return null;
  try {
    return view.posAtDOM(selection.anchorNode, selection.anchorOffset);
  } catch {
    return null;
  }
}

/** The arrow that moves forward in an element's text: → or, right to left, ←. */
function forward(element: Element): 'ArrowRight' | 'ArrowLeft' {
  return getComputedStyle(element).direction === 'rtl'
    ? 'ArrowLeft'
    : 'ArrowRight';
}

function hasModifier(event: KeyboardEvent): boolean {
  return event.shiftKey || event.altKey || event.ctrlKey || event.metaKey;
}
