import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScTourGuideState } from './tour-guide-state';

@Directive({
  selector: 'div[scTourGuideTooltip]',
  host: {
    'data-slot': 'tour-guide-tooltip',
    '[class]': 'class()',
    '[style]': 'state.tooltipStyle()',
    role: 'dialog',
    'aria-modal': 'true',
    '[attr.aria-label]': 'state.currentStep()?.title',
  },
})
export class ScTourGuideTooltip {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly state = inject(ScTourGuideState);

  protected readonly class = computed(() =>
    cn(
      'bg-popover text-popover-foreground absolute z-10 w-80 rounded-lg border p-4 shadow-lg',
      'animate-in fade-in-0 zoom-in-95 duration-200',
      this.classInput(),
    ),
  );
}
