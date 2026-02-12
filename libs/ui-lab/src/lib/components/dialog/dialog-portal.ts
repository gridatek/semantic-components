import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[scDialogPortal]',
})
export class ScDialogPortal {
  readonly templateRef = inject(TemplateRef);
}
