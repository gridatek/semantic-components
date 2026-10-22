import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SidesConfettiNextDemo } from './sides-confetti-next-demo';

@Component({
  selector: 'app-sides-confetti-next-demo-container',
  imports: [DemoContainer, SidesConfettiNextDemo],
  template: `
    <app-demo-container
      title="Sides"
      [code]="code"
      demoUrl="/demos/confetti-next/sides-confetti-next-demo"
    >
      <app-sides-confetti-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SidesConfettiNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import { ScConfettiTrigger } from '@semantic-components/ui-lab/confetti';

/** confettiEffect="sides": two cannons, from the edges of the screen. */
@Component({
  selector: 'app-sides-confetti-next-demo',
  imports: [ScConfettiTrigger, ScButton],
  template: \`
    <button scButton scConfetti confettiEffect="sides">Launch</button>
  \`,
  host: { class: 'flex min-h-72 w-full items-center justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SidesConfettiNextDemo {}`;
}
