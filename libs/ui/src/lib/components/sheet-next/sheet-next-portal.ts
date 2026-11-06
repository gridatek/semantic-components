import { Directive, TemplateRef, inject } from '@angular/core';

/** The sheet's content, rendered while it is open. */
@Directive({ selector: 'ng-template[scSheetNextPortal]' })
export class ScSheetNextPortal {
  readonly templateRef = inject(TemplateRef);
}
