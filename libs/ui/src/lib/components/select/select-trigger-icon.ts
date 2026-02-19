import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'svg[scSelectTriggerIcon]',
  host: {
    'data-slot': 'select-trigger-icon',
    '[class]': 'class()',
  },
})
export class ScSelectTriggerIcon {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'text-muted-foreground pointer-events-none size-4 shrink-0',
      this.classInput(),
    ),
  );
}
