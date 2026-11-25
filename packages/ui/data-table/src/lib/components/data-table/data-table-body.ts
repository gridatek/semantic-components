import { Directive } from '@angular/core';
import { ScTableBody } from '@semantic-components/ui';

/** The body rows. The Table's body. */
@Directive({
  selector: 'tbody[scDataTableBody]',
  hostDirectives: [{ directive: ScTableBody, inputs: ['class'] }],
})
export class ScDataTableBody {}
