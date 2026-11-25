import { Directive } from '@angular/core';
import { ScTable } from '@semantic-components/ui';

/** The table, in the Table's look. A tree table: `scDataTableTreeGrid` instead. */
@Directive({
  selector: 'table[scDataTable]',
  hostDirectives: [{ directive: ScTable, inputs: ['class'] }],
})
export class ScDataTable {}
