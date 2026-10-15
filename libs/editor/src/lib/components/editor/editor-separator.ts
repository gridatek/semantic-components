import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: 'div[scEditorSeparator]',
  host: {
    role: 'separator',
    'aria-orientation': 'vertical',
    '[class]': 'class()',
  },
})
export class ScEditorSeparator {
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() =>
    cn('mx-1 h-6 w-px shrink-0 bg-border', this.classInput()),
  );
}
