import { Directive, computed, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

/** The chevron in the trigger: it flips while the list is open. */
@Directive({
  selector: 'svg[scSelectIcon]',
  host: {
    '[class]': 'class()',
  },
})
export class ScSelectIcon {
  private readonly styles = injectPreset().select;

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      this.styles.icon,
      // Its trigger is aria-expanded while the list is open.
      'transition-transform duration-150 in-aria-expanded:rotate-180 motion-reduce:transition-none',
      this.classInput(),
    ),
  );
}
