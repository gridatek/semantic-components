import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { TextStatCardNextDemo } from './text-stat-card-next-demo';

@Component({
  selector: 'app-text-stat-card-next-demo-container',
  imports: [DemoContainer, TextStatCardNextDemo],
  template: `
    <app-demo-container
      title="Text value"
      [code]="code"
      demoUrl="/demos/stat-card-next/text-stat-card-next-demo"
    >
      <app-text-stat-card-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class TextStatCardNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScStatCardNext,
  ScStatCardNextDescription,
  ScStatCardNextIcon,
  ScStatCardNextLabel,
  ScStatCardNextValue,
} from '@semantic-components/ui-lab';
import { SiServerIcon } from '@semantic-icons/lucide-icons';

/** Not every figure is a number: without a value, the card shows your text. */
@Component({
  selector: 'app-text-stat-card-next-demo',
  imports: [
    ScStatCardNext,
    ScStatCardNextLabel,
    ScStatCardNextValue,
    ScStatCardNextDescription,
    ScStatCardNextIcon,
    SiServerIcon,
  ],
  template: \`
    <dl scStatCardNext class="w-64">
      <dt scStatCardNextLabel>
        Status <svg siServerIcon scStatCardNextIcon></svg>
      </dt>
      <dd scStatCardNextValue>All systems normal</dd>
      <dd scStatCardNextDescription>checked a minute ago</dd>
    </dl>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class TextStatCardNextDemo {}`;
}
