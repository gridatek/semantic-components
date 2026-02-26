import { computed, Directive, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: 'div[scEditorToolbarGroup]',
  host: {
    'data-slot': 'editor-toolbar-group',
    '[class]': 'class()',
  },
})
export class ScEditorToolbarGroup {
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() =>
    cn('flex items-center gap-1', this.classInput()),
  );
}
