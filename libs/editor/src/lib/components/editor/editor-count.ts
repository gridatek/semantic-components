import { computed, Directive, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: 'div[scEditorCount]',
  host: {
    'data-slot': 'editor-count',
    '[class]': 'class()',
  },
})
export class ScEditorCount {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex items-center justify-end gap-4', this.classInput()),
  );
}
