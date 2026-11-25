import { Directive, computed, inject, input, signal } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
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
  private readonly styles = injectStyle().command;
  private readonly command = inject(ScCommand);

  readonly classInput = input<string>('', { alias: 'class' });

  /** Its label's id. */
  readonly labelId = signal<string | null>(null);

  private readonly shown = computed(() =>
    this.command.shownItems().some((item) => item.group === this),
  );

  private readonly class = computed(() =>
    cn(this.styles.group, this.classInput()),
  );
}
