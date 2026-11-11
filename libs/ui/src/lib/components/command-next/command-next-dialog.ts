import { Directive, computed, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

/**
 * On the `scDialog` a command opens in: no padding, its corners (over the
 * dialog's own); its items' corners follow. Write its title and description
 * (`sr-only`).
 */
@Directive({
  selector: 'div[scCommandNextDialog]',
  host: {
    'data-slot': 'command-dialog',
    '[class]': 'class()',
  },
})
export class ScCommandNextDialog {
  private readonly styles = injectPreset().command;

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      // The dialog's full width (its own max-w caps it), as shadcn's: in the
      // CDK's pane, which is as wide as its content, w-full has nothing to
      // fill — short items left it narrow, and it collapsed while zooming in.
      'w-screen!',
      this.styles.dialog,
      this.classInput(),
    ),
  );
}
