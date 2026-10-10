import { Directive, TemplateRef, inject } from '@angular/core';

/**
 * Marks the template holding the list inside `scComboboxPopup`. The popup
 * renders it after its other content, connected to the search box
 * (`scComboboxSearch`) so arrow keys typed there drive the list.
 */
@Directive({
  selector: 'ng-template[scComboboxListContainer]',
})
export class ScComboboxListContainer {
  readonly templateRef = inject(TemplateRef);
}
