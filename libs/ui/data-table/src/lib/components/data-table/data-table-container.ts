import { Directive } from '@angular/core';
import { ScTableContainer } from '@semantic-components/ui';

/** The table's box: it scrolls sideways when the table is wider. The Table's container. */
@Directive({
  selector: 'div[scDataTableContainer]',
  hostDirectives: [{ directive: ScTableContainer, inputs: ['class'] }],
})
export class ScDataTableContainer {}
