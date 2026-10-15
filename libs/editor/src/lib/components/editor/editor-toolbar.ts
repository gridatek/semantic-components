import { Toolbar } from '@angular/aria/toolbar';
import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_EDITOR } from './editor';

@Directive({
  selector: 'div[scEditorToolbar]',
  hostDirectives: [
    {
      directive: Toolbar,
      inputs: ['orientation', 'wrap', 'disabled'],
    },
  ],
  host: {
    '[class]': 'class()',
  },
})
export class ScEditorToolbar {
  protected readonly toolbar = inject(Toolbar);
  private readonly editor = inject(SC_EDITOR);

  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() =>
    cn(
      // One row that scrolls sideways when it doesn't fit, as in Tiptap's.
      'flex min-h-11 items-center gap-1 overflow-x-auto overscroll-x-contain border-b bg-background px-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
      // Over a page, centred on its column (the start stays reachable).
      this.editor.layout() === 'page' && 'justify-center-safe',
      this.classInput(),
    ),
  );
}
