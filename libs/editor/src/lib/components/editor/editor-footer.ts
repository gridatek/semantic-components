import { computed, Directive, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: 'div[scEditorFooter]',
  host: {
    'data-slot': 'editor-footer',
    '[class]': 'class()',
  },
})
export class ScEditorFooter {
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() =>
    cn(
      'px-3 py-1.5 border-t text-xs text-muted-foreground bg-muted/30',
      this.classInput(),
    ),
  );
}
