import { Directive, TemplateRef, inject } from '@angular/core';

/** The popup's template: rendered in the overlay while the select is open. */
@Directive({
  selector: 'ng-template[scSelectNextPortal]',
})
export class ScSelectNextPortal {
  readonly templateRef = inject(TemplateRef);
}
