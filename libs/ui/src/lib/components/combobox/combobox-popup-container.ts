import { ComboboxPopupContainer } from '@angular/aria/combobox';
import { Directive } from '@angular/core';

@Directive({
  selector: 'ng-template[scComboboxPopupContainer]',
  hostDirectives: [ComboboxPopupContainer],
  host: {
    'data-slot': 'combobox-popup-container',
  },
})
export class ScComboboxPopupContainer {}
