import { BubbleMenuPlugin } from '@tiptap/extension-bubble-menu';
import { Toolbar } from '@angular/aria/toolbar';
import {
  DestroyRef,
  Directive,
  ElementRef,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { SC_EDITOR } from '@semantic-components/editor';
import { cn } from '@semantic-components/ui';

let nextKey = 0;

/**
 * A floating toolbar by the selected text (a bubble menu): shown when text is
 * selected in an editable document, kept while focus is in it. Put the
 * editor's buttons in it, in `scEditorToolbarGroup`s, as in the toolbar; it is
 * a toolbar too — one tab stop, arrow keys between its buttons. Name it
 * (`aria-label`).
 */
@Directive({
  selector: 'div[scEditorBubbleMenu]',
  hostDirectives: [{ directive: Toolbar, inputs: ['orientation', 'wrap'] }],
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

  protected readonly class = computed(() =>
    cn(
      // w-max from the start: the plugin measures it to centre it on the
      // text, and only then sets its width — as wide as the editor, it was
      // pushed to the edge.
      'z-50 flex w-max items-center gap-1 rounded-lg border bg-popover p-1 text-popover-foreground shadow-md',
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
          // Not clipped by the document's scrolling box; moves as it scrolls.
          options: {
            strategy: 'fixed',
            placement: 'top',
            scrollTarget: editor.view.dom.parentElement ?? window,
          },
        }),
      );
      // The toolbar's buttons are its tab stops, not the toolbar itself.
      this.element.tabIndex = -1;
      onCleanup(() => {
        if (!editor.isDestroyed) editor.unregisterPlugin(this.pluginKey);
      });
    });

    inject(DestroyRef).onDestroy(() => this.element.remove());
  }
}
