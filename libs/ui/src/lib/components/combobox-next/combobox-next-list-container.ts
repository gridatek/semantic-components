import { Directive, TemplateRef, inject } from '@angular/core';

/**
 * Round the list when the search is inside the popup (a trigger opens it):
 * Angular Aria renders a combobox's list from a template, and that combobox
 * is the search beside it.
 */
@Directive({
  selector: 'ng-template[scComboboxNextListContainer]',
})
export class ScComboboxNextListContainer {
  readonly templateRef = inject(TemplateRef);
}
