import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ConfettiUsageDemo } from './confetti-usage-demo';

@Component({
  selector: 'app-confetti-usage-demo-container',
  imports: [DemoContainer, ConfettiUsageDemo],
  template: `
    <app-demo-container
      title="Usage"
      [code]="code"
      demoUrl="/demos/confetti/confetti-usage-demo"
    >
      <app-confetti-usage-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ConfettiUsageDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import { ScConfettiTrigger } from '@semantic-components/ui/confetti';

/** scConfettiTrigger on a button: a click bursts from it, in the theme’s colours. Decorative — hidden from screen readers, never in the way, and none for reduced motion. */
@Component({
  selector: 'app-confetti-usage-demo',
  imports: [ScConfettiTrigger, ScButton],
  template: \` <button scButton scConfettiTrigger>Celebrate</button> \`,
  host: { class: 'flex min-h-72 w-full items-center justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ConfettiUsageDemo {}`;
}
