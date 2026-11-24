import { Directive } from '@angular/core';
import { ScTableCaption } from '@semantic-components/ui';

/** The table's caption. The Table's caption. */
@Directive({
  selector: 'caption[scDataTableCaption]',
  hostDirectives: [{ directive: ScTableCaption, inputs: ['class'] }],
})
export class ScDataTableCaption {}
