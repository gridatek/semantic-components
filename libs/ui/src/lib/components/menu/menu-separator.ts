import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';
import { injectMenuStyles } from './menu-styles';

/** A line between items. */
@Directive({
  selector: '[scMenuSeparator]',
  host: {
    role: 'separator',
    'aria-orientation': 'horizontal',
    '[class]': 'class()',
  },
})
export class ScMenuSeparator {
  private readonly styles = injectMenuStyles();

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles().separator, this.classInput()),
  );
}
