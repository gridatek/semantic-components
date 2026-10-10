import { ComboboxPopup } from '@angular/aria/combobox';
import { Directive, inject } from '@angular/core';
import { bindInput } from '../../utils';

@Directive({
  selector: 'ng-template[scCommandListContainer]',
  hostDirectives: [{ directive: ComboboxPopup, inputs: ['combobox'] }],
})
export class ScCommandListContainer {
  private readonly popup = inject(ComboboxPopup);

  constructor() {
    bindInput(this.popup.popupType, 'listbox');
  }
}
