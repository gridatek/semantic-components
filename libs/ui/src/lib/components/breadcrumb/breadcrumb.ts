import { Directive } from '@angular/core';

@Directive({
  selector: 'nav[scBreadcrumb]',
  host: {
    'data-slot': 'breadcrumb',
    'aria-label': 'breadcrumb',
  },
})
export class ScBreadcrumb {}
