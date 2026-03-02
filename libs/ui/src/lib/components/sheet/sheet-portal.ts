import { Directive, TemplateRef, inject } from '@angular/core';

@Directive({
  selector: 'ng-template[scSheetPortal]',
})
export class ScSheetPortal {
  readonly templateRef = inject(TemplateRef);
}
