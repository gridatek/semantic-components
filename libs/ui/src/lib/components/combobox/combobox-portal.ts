import { Directive, TemplateRef, inject } from '@angular/core';

/** The popup's template: rendered in the overlay while the combobox is open. */
@Directive({
  selector: 'ng-template[scComboboxPortal]',
})
export class ScComboboxPortal {
  readonly templateRef = inject(TemplateRef);
}
