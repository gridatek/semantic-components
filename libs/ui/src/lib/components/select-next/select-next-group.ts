import { Directive, computed, input, signal } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

/** Options together: a `group`, named by its label. */
@Directive({
  selector: 'div[scSelectNextGroup]',
  host: {
    role: 'group',
    '[attr.aria-labelledby]': 'labelId()',
    '[class]': 'class()',
  },
})
export class ScSelectNextGroup {
  private readonly styles = injectPreset().select;

  readonly classInput = input<string>('', { alias: 'class' });
  /** Set by its label. */
  readonly labelId = signal<string | null>(null);

  protected readonly class = computed(() =>
    cn(this.styles.group, this.classInput()),
  );
}
