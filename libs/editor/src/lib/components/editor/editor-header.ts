import { computed, Directive, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: 'div[scEditorHeader]',
  host: {
    'data-slot': 'editor-header',
    '[class]': 'class()',
  },
})
export class ScEditorHeader {
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() =>
    cn('px-4 py-3 border-b bg-muted/30', this.classInput()),
  );
}
