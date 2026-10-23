import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { CountAnimatedCounterDemo } from './count-animated-counter-demo';

@Component({
  selector: 'app-count-animated-counter-demo-container',
  imports: [DemoContainer, CountAnimatedCounterDemo],
  template: `
    <app-demo-container
      title="Count"
      [code]="code"
      demoUrl="/demos/animated-counter/count-animated-counter-demo"
    >
      <app-count-animated-counter-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class CountAnimatedCounterDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import { ScAnimatedCounter } from '@semantic-components/ui/animated-counter';

/** The number counts to its new value, easing out. Screen readers get only the value; with reduced motion, it is there at once. */
@Component({
  selector: 'app-count-animated-counter-demo',
  imports: [ScAnimatedCounter, ScButton],
  template: \`
    <div
      class="bg-muted/30 grid h-32 w-64 place-items-center rounded-xl border"
    >
      <span
        scAnimatedCounter
        [value]="count()"
        class="text-5xl font-bold"
      ></span>
    </div>
    <div class="flex gap-2">
      <button scButton (click)="count.set(count() + 100)">+100</button>
      <button scButton variant="secondary" (click)="count.set(0)">Reset</button>
    </div>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class CountAnimatedCounterDemo {
  readonly count = signal(0);
}`;
}
