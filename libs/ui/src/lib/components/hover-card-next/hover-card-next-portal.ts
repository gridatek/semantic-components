import { Directive, TemplateRef, inject } from '@angular/core';

/** The hover card's content, rendered while it is open. */
@Directive({ selector: 'ng-template[scHoverCardNextPortal]' })
export class ScHoverCardNextPortal {
  readonly templateRef = inject(TemplateRef);
}
