import { Directive, TemplateRef, inject } from '@angular/core';

/** The hover card's content, rendered while it is open. */
@Directive({ selector: 'ng-template[scHoverCardPortal]' })
export class ScHoverCardPortal {
  readonly templateRef = inject(TemplateRef);
}
