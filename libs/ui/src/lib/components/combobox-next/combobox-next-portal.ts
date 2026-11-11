import { Directive, TemplateRef, inject } from '@angular/core';

/** The popup's template: rendered in the overlay while the combobox is open. */
@Directive({
  selector: 'ng-template[scComboboxNextPortal]',
})
export class ScComboboxNextPortal {
  readonly templateRef = inject(TemplateRef);
}
