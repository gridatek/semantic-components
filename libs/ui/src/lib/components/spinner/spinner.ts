import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { ɵwarnIfUnnamed } from '../../utils';

/**
 * Something loading, on your icon's `svg` (`siLoaderCircleIcon`…): a status,
 * named by your `aria-label`. It takes back what the icon hides
 * (`aria-hidden`): its host bindings run after the icon's, which never
 * change.
 */
@Directive({
  selector: 'svg[scSpinner]',
  host: {
    'data-slot': 'spinner',
    role: 'status',
    '[attr.aria-hidden]': 'null',
    '[class]': 'class()',
  },
})
export class ScSpinner {
  constructor() {
    ɵwarnIfUnnamed('scSpinner');
  }

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('size-4 animate-spin', this.classInput()),
  );
}
