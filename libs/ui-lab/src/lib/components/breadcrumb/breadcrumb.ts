import { Directive } from '@angular/core';

@Directive({
  selector: 'nav[sc-breadcrumb]',
  host: {
    'data-slot': 'breadcrumb',
    'aria-label': 'breadcrumb',
  },
})
export class ScBreadcrumb {}
