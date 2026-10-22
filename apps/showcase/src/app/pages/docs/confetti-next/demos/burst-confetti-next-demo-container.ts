import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BurstConfettiNextDemo } from './burst-confetti-next-demo';

@Component({
  selector: 'app-burst-confetti-next-demo-container',
  imports: [DemoContainer, BurstConfettiNextDemo],
  template: `
    <app-demo-container
      title="Burst"
      [code]="code"
      demoUrl="/demos/confetti-next/burst-confetti-next-demo"
    >
      <app-burst-confetti-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class BurstConfettiNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import { ScConfettiTrigger } from '@semantic-components/ui-lab/confetti';

/** scConfetti on a button: a click bursts from it, in the theme’s colours. Decorative — hidden from screen readers, never in the way, and none for reduced motion. */
@Component({
  selector: 'app-burst-confetti-next-demo',
  imports: [ScConfettiTrigger, ScButton],
  template: \` <button scButton scConfetti>Celebrate</button> \`,
  host: { class: 'flex min-h-72 w-full items-center justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BurstConfettiNextDemo {}`;
}
