import { Toolbar } from '@angular/aria/toolbar';
import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: 'div[scEditorToolbar]',
  hostDirectives: [
    {
      directive: Toolbar,
      inputs: ['orientation', 'wrap', 'disabled'],
    },
  ],
  host: {
    'data-slot': 'editor-toolbar',
    '[class]': 'class()',
  },
})
export class ScEditorToolbar {
  protected readonly toolbar = inject(Toolbar);

  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() =>
    cn(
      'flex flex-wrap items-center gap-1 p-2 border-b bg-muted/30',
      this.classInput(),
    ),
  );
}
