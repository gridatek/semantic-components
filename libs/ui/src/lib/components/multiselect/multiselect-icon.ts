import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'svg[scMultiselectIcon]',
  host: {
    'data-slot': 'multiselect-icon',
    '[class]': 'class()',
  },
})
export class ScMultiselectIcon {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'text-muted-foreground pointer-events-none absolute end-3 size-4 transition-transform duration-150',
      this.classInput(),
    ),
  );
}
