import { ComboboxPopupContainer } from '@angular/aria/combobox';
import { Directive } from '@angular/core';

@Directive({
  selector: 'ng-template[scCommandListContainer]',
  hostDirectives: [ComboboxPopupContainer],
  host: {},
})
export class ScCommandListContainer {}
