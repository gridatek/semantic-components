import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { SC_MULTISELECT } from './multiselect-tokens';

@Directive({
  selector: 'svg[scMultiselectIcon]',
  host: {
    'aria-hidden': 'true',
    '[class]': 'class()',
  },
})
export class ScMultiselectIcon {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly multiselect = inject(SC_MULTISELECT);

  protected readonly class = computed(() =>
    cn(
      'text-muted-foreground pointer-events-none size-4 shrink-0 transition-transform duration-150',
      this.multiselect.open() && 'rotate-180',
      this.classInput(),
    ),
  );
}
