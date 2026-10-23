import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SidesConfettiDemo } from './sides-confetti-demo';

@Component({
  selector: 'app-sides-confetti-demo-container',
  imports: [DemoContainer, SidesConfettiDemo],
  template: `
    <app-demo-container
      title="Sides"
      [code]="code"
      demoUrl="/demos/confetti/sides-confetti-demo"
    >
      <app-sides-confetti-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SidesConfettiDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import { ScConfettiTrigger } from '@semantic-components/ui/confetti';

/** confettiEffect="sides": two cannons, from the edges of the screen. */
@Component({
  selector: 'app-sides-confetti-demo',
  imports: [ScConfettiTrigger, ScButton],
  template: \`
    <button scButton scConfettiTrigger confettiEffect="sides">Launch</button>
  \`,
  host: { class: 'flex min-h-72 w-full items-center justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SidesConfettiDemo {}`;
}
