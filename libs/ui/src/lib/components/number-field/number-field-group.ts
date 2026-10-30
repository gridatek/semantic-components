import { Directive, computed, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

/** How the group lays out the input and its buttons. */
export type ScNumberFieldGroupVariant = 'split' | 'stacked';

const stacked = cn(
  'grid grid-cols-[1fr_auto] grid-rows-[1.5rem_1.5rem] *:focus-visible:relative *:focus-visible:z-10',
  // The input spans both rows, its text at the start.
  '*:data-[slot=number-field-input]:col-start-1 *:data-[slot=number-field-input]:row-span-2 *:data-[slot=number-field-input]:row-start-1',
  '*:data-[slot=number-field-input]:h-auto *:data-[slot=number-field-input]:rounded-e-none *:data-[slot=number-field-input]:text-start',
  // Increment over decrement, each a row (24px: the minimum target size).
  '*:data-[slot=number-field-increment]:col-start-2 *:data-[slot=number-field-increment]:row-start-1',
  '*:data-[slot=number-field-increment]:h-auto *:data-[slot=number-field-increment]:rounded-s-none *:data-[slot=number-field-increment]:rounded-b-none *:data-[slot=number-field-increment]:border-s-0',
  '*:data-[slot=number-field-decrement]:col-start-2 *:data-[slot=number-field-decrement]:row-start-2',
  '*:data-[slot=number-field-decrement]:h-auto *:data-[slot=number-field-decrement]:rounded-s-none *:data-[slot=number-field-decrement]:rounded-t-none *:data-[slot=number-field-decrement]:border-s-0 *:data-[slot=number-field-decrement]:border-t-0',
);

/** One focus (or invalid) ring round the input and its buttons, not the input's own. */
const ring = cn(
  'rounded-lg',
  'has-[[data-slot=number-field-input]:focus-visible]:ring-3 has-[[data-slot=number-field-input]:focus-visible]:ring-ring/50',
  'has-[[data-slot=number-field-input][aria-invalid=true]]:ring-3 has-[[data-slot=number-field-input][aria-invalid=true]]:ring-destructive/20 dark:has-[[data-slot=number-field-input][aria-invalid=true]]:ring-destructive/40',
  '*:data-[slot=number-field-input]:focus-visible:ring-0 *:data-[slot=number-field-input]:aria-invalid:ring-0',
);

/**
 * The input and its buttons, joined, with one focus ring round them. `split` (the default): decrement,
 * input, increment, in the order written. `stacked`: the input, then
 * increment over decrement — whatever the order written.
 */
@Directive({
  selector: 'div[scNumberFieldGroup]',
  host: {
    'data-slot': 'number-field-group',
    role: 'group',
    '[attr.data-variant]': 'variant()',
    '[class]': 'class()',
  },
})
export class ScNumberFieldGroup {
  private readonly controlGroupStyles = injectPreset().controlGroup;

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScNumberFieldGroupVariant>('split');

  protected readonly class = computed(() =>
    cn(
      this.variant() === 'stacked'
        ? stacked
        : this.controlGroupStyles({ orientation: 'horizontal' }),
      ring,
      this.classInput(),
    ),
  );
}
