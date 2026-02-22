import { Combobox } from '@angular/aria/combobox';
import { computed, Directive, inject, input } from '@angular/core';
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

  private readonly combobox = inject(Combobox);

  protected readonly class = computed(() =>
    cn(
      'text-muted-foreground pointer-events-none size-4 shrink-0 transition-transform duration-150',
      this.combobox.expanded() && 'rotate-180',
      this.classInput(),
    ),
  );
}
