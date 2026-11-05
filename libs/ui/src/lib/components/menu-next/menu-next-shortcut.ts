import { Directive, computed, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

/** The keyboard hint at the end of an item; the text is yours. */
@Directive({
  selector: 'span[scMenuNextShortcut]',
  host: {
    '[class]': 'class()',
  },
})
export class ScMenuNextShortcut {
  private readonly styles = injectPreset().menu;

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.shortcut, this.classInput()),
  );
}
