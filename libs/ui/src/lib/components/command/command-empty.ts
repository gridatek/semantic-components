import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';
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
  private readonly styles = injectPreset().command;
  protected readonly command = inject(ScCommand);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.empty, this.classInput()),
  );
}
