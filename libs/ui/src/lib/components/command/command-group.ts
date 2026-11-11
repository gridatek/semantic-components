import { Directive, computed, inject, input, signal } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import { ScCommand } from './command';

/**
 * Related items (`role="group"`), named by its `scCommandGroupLabel`.
 * Hidden while none of its items shows.
 */
@Directive({
  selector: 'div[scCommandGroup]',
  host: {
    'data-slot': 'command-group',
    role: 'group',
    '[attr.aria-labelledby]': 'labelId()',
    '[attr.hidden]': 'shown() ? null : ""',
    '[class]': 'class()',
  },
})
export class ScCommandGroup {
  private readonly styles = injectPreset().command;
  private readonly command = inject(ScCommand);

  readonly classInput = input<string>('', { alias: 'class' });

  /** Its label's id. */
  readonly labelId = signal<string | null>(null);

  protected readonly shown = computed(() =>
    this.command.shownItems().some((item) => item.group === this),
  );

  protected readonly class = computed(() =>
    cn(this.styles.group, this.classInput()),
  );
}
