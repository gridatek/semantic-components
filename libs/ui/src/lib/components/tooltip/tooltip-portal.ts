import { Directive, TemplateRef, inject } from '@angular/core';

/** The tooltip's content, rendered while it is open. */
@Directive({ selector: 'ng-template[scTooltipPortal]' })
export class ScTooltipPortal {
  readonly templateRef = inject(TemplateRef);
}
