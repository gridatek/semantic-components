import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';
import { ScCommand } from './command';

/**
 * A line between groups, hidden while searching. Decorative: the groups are
 * named (a separator isn't allowed in a listbox).
 */
@Directive({
  selector: 'div[scCommandSeparator]',
  host: {
    'data-slot': 'command-separator',
    'aria-hidden': 'true',
    '[attr.hidden]': 'command.search().trim() ? "" : null',
    '[class]': 'class()',
  },
})
export class ScCommandSeparator {
  private readonly styles = injectPreset().command;
  protected readonly command = inject(ScCommand);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.separator, this.classInput()),
  );
}
