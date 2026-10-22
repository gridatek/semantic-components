import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FormatsStatCardNextDemo } from './formats-stat-card-next-demo';

@Component({
  selector: 'app-formats-stat-card-next-demo-container',
  imports: [DemoContainer, FormatsStatCardNextDemo],
  template: `
    <app-demo-container
      title="Formats"
      [code]="code"
      demoUrl="/demos/stat-card-next/formats-stat-card-next-demo"
    >
      <app-formats-stat-card-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class FormatsStatCardNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScStatCardNext,
  ScStatCardNextChange,
  ScStatCardNextDescription,
  ScStatCardNextLabel,
  ScStatCardNextValue,
} from '@semantic-components/ui-lab';

/** Any Intl.NumberFormat options — compact, a unit, a currency — in the card’s locale: here, German. */
@Component({
  selector: 'app-formats-stat-card-next-demo',
  imports: [
    ScStatCardNext,
    ScStatCardNextLabel,
    ScStatCardNextValue,
    ScStatCardNextChange,
    ScStatCardNextDescription,
  ],
  template: \`
    <dl scStatCardNext locale="de-DE" class="w-56">
      <dt scStatCardNextLabel>Downloads</dt>
      <dd
        scStatCardNextValue
        [value]="1284000"
        [format]="{ notation: 'compact' }"
      ></dd>
      <dd
        scStatCardNextChange
        [value]="86000"
        [format]="{ notation: 'compact' }"
      ></dd>
      <dd scStatCardNextDescription>diese Woche</dd>
    </dl>
    <dl scStatCardNext locale="de-DE" class="w-56">
      <dt scStatCardNextLabel>Speicher</dt>
      <dd
        scStatCardNextValue
        [value]="512.4"
        [format]="{ style: 'unit', unit: 'gigabyte', maximumFractionDigits: 1 }"
      ></dd>
      <dd
        scStatCardNextChange
        [value]="12.5"
        [format]="{ style: 'unit', unit: 'gigabyte' }"
      ></dd>
      <dd scStatCardNextDescription>seit gestern</dd>
    </dl>
    <dl scStatCardNext locale="de-DE" class="w-56">
      <dt scStatCardNextLabel>Bestellwert</dt>
      <dd
        scStatCardNextValue
        [value]="89.5"
        [format]="{ style: 'currency', currency: 'EUR' }"
      ></dd>
      <dd
        scStatCardNextChange
        [value]="-2.1"
        [format]="{ style: 'currency', currency: 'EUR' }"
      ></dd>
      <dd scStatCardNextDescription>zum Vormonat</dd>
    </dl>
  \`,
  host: { class: 'flex w-full flex-wrap justify-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class FormatsStatCardNextDemo {}`;
}
