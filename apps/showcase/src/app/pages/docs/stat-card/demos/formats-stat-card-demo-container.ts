import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FormatsStatCardDemo } from './formats-stat-card-demo';

@Component({
  selector: 'app-formats-stat-card-demo-container',
  imports: [DemoContainer, FormatsStatCardDemo],
  template: `
    <app-demo-container
      title="Formats"
      [code]="code"
      demoUrl="/demos/stat-card/formats-stat-card-demo"
    >
      <app-formats-stat-card-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class FormatsStatCardDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScStatCard,
  ScStatCardChange,
  ScStatCardDescription,
  ScStatCardLabel,
  ScStatCardValue,
} from '@semantic-components/ui';

/** Any Intl.NumberFormat options — compact, a unit, a currency — in the card’s locale: here, German. */
@Component({
  selector: 'app-formats-stat-card-demo',
  imports: [
    ScStatCard,
    ScStatCardLabel,
    ScStatCardValue,
    ScStatCardChange,
    ScStatCardDescription,
  ],
  template: \`
    <dl scStatCard locale="de-DE" class="w-56">
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
    <dl scStatCard locale="de-DE" class="w-56">
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
    <dl scStatCard locale="de-DE" class="w-56">
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
  \`,
  host: { class: 'flex w-full flex-wrap justify-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class FormatsStatCardDemo {}`;
}
