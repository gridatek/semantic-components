import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: 'div[scEditorSeparator]',
  host: {
    'data-slot': 'editor-separator',
    '[class]': 'class()',
  },
})
export class ScEditorSeparator {
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() =>
    cn('w-px h-6 bg-border mx-1', this.classInput()),
  );
}
