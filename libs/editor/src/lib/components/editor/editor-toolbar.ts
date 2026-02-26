import { computed, Directive, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: 'div[scEditorToolbar]',
  host: {
    'data-slot': 'editor-toolbar',
    role: 'toolbar',
    '[attr.aria-label]': '"Text formatting"',
    '[class]': 'class()',
  },
})
export class ScEditorToolbar {
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() =>
    cn(
      'flex flex-wrap items-center gap-1 p-2 border-b bg-muted/30',
      this.classInput(),
    ),
  );
}
