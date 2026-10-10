import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { SC_SELECT } from './select-tokens';

@Directive({
  selector: 'svg[scSelectIcon]',
  host: {
    'aria-hidden': 'true',
    '[class]': 'class()',
  },
})
export class ScSelectIcon {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly select = inject(SC_SELECT);

  protected readonly class = computed(() =>
    cn(
      'text-muted-foreground pointer-events-none size-4 shrink-0 transition-transform duration-150',
      this.select.open() && 'rotate-180',
      this.classInput(),
    ),
  );
}
