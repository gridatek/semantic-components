import { Directive } from '@angular/core';
import { ScTableFooter } from '@semantic-components/ui';

/** The footer rows. The Table's footer. */
@Directive({
  selector: 'tfoot[scDataTableFooter]',
  hostDirectives: [{ directive: ScTableFooter, inputs: ['class'] }],
})
export class ScDataTableFooter {}
