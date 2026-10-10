import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'svg[scComboboxIcon]',
  host: {
    'aria-hidden': 'true',
    '[class]': 'class()',
  },
})
export class ScComboboxIcon {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'text-muted-foreground pointer-events-none size-4 shrink-0',
      this.classInput(),
    ),
  );
}
