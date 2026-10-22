import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { CustomConfettiNextDemo } from './custom-confetti-next-demo';

@Component({
  selector: 'app-custom-confetti-next-demo-container',
  imports: [DemoContainer, CustomConfettiNextDemo],
  template: `
    <app-demo-container
      title="Colours and shapes"
      [code]="code"
      demoUrl="/demos/confetti-next/custom-confetti-next-demo"
    >
      <app-custom-confetti-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class CustomConfettiNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import { ScConfettiTrigger } from '@semantic-components/ui-lab/confetti';

/** Any CSS colours, circles and squares, bigger pieces, a wider spread. */
@Component({
  selector: 'app-custom-confetti-next-demo',
  imports: [ScConfettiTrigger, ScButton],
  template: \`
    <button
      scButton
      variant="outline"
      [scConfetti]="{
        colors: ['#f43f5e', '#f59e0b', '#10b981', 'oklch(0.6 0.2 260)'],
        shapes: ['circle', 'square'],
        size: 1.4,
        spread: 120,
        count: 150,
      }"
    >
      Party
    </button>
  \`,
  host: { class: 'flex min-h-72 w-full items-center justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class CustomConfettiNextDemo {}`;
}
