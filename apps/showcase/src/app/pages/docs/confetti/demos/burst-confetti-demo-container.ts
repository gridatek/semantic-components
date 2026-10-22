import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BurstConfettiDemo } from './burst-confetti-demo';

@Component({
  selector: 'app-burst-confetti-demo-container',
  imports: [DemoContainer, BurstConfettiDemo],
  template: `
    <app-demo-container
      title="Burst"
      [code]="code"
      demoUrl="/demos/confetti/burst-confetti-demo"
    >
      <app-burst-confetti-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class BurstConfettiDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import { ScConfettiTrigger } from '@semantic-components/ui-lab/confetti';

/** scConfettiTrigger on a button: a click bursts from it, in the theme’s colours. Decorative — hidden from screen readers, never in the way, and none for reduced motion. */
@Component({
  selector: 'app-burst-confetti-demo',
  imports: [ScConfettiTrigger, ScButton],
  template: \` <button scButton scConfettiTrigger>Celebrate</button> \`,
  host: { class: 'flex min-h-72 w-full items-center justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BurstConfettiDemo {}`;
}
