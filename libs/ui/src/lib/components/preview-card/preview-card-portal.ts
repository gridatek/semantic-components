import { Directive, TemplateRef, inject } from '@angular/core';

/** The preview card's content, rendered while it is open. */
@Directive({ selector: 'ng-template[scPreviewCardPortal]' })
export class ScPreviewCardPortal {
  readonly templateRef = inject(TemplateRef);
}
