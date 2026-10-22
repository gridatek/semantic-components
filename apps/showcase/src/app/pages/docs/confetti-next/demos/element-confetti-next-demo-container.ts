import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ElementConfettiNextDemo } from './element-confetti-next-demo';

@Component({
  selector: 'app-element-confetti-next-demo-container',
  imports: [DemoContainer, ElementConfettiNextDemo],
  template: `
    <app-demo-container
      title="From the element"
      [code]="code"
      demoUrl="/demos/confetti-next/element-confetti-next-demo"
    >
      <app-element-confetti-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ElementConfettiNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import { ScConfettiTrigger } from '@semantic-components/ui-lab/confetti';

/** Each burst starts at the centre of what was clicked — wherever it is. */
@Component({
  selector: 'app-element-confetti-next-demo',
  imports: [ScConfettiTrigger, ScButton],
  template: \`
    <div class="flex w-full max-w-md justify-between">
      <button scButton variant="outline" scConfetti>Left</button>
      <button scButton variant="outline" scConfetti>Middle</button>
      <button scButton variant="outline" scConfetti>Right</button>
    </div>
  \`,
  host: { class: 'flex min-h-72 w-full items-center justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ElementConfettiNextDemo {}`;
}
