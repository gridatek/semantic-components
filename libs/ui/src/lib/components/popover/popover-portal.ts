import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[scPopoverPortal]',
})
export class ScPopoverPortal {
  readonly templateRef = inject(TemplateRef);
}
