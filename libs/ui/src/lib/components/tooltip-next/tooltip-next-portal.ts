import { Directive, TemplateRef, inject } from '@angular/core';

/** The tooltip's content, rendered while it is open. */
@Directive({ selector: 'ng-template[scTooltipNextPortal]' })
export class ScTooltipNextPortal {
  readonly templateRef = inject(TemplateRef);
}
