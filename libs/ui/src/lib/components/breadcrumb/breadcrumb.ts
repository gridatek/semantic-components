import { Directive, input } from '@angular/core';

@Directive({
  selector: 'nav[scBreadcrumb]',
  host: {
    'data-slot': 'breadcrumb',
    '[attr.aria-label]': 'ariaLabel()',
  },
})
export class ScBreadcrumb {
  readonly ariaLabel = input('breadcrumb', { alias: 'aria-label' });
}
