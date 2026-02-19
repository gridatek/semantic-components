import { computed, Directive, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: 'svg[scSelectIcon]',
  host: {
    'data-slot': 'select-icon',
    '[class]': 'class()',
  },
})
export class ScSelectIcon {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'text-muted-foreground pointer-events-none size-4 shrink-0',
      this.classInput(),
    ),
  );
}
