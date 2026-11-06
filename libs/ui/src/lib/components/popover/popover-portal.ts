import { Directive, TemplateRef, inject } from '@angular/core';

/** The popover's content, rendered while it is open. */
@Directive({ selector: 'ng-template[scPopoverPortal]' })
export class ScPopoverPortal {
  readonly templateRef = inject(TemplateRef);
}
