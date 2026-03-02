import { Directive, TemplateRef, inject } from '@angular/core';

@Directive({
  selector: 'ng-template[scDialogPortal]',
})
export class ScDialogPortal {
  readonly templateRef = inject(TemplateRef);
}
