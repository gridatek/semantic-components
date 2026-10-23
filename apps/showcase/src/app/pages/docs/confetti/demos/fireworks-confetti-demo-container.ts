import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FireworksConfettiDemo } from './fireworks-confetti-demo';

@Component({
  selector: 'app-fireworks-confetti-demo-container',
  imports: [DemoContainer, FireworksConfettiDemo],
  template: `
    <app-demo-container
      title="Fireworks"
      [code]="code"
      demoUrl="/demos/confetti/fireworks-confetti-demo"
    >
      <app-fireworks-confetti-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class FireworksConfettiDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import { ScConfettiTrigger } from '@semantic-components/ui/confetti';

/** confettiEffect="fireworks": bursts here and there, for three seconds — or the duration you give. */
@Component({
  selector: 'app-fireworks-confetti-demo',
  imports: [ScConfettiTrigger, ScButton],
  template: \`
    <button
      scButton
      confettiEffect="fireworks"
      [scConfettiTrigger]="{ duration: 3000 }"
    >
      Fireworks
    </button>
  \`,
  host: { class: 'flex min-h-72 w-full items-center justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FireworksConfettiDemo {}`;
}
