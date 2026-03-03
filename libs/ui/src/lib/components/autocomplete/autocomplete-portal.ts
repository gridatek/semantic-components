import { Directive, TemplateRef, inject } from '@angular/core';

@Directive({
  selector: 'ng-template[scAutocompletePortal]',
})
export class ScAutocompletePortal {
  readonly templateRef = inject(TemplateRef);
}
