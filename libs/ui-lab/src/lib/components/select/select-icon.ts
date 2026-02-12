import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'svg[sc-select-icon]',
  host: {
    'data-slot': 'select-icon',
    '[class]': 'class()',
  },
})
export class ScSelectIcon {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'text-muted-foreground pointer-events-none absolute right-3 size-4 shrink-0 opacity-50 transition-transform duration-150 [[aria-expanded=true]~&]:rotate-180',
      this.classInput(),
    ),
  );
}
