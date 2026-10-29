import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils/cn/cn';

/** The buttons at the bar's end: theme, search, sign in… */
@Directive({
  selector: 'div[scNavbarNextActions]',
  host: {
    'data-slot': 'navbar-actions',
    '[class]': 'class()',
  },
})
export class ScNavbarNextActions {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('ms-auto flex items-center gap-2', this.classInput()),
  );
}
