import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ScCommand } from './command';

/** Your text when no item shows. */
@Directive({
  selector: 'div[scCommandEmpty]',
  host: {
    'data-slot': 'command-empty',
    role: 'presentation',
    '[attr.hidden]': 'command.count() ? "" : null',
    '[class]': 'class()',
  },
})
export class ScCommandEmpty {
  private readonly styles = injectStyle().command;
  private readonly command = inject(ScCommand);

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.empty, this.classInput()),
  );
}
