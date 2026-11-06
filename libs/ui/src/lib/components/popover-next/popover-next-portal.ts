import { Directive, TemplateRef, inject } from '@angular/core';

/** The popover's content, rendered while it is open. */
@Directive({ selector: 'ng-template[scPopoverNextPortal]' })
export class ScPopoverNextPortal {
  readonly templateRef = inject(TemplateRef);
}
