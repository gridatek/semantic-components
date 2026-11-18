import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

/** A key hint, at the end of an item. */
@Directive({
  selector: 'span[scCommandShortcut]',
  host: {
    'data-slot': 'command-shortcut',
    '[class]': 'class()',
  },
})
export class ScCommandShortcut {
  private readonly styles = injectStyle().command;

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.shortcut, this.classInput()),
  );
}
