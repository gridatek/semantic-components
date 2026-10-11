import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_STEPPER_ITEM } from './stepper-types';

/**
 * The step's circle: shows its state (active, complete, error, inactive) and
 * holds the number or an icon — yours to choose from `state()` / `step()`.
 *
 * ```html
 * <span scStepperIndicator #indicator="scStepperIndicator">
 *   @switch (indicator.state()) {
 *     @case ('complete') { <svg siCheckIcon></svg> }
 *     @case ('error') { <svg siXIcon></svg> }
 *     @default { {{ indicator.step() + 1 }} }
 *   }
 * </span>
 * ```
 */
@Directive({
  selector: '[scStepperIndicator]',
  exportAs: 'scStepperIndicator',
  host: {
    'data-slot': 'stepper-indicator',
    '[attr.data-state]': 'state()',
    '[class]': 'class()',
  },
})
export class ScStepperIndicator {
  private readonly item = inject(SC_STEPPER_ITEM);

  readonly classInput = input<string>('', { alias: 'class' });

  /** The step's state: `'active'`, `'complete'`, `'error'` or `'inactive'`. */
  readonly state = computed(() => this.item.status());
  /** The step's index (0-based). */
  readonly step = computed(() => this.item.index());

  protected readonly class = computed(() =>
    cn(
      'inline-flex size-10 shrink-0 items-center justify-center rounded-full border-2 text-sm font-medium transition-colors',
      'data-[state=complete]:border-primary data-[state=complete]:bg-primary data-[state=complete]:text-primary-foreground',
      'data-[state=active]:border-primary data-[state=active]:text-primary',
      'data-[state=error]:border-destructive data-[state=error]:text-destructive',
      'data-[state=inactive]:border-muted data-[state=inactive]:text-muted-foreground',
      "[&_svg:not([class*='size-'])]:size-4",
      this.classInput(),
    ),
  );
}
