import { Directive, computed, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

/**
 * On the `scDialog` a command opens in: no padding, its corners (over the
 * dialog's own); its items' corners follow. Write its title and description
 * (`sr-only`).
 */
@Directive({
  selector: 'div[scCommandDialog]',
  host: {
    'data-slot': 'command-dialog',
    '[class]': 'class()',
  },
})
export class ScCommandDialog {
  private readonly styles = injectPreset().command;

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.dialog, this.classInput()),
  );
}
