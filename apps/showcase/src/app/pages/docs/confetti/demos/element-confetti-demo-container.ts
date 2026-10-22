import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ElementConfettiDemo } from './element-confetti-demo';

@Component({
  selector: 'app-element-confetti-demo-container',
  imports: [DemoContainer, ElementConfettiDemo],
  template: `
    <app-demo-container
      title="From the element"
      [code]="code"
      demoUrl="/demos/confetti/element-confetti-demo"
    >
      <app-element-confetti-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ElementConfettiDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import { ScConfettiTrigger } from '@semantic-components/ui-lab/confetti';

/** Each burst starts at the centre of what was clicked — wherever it is. */
@Component({
  selector: 'app-element-confetti-demo',
  imports: [ScConfettiTrigger, ScButton],
  template: \`
    <div class="flex w-full max-w-md justify-between">
      <button scButton variant="outline" scConfettiTrigger>Left</button>
      <button scButton variant="outline" scConfettiTrigger>Middle</button>
      <button scButton variant="outline" scConfettiTrigger>Right</button>
    </div>
  \`,
  host: { class: 'flex min-h-72 w-full items-center justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ElementConfettiDemo {}`;
}
