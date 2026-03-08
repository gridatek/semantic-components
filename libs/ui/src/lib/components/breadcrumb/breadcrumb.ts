import { Directive } from '@angular/core';

@Directive({
  selector: 'nav[scBreadcrumb]',
  host: {
    'data-slot': 'breadcrumb',
  },
})
export class ScBreadcrumb {}
