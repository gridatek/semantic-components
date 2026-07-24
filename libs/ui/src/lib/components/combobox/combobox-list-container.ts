import { ComboboxPopup } from '@angular/aria/combobox';
import { Directive, inject } from '@angular/core';
import { SIGNAL, signalSetFn } from '@angular/core/primitives/signals';

@Directive({
  selector: 'ng-template[scComboboxListContainer]',
  hostDirectives: [{ directive: ComboboxPopup, inputs: ['combobox'] }],
})
export class ScComboboxListContainer {
  private readonly popup = inject(ComboboxPopup);

  constructor() {
    signalSetFn(this.popup.popupType[SIGNAL], 'listbox');
  }
}
