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
      'flex flex-wrap items-center gap-1 border-b bg-muted/30 p-2',
      // Over a page, centred on its column.
      this.editor.layout() === 'page' && 'justify-center',
      this.classInput(),
    ),
  );
}
