import { Directive, TemplateRef, inject } from '@angular/core';

/** The drawer's content, rendered while it is open. */
@Directive({ selector: 'ng-template[scDrawerNextPortal]' })
export class ScDrawerNextPortal {
  readonly templateRef = inject(TemplateRef);
}
