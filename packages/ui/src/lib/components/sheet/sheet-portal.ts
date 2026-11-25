import { Directive, TemplateRef, inject } from '@angular/core';

/** The sheet's content, rendered while it is open. */
@Directive({ selector: 'ng-template[scSheetPortal]' })
export class ScSheetPortal {
  readonly templateRef = inject(TemplateRef);
}
