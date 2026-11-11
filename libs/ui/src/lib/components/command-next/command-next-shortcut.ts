import { Directive, computed, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

/** A key hint, at the end of an item. */
@Directive({
  selector: 'span[scCommandNextShortcut]',
  host: {
    'data-slot': 'command-shortcut',
    '[class]': 'class()',
  },
})
export class ScCommandNextShortcut {
  private readonly styles = injectPreset().command;

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.shortcut, this.classInput()),
  );
}
