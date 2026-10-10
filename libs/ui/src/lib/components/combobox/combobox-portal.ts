import { Directive, TemplateRef, inject } from '@angular/core';

@Directive({
  selector: 'ng-template[scComboboxPortal]',
})
export class ScComboboxPortal {
  readonly templateRef = inject(TemplateRef);
}
