import { Directive } from '@angular/core';
import { ScTableHeader } from '@semantic-components/ui';

/** The header rows. The Table's header. */
@Directive({
  selector: 'thead[scDataTableHeader]',
  hostDirectives: [{ directive: ScTableHeader, inputs: ['class'] }],
})
export class ScDataTableHeader {}
