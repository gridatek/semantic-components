import { ComboboxPopup } from '@angular/aria/combobox';
import { Directive, inject } from '@angular/core';
import { bindInput } from '../../utils';

@Directive({
  selector: 'ng-template[scComboboxListContainer]',
  hostDirectives: [{ directive: ComboboxPopup, inputs: ['combobox'] }],
})
export class ScComboboxListContainer {
  private readonly popup = inject(ComboboxPopup);

  constructor() {
    bindInput(this.popup.popupType, 'listbox');
  }
}
