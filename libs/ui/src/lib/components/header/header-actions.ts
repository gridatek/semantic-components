import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';

/** The buttons at the bar's end: theme, search, sign in… */
@Directive({
  selector: 'div[scHeaderActions]',
  host: {
    'data-slot': 'header-actions',
    '[class]': 'class()',
  },
})
export class ScHeaderActions {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn('ms-auto flex items-center gap-2', this.classInput()),
  );
}
