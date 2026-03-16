import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScSpotlightState } from './spotlight-state';

@Directive({
  selector: 'div[scSpotlightTooltip]',
  host: {
    'data-slot': 'spotlight-tooltip',
    '[class]': 'class()',
    '[style]': 'state.tooltipStyle()',
    '(click)': '$event.stopPropagation()',
  },
})
export class ScSpotlightTooltip {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly state = inject(ScSpotlightState);

  protected readonly class = computed(() =>
    cn(
      'absolute z-10 max-w-sm p-4 bg-popover text-popover-foreground',
      'border rounded-lg shadow-lg',
      'animate-in fade-in-0 zoom-in-95 duration-200',
      this.classInput(),
    ),
  );
}
