import { BubbleMenuPlugin } from '@tiptap/extension-bubble-menu';
import {
  DestroyRef,
  Directive,
  ElementRef,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { SC_EDITOR } from '@semantic-components/ui/editor';
import { cn } from 'cn';

let nextKey = 0;

/**
 * A floating toolbar by the selected text (a bubble menu): shown when text is
 * selected in an editable document, kept while focus is in it. Behaviour
 * only: put `scToolbar` on it too — its keyboard and its look — and the
 * editor's commands in it, as in the toolbar. Name it (`aria-label`).
 */
@Directive({
  selector: 'div[scEditorBubbleMenu]',
  host: {
    'data-slot': 'editor-bubble-menu',
    '[class]': 'class()',
  },
})
export class ScEditorBubbleMenu {
  private readonly editor = inject(SC_EDITOR);
  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly pluginKey = `scEditorBubbleMenu${nextKey++}`;

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(
      // Placed as Floating UI asks, from the start (fixed, at 0 0, its own
      // width): the plugin measures it before setting these itself. Without,
      // its first place was off by the page's scroll — out of view — or
      // pushed to the edge.
      'fixed top-0 left-0 z-50 w-max',
      this.classInput(),
    ),
  );

  constructor() {
    // Hidden until there is a selection: the plugin shows it, by the text.
    this.element.style.visibility = 'hidden';

    effect((onCleanup) => {
      const editor = this.editor.editorInstance();
      if (!editor) return;
      // Out of the page, for the plugin to place — only now, in the browser:
      // the server's HTML keeps it, so hydration finds it where it was.
      this.element.remove();
      editor.registerPlugin(
        BubbleMenuPlugin({
          pluginKey: this.pluginKey,
          editor,
          element: this.element,
          // Not clipped by the document's scrolling box; clear of the
          // selection's highlight (Tiptap's 8 sat on it).
          options: { strategy: 'fixed', placement: 'top', offset: 12 },
        }),
      );

      // Placed again as anything scrolls — the page, a layout's box, the
      // document — not only the one target the plugin listens to: fixed,
      // it would stay where it was as the text went on. Scroll events don't
      // bubble, hence the capture. Once a frame, and only while shown.
      let frame = 0;
      const place = () => {
        if (frame || this.element.style.visibility === 'hidden') return;
        frame = requestAnimationFrame(() => {
          frame = 0;
          if (editor.isDestroyed) return;
          editor.view.dispatch(
            editor.state.tr.setMeta(this.pluginKey, 'updatePosition'),
          );
        });
      };
      const doc = editor.view.dom.ownerDocument;
      doc.addEventListener('scroll', place, { capture: true, passive: true });

      onCleanup(() => {
        doc.removeEventListener('scroll', place, { capture: true });
        cancelAnimationFrame(frame);
        if (!editor.isDestroyed) editor.unregisterPlugin(this.pluginKey);
      });
    });

    inject(DestroyRef).onDestroy(() => this.element.remove());
  }
}
