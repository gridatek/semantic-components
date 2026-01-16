import { ComboboxPopupContainer } from '@angular/aria/combobox';
import { Directive } from '@angular/core';

@Directive({
  selector: '[scSelectPopup]',
  hostDirectives: [ComboboxPopupContainer],
})
export class ScSelectPopup {}
