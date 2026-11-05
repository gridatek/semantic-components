import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';
import { injectMenuStyles } from './menu-styles';

/** The keyboard hint at the end of an item; the text is yours. */
@Directive({
  selector: 'span[scMenuShortcut]',
  host: {
    '[class]': 'class()',
  },
})
export class ScMenuShortcut {
  private readonly styles = injectMenuStyles();

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles().shortcut, this.classInput()),
  );
}
