import { Directive, TemplateRef, inject } from '@angular/core';

/** The drawer's content, rendered while it is open. */
@Directive({ selector: 'ng-template[scDrawerPortal]' })
export class ScDrawerPortal {
  readonly templateRef = inject(TemplateRef);
}
