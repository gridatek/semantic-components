import { ComboboxPopupContainer } from '@angular/aria/combobox';
import { Directive } from '@angular/core';

@Directive({
  selector: 'ng-template[scComboboxListContainer]',
  hostDirectives: [ComboboxPopupContainer],
  host: {},
})
export class ScComboboxListContainer {}
