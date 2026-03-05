import { Directive, TemplateRef, inject } from '@angular/core';

@Directive({
  selector: 'ng-template[scMultiselectPortal]',
})
export class ScMultiselectPortal {
  readonly templateRef = inject(TemplateRef);
}
