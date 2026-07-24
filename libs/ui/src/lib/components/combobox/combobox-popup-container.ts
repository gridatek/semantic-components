import { ComboboxPopup } from '@angular/aria/combobox';
import { Directive, inject } from '@angular/core';
import { SIGNAL, signalSetFn } from '@angular/core/primitives/signals';

@Directive({
  selector: 'ng-template[scComboboxPopupContainer]',
  hostDirectives: [{ directive: ComboboxPopup, inputs: ['combobox'] }],
})
export class ScComboboxPopupContainer {
  private readonly popup = inject(ComboboxPopup);

  constructor() {
    signalSetFn(this.popup.popupType[SIGNAL], 'dialog');
  }
}
