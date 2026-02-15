import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[scAlertDialogPortal]',
})
export class ScAlertDialogPortal {
  readonly templateRef = inject(TemplateRef);
}
