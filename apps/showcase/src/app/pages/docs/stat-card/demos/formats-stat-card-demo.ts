import { Component, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import {
  ScStatCard,
  ScStatCardChange,
  ScStatCardDescription,
  ScStatCardLabel,
  ScStatCardValue,
} from '@semantic-components/ui';

/** Any Intl.NumberFormat options — compact, a unit, a currency — in LOCALE_ID: provided here as German. */
@Component({
  selector: 'app-formats-stat-card-demo',
  imports: [
    ScStatCard,
    ScStatCardLabel,
    ScStatCardValue,
    ScStatCardChange,
    ScStatCardDescription,
  ],
  template: `
    <dl scStatCard class="w-56">
      <dt scStatCardLabel>Downloads</dt>
      <dd
        scStatCardValue
        [value]="1284000"
        [format]="{ notation: 'compact' }"
      ></dd>
      <dd
        scStatCardChange
        [value]="86000"
        [format]="{ notation: 'compact' }"
      ></dd>
      <dd scStatCardDescription>diese Woche</dd>
    </dl>
    <dl scStatCard class="w-56">
      <dt scStatCardLabel>Speicher</dt>
      <dd
        scStatCardValue
        [value]="512.4"
        [format]="{ style: 'unit', unit: 'gigabyte', maximumFractionDigits: 1 }"
      ></dd>
      <dd
        scStatCardChange
        [value]="12.5"
        [format]="{ style: 'unit', unit: 'gigabyte' }"
      ></dd>
      <dd scStatCardDescription>seit gestern</dd>
    </dl>
    <dl scStatCard class="w-56">
      <dt scStatCardLabel>Bestellwert</dt>
      <dd
        scStatCardValue
        [value]="89.5"
        [format]="{ style: 'currency', currency: 'EUR' }"
      ></dd>
      <dd
        scStatCardChange
        [value]="-2.1"
        [format]="{ style: 'currency', currency: 'EUR' }"
      ></dd>
      <dd scStatCardDescription>zum Vormonat</dd>
    </dl>
  `,
  providers: [{ provide: LOCALE_ID, useValue: 'de-DE' }],
  host: { class: 'flex w-full flex-wrap justify-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class FormatsStatCardDemo {}
