import { Directive, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import { ScCommandNext } from './command-next';

/**
 * A line between groups, hidden while searching. Decorative: the groups are
 * named (a separator isn't allowed in a listbox).
 */
@Directive({
  selector: 'div[scCommandNextSeparator]',
  host: {
    'data-slot': 'command-separator',
    'aria-hidden': 'true',
    '[attr.hidden]': 'command.search().trim() ? "" : null',
    '[class]': 'class()',
  },
})
export class ScCommandNextSeparator {
  private readonly styles = injectPreset().command;
  protected readonly command = inject(ScCommandNext);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.separator, this.classInput()),
  );
}
