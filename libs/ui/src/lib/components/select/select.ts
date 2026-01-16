import { Combobox } from '@angular/aria/combobox';
import { Directive } from '@angular/core';

@Directive({
  selector: '[scSelect]',
  hostDirectives: [
    {
      directive: Combobox,
      inputs: ['disabled', 'readonly'],
    },
  ],
  host: {
    'data-slot': 'select',
    readonly: 'true',
  },
})
export class ScSelect {}
