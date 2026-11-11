import { Directive, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import { ScCommandNext } from './command-next';

/** Your text when no item shows. */
@Directive({
  selector: 'div[scCommandNextEmpty]',
  host: {
    'data-slot': 'command-empty',
    role: 'presentation',
    '[attr.hidden]': 'command.count() ? "" : null',
    '[class]': 'class()',
  },
})
export class ScCommandNextEmpty {
  private readonly styles = injectPreset().command;
  protected readonly command = inject(ScCommandNext);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.empty, this.classInput()),
  );
}
