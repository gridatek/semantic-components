import { ComboboxPopupContainer } from '@angular/aria/combobox';
import { Directive } from '@angular/core';

@Directive({
  selector: 'ng-template[scComboboxListContainer]',
  hostDirectives: [ComboboxPopupContainer],
  host: {
    'data-slot': 'combobox-list-container',
  },
})
export class ScComboboxListContainer {}
