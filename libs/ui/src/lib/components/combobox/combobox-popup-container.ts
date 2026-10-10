import { ComboboxPopup } from '@angular/aria/combobox';
import { Directive, inject } from '@angular/core';
import { bindInput } from '../../utils';

@Directive({
  selector: 'ng-template[scComboboxPopupContainer]',
  hostDirectives: [{ directive: ComboboxPopup, inputs: ['combobox'] }],
})
export class ScComboboxPopupContainer {
  private readonly popup = inject(ComboboxPopup);

  constructor() {
    bindInput(this.popup.popupType, 'dialog');
  }
}
